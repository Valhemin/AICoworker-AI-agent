# OWASP controls for this slice

Baseline: OWASP Top 10:2021 and OWASP ASVS Level 1. State the control the code must have. Do not include payloads or bypass steps.

Severity: CRITICAL or HIGH blocks ship. MEDIUM is fixed in the same slice when the change is local. LOW may be deferred with a note.

## A01 Broken access control — HIGH

- Every object read or write includes the server-side owner or tenant. The id in the request is not proof of ownership.
- Role checks run on the server. Hiding a button is not a control.
- Tenant or user id comes from the session, not from the body.
- Redirect targets and file paths stay on an allowlist. `..` does not leave the allowed directory.
- Admin and debug routes are absent in production.

## A02 Cryptographic failures — CRITICAL if passwords or tokens

- Passwords use bcrypt (cost ≥ 12), Argon2id, or scrypt.
- TLS only for browser and app traffic. Cookies that carry a session are `Secure`, `HttpOnly`, and `SameSite`.
- Tokens and session ids are not in `localStorage`, query strings, or logs.
- Secrets come from the environment or a secret store. No new secret in git.

## A03 Injection — CRITICAL

- Queries are parameterized. Object updates use an explicit field allowlist.
- HTML is escaped by the framework. Raw HTML goes through a sanitizer already in the repo.
- User input does not reach `exec`, `spawn`, or `eval`.
- Response headers that reflect input are escaped or rejected.

## A04 Insecure design — HIGH when the flow is new

- Password reset links expire and work once. A password change revokes existing sessions.
- Webhooks check signature and expiry.
- A user-supplied URL cannot make the server call internal hosts or cloud metadata endpoints. Allowlist the host.
- Merging untrusted JSON does not pollute object prototypes.
- Rate limit login, registration, password reset, OTP, and expensive endpoints.

## A05 Security misconfiguration — HIGH for public web responses

Production responses that this slice adds include:

- `Content-Security-Policy` (no broad `unsafe-eval` without a written reason in the assurance note)
- `Strict-Transport-Security` on HTTPS responses
- frame embedding denied (`frame-ancestors 'none'` or equivalent)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- CORS lists exact origins. `*` is not used on credentialed routes.
- Errors to the client are generic. Stack traces and SQL errors stay in server logs.

## A06 Vulnerable components — HIGH if a critical advisory applies to a changed dependency

- The lockfile changed only for the packages this slice needs.
- The repo audit command reports no unaddressed critical advisory in those packages.
- Install scripts from an unexpected registry are out of scope until a person approves them (`command-risk`).

## A07 Authentication failures — CRITICAL

- Session id changes after login and is invalidated on logout.
- JWT verification checks signature, `exp`, and expected `iss` / `aud`. `alg: none` is rejected.
- OAuth callbacks check `state`.
- Login errors do not reveal whether the account exists.
- Brute-force protection exists on auth endpoints.

## A08 Software and data integrity — HIGH

- Browser assets and desktop updates are loaded over HTTPS from the project's own origin or a pinned store.
- Deserialized data from the client is schema-checked before use.
- CI or deploy config in this slice does not disable signature or checksum checks.

## A09 Logging and monitoring — MEDIUM

- Auth failure, access denial, and admin actions are logged.
- Logs omit passwords, tokens, national ids, and full payment numbers.

## A10 Server-side request forgery — HIGH if the server fetches a URL

- The host is allowlisted before the fetch.
- Redirects from that fetch are not followed to a new host.
- The response is size-limited.

## API and file add-ons

- Body schema rejects unknown fields and sets a max size.
- Uploads: server-side size and type checks, stored outside the web root, filename stripped of path and executable extension.
- List endpoints are paginated.
