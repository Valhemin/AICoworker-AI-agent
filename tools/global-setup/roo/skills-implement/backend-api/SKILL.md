---
name: backend-api
description: Build backend endpoints and services correctly — auth, validation, rate limiting, pagination, webhook handling, error mapping, and tests. Covers Node.js/TypeScript and Python.
---

TRIGGER: implementing a backend endpoint, service, or data-access layer in Node.js or Python
OUTPUT: compact — endpoint works, auth enforced, input validated, errors mapped, rate limited, tests pass
SKIP: frontend-only work with no server logic; Next.js Server Actions → use `nextjs-patterns` instead

---

# Backend API

## Detect language and apply the right section

Read the repo's primary language before writing a single line:
- `package.json` present → **Node.js/TypeScript** section
- `pyproject.toml` / `requirements.txt` / `Pipfile` present → **Python** section
- Both present → apply the section for the service being modified

---

# Universal Principles (apply to all languages)

These patterns are non-negotiable regardless of language or framework.

## Layered architecture

```
routes / controllers   ← HTTP only: parse request, call service, return response
services               ← business logic — no HTTP, no DB queries
repositories / DAOs    ← database queries only — no business logic
```

No business logic in route handlers. No HTTP knowledge in services. No DB queries in services.

## Auth enforcement

Enforce auth at the **route/middleware level** — never inside the service:

```
Route receives request
  → Middleware checks: is token present? is it valid? is it expired?
  → If no: return 401 immediately — never reach the service
  → If yes: attach user identity to request context
Service receives (user_id, data)
  → Never reads auth headers directly
  → Verifies ownership: "does this resource belong to user_id?"
```

**Ownership verification** — never trust user-supplied IDs at face value:
- Wrong: `SELECT * FROM orders WHERE id = $input_id`
- Right: `SELECT * FROM orders WHERE id = $input_id AND user_id = $current_user_id`

If the row doesn't exist or belongs to another user, return 404 (not 403) — don't reveal the resource exists.

## Rate limiting

Apply at the route or middleware level. Stricter limits on auth endpoints (prevent brute force). Production with multiple instances: Redis-backed store — in-memory limits don't work across nodes.

## Pagination — cursor-based preferred

Offset pagination breaks when items are inserted during pagination. Cursor-based is correct for live data:
- Request: `?cursor=<opaque>&limit=20`
- Response: `{ items: [...], nextCursor: "<opaque>" | null, hasMore: boolean }`
- Never return a raw unbounded array for list endpoints

## Webhook receiving

Always verify the signature before parsing or acting on the payload. Non-200 response causes retries — always return 200 after accepting. Deduplicate using event ID before processing.

## Background jobs

Do not block HTTP responses with operations > 100ms. Enqueue and return immediately. Log job failure separately from HTTP request failure.

## Input validation

Validate at the boundary — reject malformed data before it enters the service layer. Return field-level errors (not just a generic "invalid input") for 400 responses.

## Error response shape (consistent across all endpoints)

```json
{ "code": "VALIDATION_ERROR", "message": "...", "field": "email" }
{ "code": "NOT_FOUND", "message": "Order not found" }
{ "code": "UNAUTHORIZED", "message": "Authentication required" }
{ "code": "RATE_LIMIT", "message": "Too many requests" }
```

Never include: stack traces, internal error messages, DB error text, file paths.

---

# Node.js / TypeScript

Use when: `package.json` is present. Framework: Express, Fastify, Hono, or tRPC.

## Project structure

```
routes/<resource>.ts        ← routing only
services/<resource>.ts      ← business logic
repositories/<resource>.ts  ← DB queries (Prisma / Drizzle / Knex)
middleware/auth.ts           ← JWT verification, attach req.user
middleware/rateLimit.ts      ← express-rate-limit config
lib/errors.ts               ← named error classes
```

## Auth middleware

```typescript
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@/lib/config'
import { UnauthorizedError } from '@/lib/errors'

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return next(new UnauthorizedError())
  try {
    const payload = jwt.verify(token, config.auth.secret) as { sub: string; role: string }
    req.user = { id: payload.sub, role: payload.role }
    next()
  } catch {
    next(new UnauthorizedError())
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) return next(new ForbiddenError())
    next()
  }
}
```

## Input validation (Zod)

```typescript
import { z } from 'zod'

const CreateOrderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(100),
})

router.post('/orders', requireAuth, async (req, res, next) => {
  const parsed = CreateOrderSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      errors: parsed.error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    })
  }
  try {
    const order = await orderService.create(parsed.data, req.user.id)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
```

## Ownership check (repository layer)

```typescript
// repositories/orders.ts
async findByIdAndUser(orderId: string, userId: string) {
  return prisma.order.findFirst({ where: { id: orderId, userId } })
}

// service layer
const order = await orderRepo.findByIdAndUser(orderId, req.user.id)
if (!order) throw new NotFoundError('Order')   // 404 whether not found or wrong user
```

