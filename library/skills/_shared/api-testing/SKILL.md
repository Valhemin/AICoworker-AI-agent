---
name: api-testing
description: Write comprehensive API tests covering happy path, auth, permissions, input validation, error paths, and idempotency.
---

TRIGGER: after implementing an API endpoint, service, or integration — run this before marking scope done
OUTPUT: compact — test suite covers all critical paths, passes, no real external calls in test suite
SKIP: pure UI work with no endpoint

LANGUAGE: detect the repo stack first — apply Node.js section (supertest/vitest) or Python section (pytest/httpx)

---

# API Testing

## Test categories — all five required

| Category | What to test | Expected |
|---|---|---|
| 1. Happy path | Valid request, correct auth | 200/201 with correct body shape |
| 2. Auth | Missing/expired token | 401 |
| 3. Permissions | Valid token but wrong user's data | 403 or 404 |
| 4. Input validation | Missing required fields, wrong types, boundary values | 400 with field-level errors |
| 5. Error paths | External service down, DB error | 502 or 500 with `code` |

---

## Setup: test database (not mocking DB calls)

Mock the network, not the database. Tests should hit a real DB in an isolated schema:

```typescript
// vitest.setup.ts
import { prisma } from '@/lib/db'
import { execSync } from 'child_process'

// Before all tests in the suite: migrate a test database
beforeAll(async () => {
  await prisma.$executeRaw`DROP SCHEMA IF EXISTS test CASCADE`
  await prisma.$executeRaw`CREATE SCHEMA test`
  execSync('DATABASE_URL=... npx prisma db push --force-reset')
})

// Before each test: clean up state (faster than full reset)
beforeEach(async () => {
  await prisma.$transaction([
    prisma.order.deleteMany(),
    prisma.user.deleteMany(),
  ])
})

afterAll(() => prisma.$disconnect())
```

If a test database is not available: mock the repository layer, not the service layer. Never mock the function under test.

---

## Express / Node endpoint tests (supertest + vitest)

