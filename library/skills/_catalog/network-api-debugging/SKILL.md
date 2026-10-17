---
name: network-api-debugging
description: "HTTP endpoint returns unexpected status code, times out, auth fails despite correct credentials, or payload contract mismatch between services"
---

TRIGGER: HTTP endpoint returns unexpected status code, times out, auth fails despite correct credentials, or payload contract mismatch between services
OUTPUT: detailed — request path traced per hop, failure category, auth/payload check result, fix with successful request verification
SKIP: frontend network inspection in browser (use chrome-devtools-debugging instead)

---

# Network / API Debugging

For frontend network inspection use `chrome-devtools-debugging`. This skill covers the server and client-to-server layer.

## Process

### 1. Isolate the Request
- Reproduce the failure with the smallest possible request (curl, httpie, or minimal code).
- Capture: method, URL, headers (redact secrets), body, response status + body + headers, latency.
- Confirm failure is reproducible before investigating.

### 2. Classify the Failure

| Signal | First suspect |
|---|---|
| 4xx from own service | Request validation, auth middleware, routing |
| 4xx from downstream | Auth token, rate limit, schema mismatch, wrong endpoint |
| 5xx from own service | Unhandled exception, missing dependency, DB error |
| 5xx from downstream | Downstream instability — check their status page |
| Timeout | Network path, slow query, missing connection pool limit, deadlock |
| Connection refused | Wrong host/port, service not running, firewall |
| Intermittent failure | Retry logic, circuit breaker, load balancer sticky sessions, race |

### 3. Trace the Request Path
- Identify every hop: client → gateway/proxy → service → downstream → DB.
- Check logs at each hop for the correlation ID / request ID.
- Confirm where the failure originates — do not assume the first error surface is the root.

### 4. Check Auth Separately
- Token present? Correct format (Bearer, Basic, API key header)?
- Token expired? Check expiry, clock skew between services.
- Correct scope/permissions for the endpoint?
- If OAuth: check token exchange, not just the access token.

### 5. Validate Payload Contract
- Compare actual request body/headers against the API schema (OpenAPI/Swagger, source code).
- Check content-type header matches body encoding.
- Check for encoding issues (double-encoded JSON, wrong charset).
- For binary/multipart: verify boundary and part headers.

### 6. Check Environment-Specific Config
- Base URL, port, protocol (http vs https) correct for the environment?
- TLS cert valid and trusted?
- Proxy or VPN required?
- Firewall rule blocking the port?

### 7. Apply Minimal Fix
- Fix only the confirmed root cause.
- Do not add retry logic to mask a correctness bug.
- Do not increase timeouts without understanding the cause of slowness.

## Output Contract

Output contract: see rules-debug/01.

- **Request path traced**: each hop and what was observed.
- **Failure category**: from the classification table, or "not yet classified."
- **Auth check result**: pass / fail / not applicable.
- **Payload check result**: valid / invalid / not checked.