## Rate limiting

```typescript
import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ code: 'RATE_LIMIT', retryAfter: res.getHeader('RateLimit-Reset') }),
})
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })

app.use('/api/', apiLimiter)
app.use('/api/auth/', authLimiter)
```

Production multi-instance: use `rate-limit-redis` store.

## Cursor pagination

```typescript
router.get('/orders', requireAuth, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100)
  const cursor = req.query.cursor as string | undefined

  const items = await orderRepo.findByUser(req.user.id, { cursor, limit: limit + 1 })
  const hasMore = items.length > limit
  const page = hasMore ? items.slice(0, limit) : items
  const nextCursor = hasMore ? Buffer.from(page.at(-1)!.id).toString('base64') : null

  res.json({ items: page, nextCursor, hasMore })
})
```

## Webhook receiving

```typescript
router.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch {
      return res.status(400).json({ code: 'INVALID_SIGNATURE' })
    }

    const already = await db.processedWebhooks.findUnique({ where: { eventId: event.id } })
    if (already) return res.json({ status: 'already_processed' })

    await processWebhookEvent(event)
    await db.processedWebhooks.create({ data: { eventId: event.id } })
    res.json({ received: true })
  }
)
```

## Background jobs (BullMQ)

```typescript
import { Queue, Worker } from 'bullmq'

const emailQueue = new Queue('email', { connection: redis })

// Route: enqueue and return
await emailQueue.add('order-confirmation', { orderId: order.id, userId })
res.status(201).json(order)

// Worker: process in background
const worker = new Worker('email', async job => {
  await emailService.sendOrderConfirmation(job.data)
}, { connection: redis })
worker.on('failed', (job, err) => logger.error('email-job-failed', { job: job?.id, err }))
```

## CORS

```typescript
import cors from 'cors'

const allowed = process.env.ALLOWED_ORIGINS?.split(',') ?? []
app.use(cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin)) ? cb(null, true) : cb(new Error('Not allowed')),
  credentials: true,
}))
```

Never `origin: '*'` with `credentials: true`.

## tRPC patterns

```typescript
export const orderRouter = router({
  create: protectedProcedure
    .input(CreateOrderSchema)
    .mutation(async ({ ctx, input }) => orderService.create(input, ctx.user.id)),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const order = await orderRepo.findByIdAndUser(input.id, ctx.user.id)
      if (!order) throw new TRPCError({ code: 'NOT_FOUND' })
      return order
    }),
})
```

---

# Python

Use when: `pyproject.toml`, `requirements.txt`, or `Pipfile` is present. Framework: FastAPI (preferred for APIs), Django (for full-stack or admin-heavy apps).

## Project structure

```
routers/<resource>.py       ← routing only (APIRouter)
services/<resource>.py      ← business logic
repositories/<resource>.py  ← DB queries (SQLAlchemy)
dependencies/auth.py        ← FastAPI Depends() for auth
models/                     ← Pydantic models (request/response schemas)
core/errors.py              ← custom exception classes + handlers
```

## Auth middleware (FastAPI Depends)

```python
# dependencies/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from core.config import settings

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, settings.AUTH_SECRET, algorithms=["HS256"])
        return {"id": payload["sub"], "role": payload.get("role", "user")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Token expired"})
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "Invalid token"})

def require_role(*roles: str):
    async def checker(user = Depends(get_current_user)):
        if user["role"] not in roles:
            raise HTTPException(status_code=403, detail={"code": "FORBIDDEN"})
        return user
    return checker
```

## Input validation (Pydantic — built into FastAPI)

```python
# models/orders.py
from pydantic import BaseModel, UUID4, Field

class CreateOrderRequest(BaseModel):
    product_id: UUID4
    quantity: int = Field(ge=1, le=100)
    note: str | None = Field(None, max_length=500)

class OrderResponse(BaseModel):
    id: UUID4
    user_id: UUID4
    product_id: UUID4
    quantity: int
    status: str

    model_config = {"from_attributes": True}   # SQLAlchemy ORM → Pydantic

# routers/orders.py
from fastapi import APIRouter, Depends, status
router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    body: CreateOrderRequest,                        # Pydantic validates automatically
    user = Depends(get_current_user),                # auth enforced
    service: OrderService = Depends(get_order_service),
):
    return await service.create(body, user_id=user["id"])
```

FastAPI returns 422 Unprocessable Entity with field-level errors automatically when Pydantic validation fails — no manual error handling needed for basic validation.

## Ownership check (repository layer)

```python
# repositories/orders.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

async def find_by_id_and_user(
    db: AsyncSession, order_id: UUID, user_id: UUID
) -> Order | None:
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.user_id == user_id)
    )
    return result.scalar_one_or_none()

# service layer
order = await order_repo.find_by_id_and_user(db, order_id, current_user["id"])
if not order:
    raise HTTPException(status_code=404, detail={"code": "NOT_FOUND"})
```

