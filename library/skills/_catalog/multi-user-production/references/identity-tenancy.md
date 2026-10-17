# Identity & Tenancy

## User Model

- User entity: id, email, hashed_password (or provider_id), status (active/suspended/deleted), created_at
- Email must be verified before granting full access
- Soft-delete users — preserve audit history, do not hard-delete
- Track last_login_at and last_active_at for compliance and cleanup

## Tenancy Patterns

| Pattern | When to use |
|---|---|
| Single-tenant (one DB per customer) | High isolation requirement, compliance (HIPAA, FedRAMP), large enterprise |
| Shared DB, tenant_id column | Most SaaS — simple, cost-effective, sufficient isolation with correct query scoping |
| Schema-per-tenant | Moderate isolation without full DB per tenant; useful when schema varies per tenant |

Every query in a shared-DB model must include `WHERE tenant_id = :currentTenantId`. Never rely on application logic alone — enforce at DB level with row-level security or equivalent where possible.

**Never trust tenant_id from client request body or URL param. Always derive from authenticated session.**

## Organizations & Workspaces

- A user can belong to multiple organizations
- Membership record: user_id, org_id, role, invited_by, joined_at, status
- Invitation lifecycle: pending → accepted | expired | revoked
- Invitation tokens must expire (default 7 days)
- Org deletion: define whether it cascades or requires explicit member offboarding

## Account Lifecycle

- Suspension: user cannot authenticate; data preserved
- Deletion: follow retention policy; anonymize PII after retention window
- Recovery: re-activation flow for suspended accounts
- Ownership transfer: must be explicit, audited, and confirmed by both parties where applicable

## Session & Device Management

- Sessions must have an expiry
- Refresh tokens must be rotatable and revocable
- Provide "sign out all devices" capability
- Concurrent session limit is a product decision — document it
- Store: session_id, user_id, device_fingerprint, created_at, last_used_at, expires_at, revoked
