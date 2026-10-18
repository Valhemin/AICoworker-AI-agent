---
name: api-integration-workflow
description: Add or modify a call to an external API or third-party service — adapter structure, auth, retry, circuit breaker, OAuth, and webhook receiving.
---

TRIGGER: adding or modifying calls to an external API or third-party service
OUTPUT: compact — working integration with auth, error handling, retry, circuit breaker where needed, env-var setup verified
SKIP: internal function calls, database queries, or intra-service calls that do not cross a network boundary

---

# API Integration Workflow

## Before writing any code

1. Run `research-before-implement` for this specific API — do not rely on memory for endpoint paths, auth flows, or rate limits. APIs change.
2. Confirm: base URL, auth scheme, rate limits, error format, sandbox/test mode availability.
3. Identify the tier needed — free tiers often have lower rate limits or missing endpoints.

---

## Integration structure — adapter layer

Never call an external API directly from a route handler, component, or business rule. Isolate it:

```
adapters/
  <service-name>/
    client.ts       ← HTTP client, base URL from env, auth headers, timeout
    <resource>.ts   ← one file per resource group (users, payments, webhooks)
    types.ts        ← request/response types — never use `any`
    errors.ts       ← maps API error codes to named app errors
    __tests__/
      <resource>.test.ts  ← mock the HTTP client, test error mapping
```

This structure means: when the API changes, only the adapter changes. Business logic is unaffected.

---

## Auth handling

| Scheme | Implementation |
|---|---|
| API key (header) | Set at client construction, never per-request |
| API key (query param) | Set at client construction — log URL without the key |
| Bearer token (static) | Set at client construction from env |
| OAuth 2 — client credentials (M2M) | Fetch token at startup, refresh before expiry |
| OAuth 2 — authorization code (user auth) | See OAuth section below |
| mTLS | Load cert from file path in env, not the cert content in env |

```typescript
// adapters/<service>/client.ts
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.SERVICE_BASE_URL,
  timeout: 10_000,   // 10s default — shorter for user-facing calls
  headers: {
    'Authorization': `Bearer ${process.env.SERVICE_API_KEY}`,
    'User-Agent': 'YourApp/1.0',
    'Content-Type': 'application/json',
  },
})

// Never log request/response bodies that may contain credentials or PII
client.interceptors.request.use(req => {
  logger.debug('api-request', { method: req.method, url: req.url })   // no body
  return req
})

export default client
```

---

## OAuth 2 flows

### Client credentials (machine-to-machine, no user involved)

```typescript
// adapters/<service>/auth.ts
let token: string | null = null
let tokenExpiry = 0

export async function getToken(): Promise<string> {
  if (token && Date.now() < tokenExpiry - 60_000) return token   // refresh 60s early

  const response = await fetch(`${process.env.SERVICE_AUTH_URL}/oauth/token`, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SERVICE_CLIENT_ID!,
      client_secret: process.env.SERVICE_CLIENT_SECRET!,
      scope: 'read:data write:data',
    }),
  })
  if (!response.ok) throw new AuthError('Token fetch failed')

  const data = await response.json()
  token = data.access_token
  tokenExpiry = Date.now() + data.expires_in * 1000
  return token!
}
```

### Authorization code (user-facing OAuth — login with Google, GitHub, etc.)

For web apps, use `next-auth` / `auth.js` — do not implement the flow manually. For backend-only flows:

```typescript
// 1. Redirect user to authorization URL
const authUrl = new URL(`${process.env.SERVICE_AUTH_URL}/authorize`)
authUrl.searchParams.set('client_id', process.env.SERVICE_CLIENT_ID!)
authUrl.searchParams.set('redirect_uri', process.env.SERVICE_REDIRECT_URI!)
authUrl.searchParams.set('scope', 'read:data write:data')
authUrl.searchParams.set('state', generateCsrfToken())   // prevent CSRF
authUrl.searchParams.set('response_type', 'code')

// 2. Exchange code for token (in callback route)
const tokenResponse = await fetch(`${process.env.SERVICE_AUTH_URL}/oauth/token`, {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: process.env.SERVICE_REDIRECT_URI!,
    client_id: process.env.SERVICE_CLIENT_ID!,
    client_secret: process.env.SERVICE_CLIENT_SECRET!,
  }),
})
```

Always verify `state` matches what was sent — prevents CSRF attacks on the OAuth callback.

---

## Error handling — map to named errors

