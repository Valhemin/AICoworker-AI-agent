---
name: observability-setup
description: Set up structured logging, correlation IDs, health check endpoint, and error tracking so production issues are traceable and diagnosable.
---

TRIGGER: starting a new backend service, adding a new Next.js app, or when debugging production reveals "we have no idea what happened"
OUTPUT: compact — structured logger in place, correlation ID flows through all logs, /health endpoint exists, error tracker integrated, no PII in logs
SKIP: pure frontend work with no server process, or when all three (logger, health, error tracker) are already confirmed present

---

# Observability Setup

## Why this matters first

Without structured logging: production bug → `console.log` hunting → no timestamps, no request IDs, no context. This skill turns "something went wrong" into "exactly this request failed at exactly this point with exactly this context."

---

## 1. Structured logger — pino (Node.js standard)

Install once per service:
```bash
npm install pino pino-pretty
```

```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  // In production: output as JSON (for log aggregators like Datadog, CloudWatch, Loki)
  // In development: pretty-print
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:HH:MM:ss' } }
    : undefined,
  // Redact sensitive fields — they are stripped from ALL log output
  redact: {
    paths: ['req.headers.authorization', '*.password', '*.token', '*.secret', '*.apiKey', '*.creditCard'],
    censor: '[REDACTED]',
  },
  base: {
    service: process.env.SERVICE_NAME ?? 'app',
    env: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  },
})
```

**Usage — always include context, never just a message:**

```typescript
// ✓ — structured, searchable, traceable
logger.info({ requestId, userId, orderId, duration }, 'order.created')
logger.warn({ requestId, service: 'stripe', status: 429 }, 'external.rate_limit')
logger.error({ requestId, err, stack: err.stack }, 'payment.failed')

// ✗ — no context, not searchable
console.log('Order created')
logger.error('Payment failed: ' + err.message)
```

Log level guide:
- `debug` — local dev, trace values, intermediate steps
- `info` — state changes, important events (user created, payment succeeded)
- `warn` — expected errors, degraded operation (rate limit, retry)
- `error` — unexpected failures requiring investigation

---

## 2. Correlation / request ID — flows through everything

Every request gets a unique ID. Every log line in that request includes it. Find all logs for a failing request by filtering on one value.

**Express middleware:**

```typescript
// middleware/requestId.ts
import { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'crypto'

declare global {
  namespace Express { interface Request { requestId: string; log: typeof logger } }
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  // Accept from upstream proxy if present (Nginx, load balancer)
  const id = req.headers['x-request-id'] as string || randomUUID()
  req.requestId = id
  res.setHeader('X-Request-Id', id)

  // Create a child logger with the requestId bound — use req.log throughout the request
  req.log = logger.child({ requestId: id })
  next()
}

// Register FIRST — before all other middleware
app.use(requestIdMiddleware)
```

**Request logging middleware:**

```typescript
// middleware/requestLogger.ts
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'

    req.log[level]({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
      userId: req.user?.id,
      // Never log req.body — may contain passwords or PII
    }, 'http.request')
  })

  next()
}

app.use(requestLogger)
```

**Next.js — correlation ID in Server Components and Route Handlers:**

```typescript
// lib/logger-server.ts
import { headers } from 'next/headers'
import { logger } from './logger'

// Creates a request-scoped logger — call in each Server Component or Route Handler
export async function getLogger() {
  const h = await headers()
  const requestId = h.get('x-request-id') ?? randomUUID()
  return logger.child({ requestId })
}
```

**Electron main process — session ID instead of request ID:**

```typescript
// In main.ts
import { randomUUID } from 'crypto'
const sessionId = randomUUID()   // stable for the lifetime of this app run

export const logger = pino({
  ...options,
  base: { service: 'electron-main', sessionId, version: app.getVersion() },
})
```

---

## 3. Health check endpoint — mandatory for any deployed service

```typescript
// app/api/health/route.ts (Next.js) or routes/health.ts (Express)

interface HealthStatus {
  status: 'ok' | 'degraded' | 'down'
  timestamp: string
  version: string
  checks: Record<string, { status: 'ok' | 'down'; latencyMs?: number; error?: string }>
}

// GET /health — used by load balancer, Kubernetes, monitoring
export async function GET() {
  const checks: HealthStatus['checks'] = {}
  let overallStatus: HealthStatus['status'] = 'ok'

  // Database check
  const dbStart = Date.now()
  try {
    await db.$queryRaw`SELECT 1`
    checks.database = { status: 'ok', latencyMs: Date.now() - dbStart }
  } catch (err) {
    checks.database = { status: 'down', error: 'Database unreachable' }
    overallStatus = 'down'
  }

  // Cache/Redis check (if applicable)
  if (redis) {
    const cacheStart = Date.now()
    try {
      await redis.ping()
      checks.cache = { status: 'ok', latencyMs: Date.now() - cacheStart }
    } catch {
      checks.cache = { status: 'down', error: 'Redis unreachable' }
      if (overallStatus === 'ok') overallStatus = 'degraded'   // degraded, not down — cache miss is tolerable
    }
  }

  const httpStatus = overallStatus === 'down' ? 503 : 200

  return Response.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION ?? 'unknown',
    checks,
  } satisfies HealthStatus, { status: httpStatus })
}
```

