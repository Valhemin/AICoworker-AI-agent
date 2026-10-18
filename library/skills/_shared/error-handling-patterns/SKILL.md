---
name: error-handling-patterns
description: Consistent, typed error handling for every endpoint, service, and async operation — classify, log with correlation ID, return structured result.
---

TRIGGER: writing a new endpoint, service function, async operation, or API call — apply every time, no exception
OUTPUT: compact — error paths are typed, mapped, logged with correlation ID, surfaced to callers correctly
SKIP: pure read-only utilities with no network, IO, or external dependency

---

# Error Handling Patterns

## Core rule

Every error site has three jobs: **classify**, **log with context**, **return structured result**. Missing any one creates silent failures or leaking internals.

---

## Error taxonomy — define once, reuse everywhere

```typescript
// lib/errors.ts — shared across the project
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly httpStatus: number = 500,
    public readonly isOperational: boolean = true,   // false = programmer error, not user error
  ) { super(message) }
}

// Domain errors
export class ValidationError extends AppError {
  constructor(public readonly field: string, message: string) {
    super('VALIDATION_ERROR', message, 400)
  }
}
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') { super('NOT_FOUND', `${resource} not found`, 404) }
}
export class UnauthorizedError extends AppError {
  constructor() { super('UNAUTHORIZED', 'Authentication required', 401) }
}
export class ForbiddenError extends AppError {
  constructor() { super('FORBIDDEN', 'Insufficient permissions', 403) }
}
export class ConflictError extends AppError {
  constructor(message: string) { super('CONFLICT', message, 409) }
}
export class ExternalServiceError extends AppError {
  constructor(public readonly service: string, cause: unknown) {
    super('EXTERNAL_SERVICE_ERROR', `${service} is unavailable`, 502)
    this.cause = cause
  }
}
export class RateLimitError extends AppError {
  constructor(public readonly retryAfterMs?: number) {
    super('RATE_LIMIT', 'Too many requests', 429)
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError
}
```

---

## Async functions — throw or return, never swallow

```typescript
// ✓ — throws a typed error the caller can handle specifically
async function getUser(id: string): Promise<User> {
  const user = await db.users.findUnique({ where: { id } })
  if (!user) throw new NotFoundError('User')
  return user
}

// ✗ — caller receives unknown shape, has to check .error every time
async function getUser(id: string) {
  try {
    const user = await db.users.findUnique({ where: { id } })
    return user ? { ok: true, data: user } : { ok: false, error: 'not found' }
  } catch (e) {
    return { ok: false, error: e }
  }
}
```

**Result type** — use when errors are expected and common (not exceptional):

```typescript
type Result<T, E = AppError> = { ok: true; data: T } | { ok: false; error: E }

async function safeGetUser(id: string): Promise<Result<User>> {
  try {
    const user = await db.users.findUnique({ where: { id } })
    if (!user) return { ok: false, error: new NotFoundError('User') }
    return { ok: true, data: user }
  } catch (err) {
    return { ok: false, error: new AppError('DB_ERROR', 'Database error') }
  }
}

// Caller:
const result = await safeGetUser(id)
if (!result.ok) { handleError(result.error); return }
render(result.data)
```

Use Result type for: external API calls, file I/O, operations the caller is expected to handle gracefully.
Use throw for: programming errors, truly unexpected failures, deep call stacks where bubbling is cleaner.

---

## HTTP / API layer — map errors in one place

```typescript
// middleware/errorHandler.ts — last middleware in Express
import { Request, Response, NextFunction } from 'express'
import { isAppError } from '@/lib/errors'

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const requestId = req.headers['x-request-id'] as string ?? generateId()

  if (isAppError(err) && err.isOperational) {
    // Expected errors — log at warn, return structured body
    logger.warn('api-error', {
      requestId,
      code: err.code,
      status: err.httpStatus,
      path: req.path,
      userId: req.user?.id,
    })
    return res.status(err.httpStatus).json({
      code: err.code,
      message: err.message,
      ...(err instanceof ValidationError ? { field: err.field } : {}),
    })
  }

  // Unexpected errors — log at error with stack, return generic body
  logger.error('unhandled-error', {
    requestId,
    err: err instanceof Error ? { message: err.message, stack: err.stack } : err,
    path: req.path,
    userId: req.user?.id,
  })
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' })
}
```

Register as the last middleware: `app.use(errorHandler)`

---

## Correlation / request IDs (mandatory for tracing)

Every request should have a correlation ID that flows through all logs:

```typescript
// middleware/requestId.ts
import { v4 as uuid } from 'uuid'

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = req.headers['x-request-id'] as string ?? uuid()
  req.requestId = id
  res.setHeader('X-Request-Id', id)
  next()
}

// In every log call: include requestId
logger.error('payment-failed', { requestId: req.requestId, orderId, err })
```

When a request fails, you can find all logs for that request by searching `requestId`.

---

## Logging rules

| Error type | Log level | Include | Never include |
|---|---|---|---|
| Validation, Not Found, Auth | `warn` or skip | `requestId`, `path`, `userId`, `code` | Request body, passwords |
| External service error | `error` | `service`, `status`, `requestId` | Full response body if it contains PII |
| Unexpected 500 | `error` | `stack`, `requestId`, sanitized context | PII, tokens, card numbers |
| Performance > threshold | `warn` | `duration`, `path`, `requestId` | — |

Never log: passwords, API keys, tokens, session IDs, card numbers, SSNs, full request bodies with user data.

---

## Frontend / UI error handling

```typescript
// Never expose raw API errors to the user
async function submitOrder(data: OrderData) {
  try {
    await api.orders.create(data)
    showSuccess('Order placed!')
  } catch (err) {
    // ✓ — map to user-readable message
    if (err instanceof ValidationError) {
      showFieldError(err.field, err.message)
    } else if (err instanceof RateLimitError) {
      showToast('Too many requests. Please wait a moment.')
    } else {
      showToast('Something went wrong. Please try again.')
      logger.error('order-submit-failed', { err })   // log for debugging
    }
  }
}
```

Always show a fallback UI — never a blank screen or raw JSON error. Every async action must handle the error state.

---

## Electron / IPC — never throw from handlers

```typescript
// ✓ — structured result, never throws
ipcMain.handle('file:read', async (_event, filePath: string) => {
  try {
    // Validate the path is within allowed boundaries first
    if (!isPathAllowed(filePath)) return { ok: false, code: 'PATH_NOT_ALLOWED' }
    const content = await fs.readFile(filePath, 'utf-8')
    return { ok: true, data: content }
  } catch (err) {
    logger.error('ipc:file:read', { filePath, err })
    return { ok: false, code: isAppError(err) ? err.code : 'READ_FAILED' }
  }
})
```

Throwing from an IPC handler causes the renderer's `invoke` call to reject with an untyped error — callers cannot distinguish error types.

---

## Checklist before marking scope done

- [ ] Named `AppError` subclasses used — no raw `throw new Error('string')`
- [ ] Error handler middleware registered and maps all `AppError` subclasses to HTTP status
- [ ] No stack trace in HTTP response body
- [ ] No credentials, tokens, or PII in any log line
- [ ] Every log call includes `requestId` (or equivalent correlation ID)
- [ ] Frontend shows user-readable messages — no raw API error strings exposed
- [ ] IPC handlers return `{ ok, data | code }` — never throw