```typescript
// adapters/<service>/errors.ts
export class RateLimitError extends Error {
  code = 'RATE_LIMIT' as const
  constructor(public retryAfterMs?: number) { super('Rate limit exceeded') }
}
export class AuthError extends Error { code = 'AUTH_FAILED' as const }
export class NotFoundError extends Error { code = 'NOT_FOUND' as const }
export class ServiceUnavailableError extends Error {
  code = 'SERVICE_UNAVAILABLE' as const
  constructor(public cause: unknown) { super('External service unavailable') }
}

export function mapApiError(status: number, headers: Headers, body: unknown): never {
  const retryAfter = headers.get('Retry-After')
  const retryMs = retryAfter ? Number(retryAfter) * 1000 : undefined

  if (status === 429) throw new RateLimitError(retryMs)
  if (status === 401 || status === 403) throw new AuthError()
  if (status === 404) throw new NotFoundError()
  if (status >= 500) throw new ServiceUnavailableError(body)
  throw new ServiceUnavailableError(`Unexpected status ${status}`)
}
```

---

## Retry policy with exponential backoff

```typescript
async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      // Retry only on transient errors
      if (err instanceof RateLimitError || err instanceof ServiceUnavailableError) {
        if (attempt === maxAttempts) throw err

        const baseDelay = err instanceof RateLimitError && err.retryAfterMs
          ? err.retryAfterMs
          : Math.pow(2, attempt) * 500   // 1s, 2s, 4s
        const jitter = Math.random() * 200
        await sleep(baseDelay + jitter)
        continue
      }
      throw err   // Do NOT retry: AuthError, NotFoundError, ValidationError
    }
  }
  throw new Error('unreachable')
}
```

Do NOT retry: 400, 401, 403, 404, 422 — these are caller errors. Retrying wastes quota and masks bugs.

---

## Circuit breaker (for critical external dependencies)

When an external service is down, a circuit breaker stops calling it and returns a cached or degraded response immediately — prevents cascading failures:

```typescript
import CircuitBreaker from 'opossum'

const breaker = new CircuitBreaker(fetchFromExternalAPI, {
  timeout: 5000,          // call fails if > 5s
  errorThresholdPercentage: 50,   // open circuit if >50% of calls fail
  resetTimeout: 30_000,   // try again after 30s
})

breaker.fallback(() => getCachedData())   // return cached data when circuit is open

breaker.on('open', () => logger.warn('circuit-breaker-open', { service: 'external-api' }))
breaker.on('halfOpen', () => logger.info('circuit-breaker-half-open'))
breaker.on('close', () => logger.info('circuit-breaker-closed'))

export const safeExternalCall = (params: Params) => breaker.fire(params)
```

Use circuit breaker when: the external service is not under your control, failure would degrade your own service, and you have a reasonable fallback (cache, default value, graceful degradation).

---

## Webhook receiving (inbound)

```typescript
// Verify signature FIRST — before parsing body
router.post('/webhooks/:provider',
  express.raw({ type: 'application/json' }),   // raw body required for HMAC check
  async (req, res) => {
    const provider = req.params.provider
    const signature = req.headers[`${provider}-signature`] as string

    if (!verifyWebhookSignature(req.body, signature, process.env[`${provider.toUpperCase()}_WEBHOOK_SECRET`]!)) {
      logger.warn('webhook-invalid-signature', { provider })
      return res.status(400).json({ code: 'INVALID_SIGNATURE' })
    }

    const event = JSON.parse(req.body.toString())

    // Idempotency — check if already processed
    const alreadyProcessed = await db.processedWebhooks.findUnique({ where: { eventId: event.id } })
    if (alreadyProcessed) return res.json({ status: 'already_processed' })

    await processWebhookEvent(event)
    await db.processedWebhooks.create({ data: { eventId: event.id, processedAt: new Date() } })

    res.json({ received: true })   // Always 200 — non-200 causes delivery retries
  }
)

function verifyWebhookSignature(body: Buffer, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
  // Use timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
```

---

## Idempotency for outgoing mutations

```typescript
// For APIs that support it (Stripe, some payment providers)
await stripeClient.paymentIntents.create({ amount, currency }, {
  idempotencyKey: `order-${orderId}-payment`,   // same key = same result
})
```

Log the idempotency key with the request so duplicate detection is possible after a failure.

---

## After integration

- Run `api-testing` skill — mandatory.
- Test with sandbox/test credentials — never hit production with test data.
- Document the integration in `docs/architecture/external-services.md` (or equivalent):
  - Service name, what we use it for, auth type, rate limits, sandbox URL.

---

## Checklist before marking scope done

- [ ] Credentials loaded from env — never hardcoded
- [ ] `.env.example` updated with placeholder + comment
- [ ] Adapter layer isolates the HTTP client — no direct calls from business logic
- [ ] Named error classes defined and mapped
- [ ] Retry on transient errors only (429, 5xx) — not on 4xx
- [ ] Circuit breaker added if this is a critical external dependency
- [ ] Webhook signature verified before parsing body
- [ ] Webhook events deduplicated (event ID checked before processing)
- [ ] `api-testing` run with mocked HTTP client
