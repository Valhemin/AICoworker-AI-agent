---
name: api-integration-workflow
description: "adding a call to an external API, integrating a third-party service, or building a client for a remote endpoint"
---

TRIGGER: adding a call to an external API, integrating a third-party service, or building a client for a remote endpoint
OUTPUT: detailed — auth, error mapping, retry/timeout, logging, tests documented per integration with security rules
SKIP: internal service-to-service calls within the same codebase that share auth and error handling

---

# API Integration Workflow

Use when: adding a call to an external API, integrating a third-party service, or building a client for a remote endpoint.

## Pre-Integration Checklist

Before writing code:
- [ ] Research the API: auth method, rate limits, pagination, error response shape. Use `research-before-implement`.
- [ ] Check project for existing HTTP client / API wrapper pattern. Reuse it.
- [ ] Confirm which environment (dev/staging/prod) the API key targets.
- [ ] Identify if a sandbox/mock endpoint exists for local dev.

## Implementation Order

1. **Config first** — add credentials to env vars and config validation before any code uses them. Follow `env-config-management` skill if present.
2. **Client/wrapper** — thin wrapper around the HTTP call with typed request/response. Do not scatter raw fetch/axios calls across business logic.
3. **Error mapping** — map vendor error codes to internal error types at the wrapper boundary. Business logic should not know about HTTP 429 or vendor-specific error payloads.
4. **Retry and timeout** — every external call needs a timeout. Add retry with exponential backoff for transient errors (5xx, network timeout). Do not retry 4xx.
5. **Logging** — log request (method, URL, no secrets) and response (status, latency). Never log response bodies containing PII or secrets.
6. **Tests** — mock the HTTP layer for unit tests. Do not hit live APIs in unit/integration tests. Record real responses for contract tests if needed.

## Security Rules

- Never hardcode credentials, tokens, or API keys in source files.
- Never log Authorization headers, tokens, or response bodies that may contain secrets.
- Validate and sanitize any data returned from external APIs before using it in DB writes or rendering.
- If the API returns user data, apply the same privacy rules as user-generated data.

## Rate Limit Handling

- Check response headers (`X-RateLimit-Remaining`, `Retry-After`) when available.
- Back off on 429. Do not retry immediately.
- Consider a queue or token bucket if high call volume is expected.

## Output Contract

Document per integration:
- API name and version used.
- Auth method (key, OAuth, HMAC).
- Error codes handled and their mapping.
- Rate limit strategy.
- Sandbox/mock approach for local dev.
- Environment variables added (names only, never values).