```typescript
import supertest from 'supertest'
import { describe, it, expect, beforeEach } from 'vitest'
import { app } from '@/app'
import { createUser, createAuthToken } from '@tests/factories'

describe('POST /api/orders', () => {
  let token: string
  let userId: string

  beforeEach(async () => {
    const user = await createUser({ role: 'customer' })
    userId = user.id
    token = createAuthToken(user)
  })

  // ---- Category 1: Happy path ----
  it('creates an order and returns 201', async () => {
    const res = await supertest(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 'prod-123', quantity: 2 })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      id: expect.any(String),
      userId,
      productId: 'prod-123',
      quantity: 2,
      status: 'pending',
    })
  })

  // ---- Category 2: Auth ----
  it('returns 401 when no token', async () => {
    const res = await supertest(app).post('/api/orders').send({ productId: 'prod-123', quantity: 1 })
    expect(res.status).toBe(401)
    expect(res.body.code).toBe('UNAUTHORIZED')
  })

  it('returns 401 when token is expired', async () => {
    const expiredToken = createAuthToken(await createUser(), { expiresIn: '-1s' })
    const res = await supertest(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${expiredToken}`)
      .send({ productId: 'prod-123', quantity: 1 })
    expect(res.status).toBe(401)
  })

  // ---- Category 3: Permissions ----
  it('cannot access another user\'s order', async () => {
    const otherUser = await createUser()
    const order = await createOrder({ userId: otherUser.id })

    const res = await supertest(app)
      .get(`/api/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBeOneOf([403, 404])   // not 200
  })

  // ---- Category 4: Input validation ----
  it('returns 400 when productId is missing', async () => {
    const res = await supertest(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 1 })

    expect(res.status).toBe(400)
    expect(res.body.code).toBe('VALIDATION_ERROR')
    expect(res.body.errors).toContainEqual(expect.objectContaining({ field: 'productId' }))
  })

  it('returns 400 when quantity is zero', async () => {
    const res = await supertest(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 'prod-123', quantity: 0 })

    expect(res.status).toBe(400)
    expect(res.body.errors).toContainEqual(expect.objectContaining({ field: 'quantity' }))
  })

  // ---- Category 5: Error paths ----
  it('returns 502 when external payment service fails', async () => {
    vi.spyOn(paymentService, 'charge').mockRejectedValueOnce(new ExternalServiceError('payment', 'timeout'))

    const res = await supertest(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 'prod-123', quantity: 1 })

    expect(res.status).toBe(502)
    expect(res.body.code).toBe('EXTERNAL_SERVICE_ERROR')
    // Important: no internal error details or stack trace
    expect(res.body.stack).toBeUndefined()
  })
})
```

---

## Next.js Route Handler tests

```typescript
// app/api/orders/__tests__/route.test.ts
import { POST } from '../route'
import { NextRequest } from 'next/server'

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest('http://localhost/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

// Mock auth at module level
vi.mock('@/auth', () => ({ auth: vi.fn() }))

describe('POST /api/orders', () => {
  it('returns 401 when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null)
    const res = await POST(makeRequest({ productId: 'prod-1', quantity: 1 }))
    expect(res.status).toBe(401)
  })

  it('creates order when authenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user-1', role: 'customer' } })
    const res = await POST(makeRequest({ productId: 'prod-1', quantity: 2 }))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.quantity).toBe(2)
  })
})
```

---

## tRPC tests

```typescript
import { createCaller } from '@/server/api/root'
import { createInnerContext } from '@/server/api/context'

describe('orderRouter.create', () => {
  it('creates an order for authenticated user', async () => {
    const ctx = createInnerContext({ session: { user: { id: 'user-1' } } })
    const caller = createCaller(ctx)

    const order = await caller.orders.create({ productId: 'prod-1', quantity: 1 })
    expect(order.userId).toBe('user-1')
  })

  it('throws UNAUTHORIZED when no session', async () => {
    const ctx = createInnerContext({ session: null })
    const caller = createCaller(ctx)

    await expect(caller.orders.create({ productId: 'prod-1', quantity: 1 }))
      .rejects.toMatchObject({ code: 'UNAUTHORIZED' })
  })
})
```

---

## Mocking external services (HTTP level)

```typescript
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  http.post('https://api.stripe.com/v1/payment_intents', () =>
    HttpResponse.json({ id: 'pi_test', status: 'succeeded', amount: 5000 })
  ),
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// ---- Simulate external failure ----
it('returns 502 when Stripe is down', async () => {
  server.use(
    http.post('https://api.stripe.com/v1/payment_intents', () =>
      HttpResponse.error()
    ),
  )
  // ... test the endpoint ...
})
```

`msw` intercepts at the network level — your actual adapter code runs, including retry logic. This is better than mocking the HTTP client directly.

---

## Idempotency tests

```typescript
it('second request with same idempotency key returns same result', async () => {
  const payload = { productId: 'prod-1', quantity: 1 }
  const idempotencyKey = 'idem-key-123'

  const first = await supertest(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${token}`)
    .set('Idempotency-Key', idempotencyKey)
    .send(payload)

  const second = await supertest(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${token}`)
    .set('Idempotency-Key', idempotencyKey)
    .send(payload)

  expect(second.status).toBe(200)   // not 201 — replayed
  expect(second.body.id).toBe(first.body.id)   // same order

  const orderCount = await db.orders.count({ where: { userId } })
  expect(orderCount).toBe(1)   // only one row created
})
```

---

---

## Python / FastAPI tests (pytest + httpx)

```python
# tests/test_orders.py
import pytest
from httpx import AsyncClient
from app.main import app
from tests.factories import create_user, create_auth_token, create_order

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c

@pytest.fixture
async def auth_headers():
    user = await create_user(role="customer")
    token = create_auth_token(user)
    return {"Authorization": f"Bearer {token}"}, user

# ---- Category 1: Happy path ----
async def test_create_order_returns_201(client, auth_headers):
    headers, user = auth_headers
    res = await client.post("/orders/", json={"product_id": str(uuid4()), "quantity": 2}, headers=headers)
    assert res.status_code == 201
    body = res.json()
    assert body["user_id"] == str(user.id)
    assert body["quantity"] == 2

# ---- Category 2: Auth ----
async def test_create_order_without_token_returns_401(client):
    res = await client.post("/orders/", json={"product_id": str(uuid4()), "quantity": 1})
    assert res.status_code == 401
    assert res.json()["detail"]["code"] == "UNAUTHORIZED"

async def test_expired_token_returns_401(client):
    expired = create_auth_token(await create_user(), expires_delta=-60)
    res = await client.post(
        "/orders/", json={"product_id": str(uuid4()), "quantity": 1},
        headers={"Authorization": f"Bearer {expired}"}
    )
    assert res.status_code == 401

# ---- Category 3: Permissions ----
async def test_cannot_get_other_users_order(client, auth_headers):
    headers, _ = auth_headers
    other_user = await create_user()
    order = await create_order(user_id=other_user.id)
    res = await client.get(f"/orders/{order.id}", headers=headers)
    assert res.status_code in (403, 404)

# ---- Category 4: Input validation ----
async def test_create_order_missing_product_id_returns_422(client, auth_headers):
    headers, _ = auth_headers
    res = await client.post("/orders/", json={"quantity": 1}, headers=headers)
    # FastAPI returns 422 for Pydantic validation errors
    assert res.status_code == 422
    errors = res.json()["detail"]
    assert any(e["loc"][-1] == "product_id" for e in errors)

async def test_create_order_quantity_zero_returns_422(client, auth_headers):
    headers, _ = auth_headers
    res = await client.post("/orders/", json={"product_id": str(uuid4()), "quantity": 0}, headers=headers)
    assert res.status_code == 422

# ---- Category 5: External service failure ----
async def test_returns_502_when_payment_service_fails(client, auth_headers, mocker):
    headers, _ = auth_headers
    mocker.patch("app.services.payment.charge", side_effect=ExternalServiceError("payment"))
    res = await client.post("/orders/", json={"product_id": str(uuid4()), "quantity": 1}, headers=headers)
    assert res.status_code == 502
    assert res.json()["detail"]["code"] == "EXTERNAL_SERVICE_ERROR"
    assert "stack" not in res.json()   # no internal details
```

**pytest.ini / pyproject.toml config:**

```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]

[tool.pytest.ini_options.markers]
integration = "requires real DB connection"
```

**Database setup for Python tests:**

```python
# conftest.py
import pytest
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from app.db import Base

TEST_DB_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/test_db"

@pytest.fixture(scope="session", autouse=True)
async def create_tables():
    engine = create_async_engine(TEST_DB_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

@pytest.fixture
async def db():
    async with AsyncSession(engine) as session:
        yield session
        await session.rollback()   # clean state after each test
```

**Mocking HTTP calls in Python (respx for httpx, responses for requests):**

```python
import respx
from httpx import Response

async def test_returns_502_when_stripe_is_down(client, auth_headers):
    headers, _ = auth_headers
    with respx.mock:
        respx.post("https://api.stripe.com/v1/payment_intents").mock(
            side_effect=httpx.ConnectError("Connection refused")
        )
        res = await client.post("/orders/", json={"product_id": str(uuid4()), "quantity": 1}, headers=headers)
    assert res.status_code == 502
```

---

## What NOT to do

- **Do not test implementation details** — test inputs and outputs, not internal function calls.
- **Do not assert log output** — tests become brittle when logging changes.
- **Do not hit real external APIs** — always mock at the network level.
- **Do not use production database** — always a test schema or in-memory database.
- **Do not write only happy path** — the interesting bugs live in auth and error paths.

---

## Checklist before marking scope done

- [ ] Happy path test with correct body shape assertion
- [ ] 401 when missing/invalid token
- [ ] 403 or 404 when accessing another user's resource
- [ ] 400 with field-level errors for missing/invalid input
- [ ] 502/500 when external dependency fails — no stack trace in response
- [ ] External HTTP calls mocked (msw or vi.spyOn adapter)
- [ ] No real external API calls — `onUnhandledRequest: 'error'` in msw
- [ ] All tests pass: `npm test` or `vitest run`
