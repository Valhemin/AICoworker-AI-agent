---
name: security-threat-model
description: "feature involves auth, payments, uploads, external integrations, multi-tenant data, secrets, real-time, file system, or user-generated content"
---

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
- [ ] Hardcoded secrets are reported as file location and type only. Values stay redacted.
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

## Web and app — block before marking done

If a slice touches auth, forms, files, URLs, sessions, payments, WebView, or IPC, run the checks below. Any open CRITICAL or HIGH finding means the task cannot be reported complete or handed to testers as passing.

### Web-to-server connections

- All data requests go over HTTPS. No API calls over HTTP. No scripts, user images, or WebSocket connections over unencrypted channels.
- Session cookies have `Secure`, `HttpOnly`, and `SameSite`. Tokens are not stored in `localStorage`, query strings, or logs.
- CORS allowlist includes only the app's own origin. Do not use `*` when requests carry cookies or tokens.
- Data-mutating requests verify CSRF or `Origin`. Webhooks verify signature and expiry.
- Server rejects unknown hosts when constructing absolute links. Redirects only target an allowlist.
- Errors returned to the browser are generic. Details stay in server logs only, and logs contain no passwords or tokens.
- User-supplied URLs must not cause the server to call internal machines or cloud metadata endpoints.
- `postMessage` checks `origin`. Shared caches do not contain one user's private data.
- Password-reset links are single-use and expire. Changing a password invalidates all active sessions.
- Production has no debug routes, default credentials, or stack traces returned to clients.
- Uploaded files are not extracted outside the allowed directory. Upload content is never executed.
- Merging objects from untrusted JSON must block prototype pollution.
- Packages fetched from unknown URLs or with a `postinstall` script are treated as high-risk per `command-risk`.

### App-to-server connections

- The app communicates over HTTPS with its own server only. No trusting all certificates. No disabling hostname verification.
- Pin the server's public key or certificate. A key rotation requires a new app release — do not relax the check in the running version.
- Access tokens are short-lived. Refresh tokens rotate on every use. Reusing an old token invalidates the whole session.
- Tokens are stored in the OS secure store. Not in backups, clipboard, crash logs, or regular memory.
- Every request carries the app version. Server rejects versions below the minimum.
- WebView does not open an arbitrary JS bridge and does not load external pages within the same bridge.
- Deep link and intent parameters are validated before a screen opens or an action runs.
- Components exported outside the app do not accept data and then execute a command.
- Install and update packages must have a verified signature. No installing packages from unknown sources.

### One account, one device

Applies when implementing a login flow. Web does not require single-device enforcement.

- Server keeps one active session per account. Logging in on a new device immediately invalidates the previous device's session and refresh token.
- The old device receives a "session replaced" error. The app deletes local tokens and returns to the login screen. The old access token is not kept until natural expiry.
- Logout, password change, or server-side revocation also deletes that session.
- Do not lock a device with a self-generated code stored only on the device. Another device must not be able to replay that code to hijack the session.

### Forced app update

- Server maintains a minimum version. The app sends its version on every request.
- Versions below the minimum receive a distinct error code — no business data is returned.
- The app blocks the entire screen, states a new version is required, and directs the user to the store or a signature-verified package. No skip button.
- Do not accept update files from arbitrary URLs. Do not lower the minimum version to allow old builds to continue.

A bug fix must never disable auth checks, remove CSRF, widen CORS to all domains, trust all certificates, or downgrade the password-hashing algorithm to make the app work.
