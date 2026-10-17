# Admin & Support Operations

## Principles

- Admins must not be able to make arbitrary DB changes in production. All mutations go through audited interfaces.
- Impersonation (acting as a user) requires an explicit audit entry and — for sensitive products — a separate approval flow.
- Admin tools are an attack surface: protect them with the same rigor as the user-facing product.
- Every admin action must be logged: `{ action, admin_id, target_id, reason, timestamp }`.

## Required Admin Capabilities

| Operation | Notes |
|---|---|
| User lookup by email / ID | Read-only; log the lookup |
| Tenant / org lookup | Read-only |
| Account suspension | Reversible; requires reason field |
| Account unsuspension | Reversible |
| Audit history view | Read-only; time-range filter |
| Safe job retry | Idempotent re-trigger only; no arbitrary exec |
| Feature flag override per tenant | Useful for support; must be audited |
| Diagnostic export | Structured data export for debugging; sanitize PII before export |

## What to Avoid

- No "run this SQL" interface — use safe, typed admin actions instead
- No bulk delete without multi-step confirmation and audit
- Impersonation should be time-limited (auto-expires), reason-required, and visible to the impersonated user in their audit log
- Admin endpoints must not be reachable without additional authentication (separate admin session, IP allowlist, or MFA)

## Access Control for Admin Tools

- Admin role must be separately gated — not just "is_admin: true" in the user table
- Principle of least privilege: support agents get read-only + safe ops; only engineers get broader access
- Admin tool access must be reviewed periodically (quarterly or on team changes)
