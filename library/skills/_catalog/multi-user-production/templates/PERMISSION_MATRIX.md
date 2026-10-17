# Permission Matrix

> Status: Proposed, not approved — confirm role design before implementation.

## Roles

| Role | Description |
|---|---|
| owner | Full control; can delete org; can transfer ownership |
| admin | Can manage members and settings; cannot delete org |
| member | Can use core features; cannot manage team |
| viewer | Read-only access |

_Add or remove roles to match actual product requirements._

## Permission Table

| Action | owner | admin | member | viewer |
|---|---|---|---|---|
| Create resource | ✓ | ✓ | ✓ | ✗ |
| Edit own resource | ✓ | ✓ | ✓ | ✗ |
| Edit any resource | ✓ | ✓ | ✗ | ✗ |
| Delete own resource | ✓ | ✓ | ✓ | ✗ |
| Delete any resource | ✓ | ✓ | ✗ | ✗ |
| Invite member | ✓ | ✓ | ✗ | ✗ |
| Remove member | ✓ | ✓ | ✗ | ✗ |
| Change member role | ✓ | ✓ | ✗ | ✗ |
| View billing | ✓ | ✓ | ✗ | ✗ |
| Change billing | ✓ | ✗ | ✗ | ✗ |
| Delete org | ✓ | ✗ | ✗ | ✗ |
| Export data | ✓ | ✓ | ✗ | ✗ |

_Fill in ✓ / ✗ for every action × role combination. No blank cells._

## Enforcement Location

- Authorization check: _[e.g. src/auth/permissions.ts]_
- Middleware / guard: _[e.g. requireRole middleware]_
- Test file: _[e.g. tests/authorization.test.ts]_

## Audit Log Coverage

Actions that must appear in the audit log:

- [ ] Member invite sent
- [ ] Member joined / declined
- [ ] Member removed
- [ ] Role changed
- [ ] Resource deleted
- [ ] Billing changed
- [ ] Data exported
- [ ] Account suspended / unsuspended

## Open Decisions

| Decision | Proposed value | Status |
|---|---|---|
| Can members see other members? | Yes | Proposed, not approved |
| Resource-scoped roles? | No (org-wide only) | Proposed, not approved |
