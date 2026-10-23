TRIGGER: feature involves auth, payments, uploads, external integrations, multi-tenant data, secrets, real-time, file system, or user-generated content
OUTPUT: structured threat report — severity per finding (CRITICAL/HIGH/MEDIUM/LOW), required fixes, deferred risks
SKIP: pure read-only UI with no data mutation and no external calls

---

# Security Threat Model

Run before shipping any feature in the trigger list. Not a full pentest — a structured pre-ship check.

## Step 1 — Identify Trust Boundaries

Map every point where data crosses a trust boundary:
- External → backend (HTTP request, webhook, file upload)
- Backend → external (API call, email, SMS)
- Frontend → backend (form submit, query param, header)
- Service → service (internal RPC, queue message)
- User A → User B data (multi-tenant, shared resources)
- Electron renderer → main process (IPC)
- Mobile app → device (file system, keychain, clipboard)

For each boundary: who controls the input? Can it be spoofed or tampered?

## Step 2 — Threat Checklist by Feature Type

Run only the sections relevant to what was implemented.

### Auth & Sessions
- [ ] Passwords hashed with bcrypt (cost ≥12), Argon2id, or scrypt — never MD5/SHA1/plain
- [ ] JWT: signature validated, `exp` checked, `alg: none` rejected, stored in `httpOnly` cookie
- [ ] Session ID regenerated after login; invalidated on logout
- [ ] OAuth: `state` parameter validated on callback
- [ ] Role/permission check on server — not just hidden in UI
- [ ] IDOR: ownership verified before returning or modifying any resource by ID
- [ ] Account enumeration prevented (same error for "user not found" vs "wrong password")
- [ ] Brute-force protection on login, register, password reset, OTP endpoints

### Input & Injection
- [ ] All inputs validated at API layer with explicit schema (Zod/Pydantic/Joi) — no raw `req.body` spread
- [ ] SQL/NoSQL: parameterized queries only — no string concatenation
- [ ] HTML output: framework autoescaping active; `dangerouslySetInnerHTML` / `v-html` sanitized with DOMPurify
- [ ] File paths: resolved and confined to allowed base directory; `..` rejected
- [ ] Shell commands: no user input passed to `exec()`, `spawn()`, `eval()`
- [ ] Mass assignment: explicit field whitelist on all model create/update operations

### CSRF & Request Forgery
- [ ] State-changing endpoints require CSRF token or verify `Origin`/`Referer`
- [ ] Cookies: `SameSite=Strict` or `Lax`; `None` only with explicit reason
- [ ] CORS: explicit origin whitelist; `*` only on fully public unauthenticated endpoints

### Data Exposure
- [ ] API responses: only fields caller needs — no full model dumps
- [ ] Error responses: generic message to client, detail in server logs only
- [ ] No stack traces, internal paths, DB errors, system info in responses
- [ ] PII stripped from logs (no passwords, tokens, full email, national ID, card numbers)
- [ ] Sensitive fields masked in list endpoints

### File Uploads
- [ ] Max file size enforced server-side (not just client validation)
- [ ] MIME type validated server-side (not just file extension)
- [ ] Files stored outside web root or in object storage (not served directly)
- [ ] Filename sanitized before storage — no path traversal, no executable extension preserved
- [ ] Malware scan considered for untrusted file sources

### Secrets & Config
- [ ] No credentials, API keys, or tokens in source code or config files committed to git
- [ ] `.env` in `.gitignore`; no `.env` in Docker image layers
- [ ] All secrets via environment variables or secret manager
- [ ] Least-privilege: credentials scoped to minimum required permissions

### Rate Limiting & Abuse
- [ ] Auth endpoints rate-limited (login, register, password reset, OTP, email verify)
- [ ] Resource-intensive endpoints rate-limited (search, export, AI calls, file processing)
- [ ] Pagination on all list endpoints — no unbounded queries
- [ ] `429 Too Many Requests` with `Retry-After` returned on limit hit

### Multi-Tenant / Data Isolation
- [ ] Every DB query scoped to current tenant/user — no cross-tenant data leak possible
- [ ] Tenant ID comes from server session, not from request body/params
- [ ] Background jobs verify tenant scope before operating on data

### Real-Time & WebSockets
- [ ] Auth verified on connection upgrade — not just on HTTP handshake
- [ ] Message origin validated — don't trust `event.data` without schema check
- [ ] Rate-limit message frequency per connection
- [ ] Disconnect unauthenticated connections promptly

### Platform-Specific

**Electron:**
- [ ] `contextIsolation: true`, `nodeIntegration: false`
- [ ] All IPC message shapes validated in main process handler
- [ ] No Node.js APIs exposed to renderer via `contextBridge` beyond what's needed

**Mobile:**
- [ ] Sensitive data in secure storage (Keychain/Keystore) — not AsyncStorage/SharedPreferences
- [ ] No secrets, tokens, or PII in crash reporter logs
- [ ] Deep link parameters validated before use

**Web:**
- [ ] `Content-Security-Policy` header set
- [ ] `X-Frame-Options: DENY` (clickjacking prevention)
- [ ] `Strict-Transport-Security` on production
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`

## Step 3 — Output Format

For each finding:
```
[SEVERITY] Category — Finding
  Risk: what an attacker can do if this is exploited
  Fix: minimal correct remediation
  Status: required-before-ship | defer-with-note | accepted-risk
```

Severity levels:
- **CRITICAL**: data breach, account takeover, RCE, auth bypass — block ship
- **HIGH**: privilege escalation, significant data exposure, injection — block ship
- **MEDIUM**: information leakage, missing rate limit, CSRF on low-value action — fix soon
- **LOW**: defense-in-depth improvement, security header missing — note and defer OK

End with:
- Required fixes (CRITICAL + HIGH) — must resolve before shipping
- Deferred risks — MEDIUM/LOW with accepted-risk note
- What was not checked (scope limits)