**Two endpoints:**
- `GET /health` — full check with dependency status (for monitoring dashboards)
- `GET /health/live` — fast liveness check (just returns 200, for load balancer — no DB call)

```typescript
export async function GET_live() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
}
```

---

## 4. Error tracking — Sentry

```bash
npm install @sentry/node @sentry/nextjs   # or @sentry/electron
```

**Next.js — `instrumentation.ts` (App Router):**

```typescript
// instrumentation.ts — at project root
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.APP_VERSION,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,   // 10% in prod
      // Scrub sensitive data before sending
      beforeSend(event) {
        // Remove headers that may contain tokens
        if (event.request?.headers) {
          delete event.request.headers['authorization']
          delete event.request.headers['cookie']
        }
        return event
      },
    })
  }
}
```

**Express:**

```typescript
// app.ts — after routes, before generic error handler
import * as Sentry from '@sentry/node'

Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV })
app.use(Sentry.Handlers.requestHandler())   // FIRST middleware
// ... routes ...
app.use(Sentry.Handlers.errorHandler())    // BEFORE generic error handler
app.use(errorHandler)                       // generic error handler last
```

**Electron:**

```typescript
// main.ts
import * as Sentry from '@sentry/electron/main'

if (app.isPackaged) {   // Only in production — not in dev
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: app.getVersion(),
    beforeSend(event) {
      // Scrub file paths that may reveal username
      if (event.exception?.values) {
        event.exception.values.forEach(ex => {
          ex.stacktrace?.frames?.forEach(frame => {
            if (frame.filename) {
              frame.filename = frame.filename.replace(/\/Users\/[^/]+/, '/Users/[user]')
            }
          })
        })
      }
      return event
    },
  })
}
```

**Manual error capture (in catch blocks for unexpected errors):**

```typescript
try {
  await criticalOperation()
} catch (err) {
  Sentry.captureException(err, { tags: { operation: 'critical-operation', userId } })
  logger.error({ requestId, err }, 'critical-operation.failed')
  throw err   // re-throw — don't swallow
}
```

Do NOT send `AppError` with `isOperational: true` to Sentry — these are expected errors (404, 401). Only send unexpected errors.

---

## 5. Performance — slow operation detection

```typescript
// Simple threshold logging — no extra library needed
async function withTiming<T>(name: string, fn: () => Promise<T>, warnThresholdMs = 1000): Promise<T> {
  const start = Date.now()
  try {
    return await fn()
  } finally {
    const duration = Date.now() - start
    if (duration > warnThresholdMs) {
      logger.warn({ operation: name, duration }, 'slow.operation')
    }
  }
}

// Usage
const result = await withTiming('db.products.findMany', () => db.products.findMany({ where }))
```

---

## Env vars needed

Add to `.env.example`:

```bash
# Observability
LOG_LEVEL=info                          # debug | info | warn | error
SERVICE_NAME=my-service                 # appears in every log line
APP_VERSION=1.0.0                       # set by CI/CD to git tag

# Error tracking
SENTRY_DSN=https://xxx@sentry.io/xxx    # from Sentry project settings
# Leave blank in local dev — Sentry won't initialize without a DSN
```

---

## Checklist before marking scope done

- [ ] `lib/logger.ts` created — pino instance with `redact` config for sensitive fields
- [ ] `requestIdMiddleware` registered as the first middleware
- [ ] `req.log` used throughout handlers — not raw `logger` (to carry requestId)
- [ ] `GET /health` endpoint exists — checks DB (and cache if applicable)
- [ ] `GET /health/live` exists — fast 200 for load balancer liveness
- [ ] Sentry initialized in `instrumentation.ts` or `app.ts` — only when DSN present
- [ ] `beforeSend` scrubs authorization headers and cookie before Sentry upload
- [ ] `SENTRY_DSN` and `LOG_LEVEL` added to `env-config-management` config file
- [ ] `SENTRY_DSN` added to `.env.example` with placeholder
- [ ] No request body logged anywhere — only method, URL, status, duration
