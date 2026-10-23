# Authorization

## Principles

- **Authentication ≠ Authorization.** Knowing who you are does not mean you can do anything.
- **Deny by default.** Unrecognized actions are forbidden, not allowed.
- **Server-side always.** Never rely on frontend role checks. The UI hides buttons; the server enforces access.
- **Separate auth from business logic.** An `isAllowed(user, action, resource)` check should be in one place, not scattered.

## Role Design

Define roles in `docs/multi-user/PERMISSION_MATRIX.md`. Common patterns:

| Pattern | When to use |
|---|---|
| Simple roles (owner/admin/member/viewer) | Most SaaS — small permission surface |
| Resource-scoped roles (can edit this project) | When users need different roles per resource |
| ABAC (attribute-based) | Complex policies — user.department == resource.department |
| RBAC + field-level restrictions | Compliance use cases |

Start with the simplest model that covers the real requirements. Do not implement ABAC for a product that only needs owner/member.

## Required Tests

Every authorization change must be covered by:

- A test that confirms the allowed action works
- A test that confirms the denied action returns 403 (not 404, not 500)
- A cross-tenant test: user from tenant A cannot access tenant B's resource
- A privilege escalation test: member cannot perform owner-only action

## Audit Logging

Log every sensitive action: `{ action, actor_id, tenant_id, resource_type, resource_id, outcome, timestamp, ip }`.

Sensitive actions include: login, logout, password change, role change, member invite/remove, data export, delete, billing change, admin override.

Never log full request bodies — sanitize PII before writing to the audit log.