## Rate limiting (slowapi for FastAPI)

```python
# main.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address, storage_uri="redis://localhost:6379")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# On a route
@router.post("/auth/login")
@limiter.limit("10/15minute")   # 10 requests per 15 minutes
async def login(request: Request, body: LoginRequest):
    ...

@router.get("/orders")
@limiter.limit("100/15minute")
async def list_orders(request: Request, user = Depends(get_current_user)):
    ...
```

## Cursor pagination

```python
from pydantic import BaseModel
from typing import Generic, TypeVar

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    items: list[T]
    next_cursor: str | None
    has_more: bool

@router.get("/orders", response_model=PaginatedResponse[OrderResponse])
async def list_orders(
    cursor: str | None = None,
    limit: int = Query(default=20, ge=1, le=100),
    user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Decode cursor to last seen ID
    last_id = base64.b64decode(cursor).decode() if cursor else None

    stmt = (
        select(Order)
        .where(Order.user_id == user["id"])
        .order_by(Order.created_at.desc())
        .limit(limit + 1)
    )
    if last_id:
        stmt = stmt.where(Order.id < last_id)

    rows = (await db.execute(stmt)).scalars().all()
    has_more = len(rows) > limit
    page = rows[:limit]
    next_cursor = base64.b64encode(str(page[-1].id).encode()).decode() if has_more else None

    return {"items": page, "next_cursor": next_cursor, "has_more": has_more}
```

## Webhook receiving

```python
import hmac, hashlib
from fastapi import Request

@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    body = await request.body()
    sig = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(body, sig, settings.STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail={"code": "INVALID_SIGNATURE"})

    # Idempotency check
    existing = await db.get(ProcessedWebhook, event["id"])
    if existing:
        return {"status": "already_processed"}

    await process_webhook_event(event, db)
    db.add(ProcessedWebhook(event_id=event["id"]))
    await db.commit()

    return {"received": True}
```

## Background jobs (Celery + Redis)

```python
# tasks/email.py
from celery import Celery

celery = Celery("tasks", broker="redis://localhost:6379/0", backend="redis://localhost:6379/1")

@celery.task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_confirmation(self, order_id: str, user_id: str):
    try:
        email_service.send_confirmation(order_id, user_id)
    except Exception as exc:
        raise self.retry(exc=exc)

# In route — enqueue and return immediately
order = await order_service.create(body, user_id=user["id"])
send_order_confirmation.delay(str(order.id), str(user["id"]))
return OrderResponse.model_validate(order)
```

For simple one-off tasks that don't need retries: FastAPI `BackgroundTasks`:

```python
@router.post("/orders")
async def create_order(body: CreateOrderRequest, background_tasks: BackgroundTasks, ...):
    order = await service.create(body, user["id"])
    background_tasks.add_task(email_service.send_confirmation, str(order.id))
    return OrderResponse.model_validate(order)
```

## CORS

```python
from fastapi.middleware.cors import CORSMiddleware

allowed_origins = settings.ALLOWED_ORIGINS.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)
```

Never `allow_origins=["*"]` with `allow_credentials=True`.

## Error handling (FastAPI exception handler)

```python
# core/errors.py
from fastapi import Request
from fastapi.responses import JSONResponse

class NotFoundError(Exception):
    def __init__(self, resource: str = "Resource"):
        self.resource = resource

class ForbiddenError(Exception): pass
class ValidationAppError(Exception):
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message

# main.py
@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(status_code=404, content={"code": "NOT_FOUND", "message": f"{exc.resource} not found"})

@app.exception_handler(ValidationAppError)
async def validation_handler(request: Request, exc: ValidationAppError):
    return JSONResponse(status_code=400, content={"code": "VALIDATION_ERROR", "field": exc.field, "message": exc.message})

@app.exception_handler(Exception)
async def generic_handler(request: Request, exc: Exception):
    logger.error("unhandled-error", extra={"path": str(request.url), "err": str(exc)})
    return JSONResponse(status_code=500, content={"code": "INTERNAL_ERROR", "message": "An unexpected error occurred"})
```

---

## After implementation

Run `api-testing` skill — mandatory regardless of language.

---

## Checklist before marking scope done

- [ ] Detected the correct language section and applied it
- [ ] Auth enforced at route/middleware level — not inside service
- [ ] Ownership scoped to current user — user cannot access others' data
- [ ] Input validated at boundary (Zod for Node.js / Pydantic for Python)
- [ ] Rate limiting applied — stricter on auth endpoints
- [ ] Pagination returns `nextCursor`/`next_cursor` + `hasMore`/`has_more` — not raw array
- [ ] Webhook signature verified before processing body
- [ ] Webhook events deduplicated before processing
- [ ] Long operations queued — HTTP handler returns promptly
- [ ] No stack trace or internal error text in response body
- [ ] `api-testing` run and passed
