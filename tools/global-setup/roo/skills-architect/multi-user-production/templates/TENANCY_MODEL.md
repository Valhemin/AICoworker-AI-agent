# Tenancy Model

> Status: Proposed, not approved — confirm all sections before implementation.

## Tenancy Pattern

- [ ] Single-tenant (one DB per customer)
- [ ] Shared DB with tenant_id column isolation
- [ ] Schema-per-tenant

**Chosen:** _[fill in]_
**Rationale:** _[why this model fits the product requirements]_

## User Model

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| email | string | Unique, verified |
| status | enum | active / suspended / deleted |
| created_at | timestamp | |
| last_login_at | timestamp | |

## Tenant / Org Model (if applicable)

| Field | Type | Notes |
|---|---|---|
| id | UUID | |
| name | string | |
| plan | enum | |
| status | enum | active / suspended / canceled |
| created_at | timestamp | |

## Membership Model

| Field | Type | Notes |
|---|---|---|
| user_id | FK | |
| org_id | FK | |
| role | enum | owner / admin / member / viewer |
| invited_by | FK | |
| joined_at | timestamp | |
| status | enum | active / pending / revoked |

## Isolation Enforcement

- Tenant ID sourced from: _[authenticated session / JWT claim — NOT client request]_
- DB-level enforcement: _[row-level security / query filter / schema isolation]_
- Test coverage: _[cross-tenant access test file]_

## Account Lifecycle States

- Suspension: _[behavior — what user sees, what data is preserved]_
- Deletion: _[retention window, anonymization policy]_
- Recovery: _[re-activation flow]_

## Assumptions & Decisions

| Topic | Value | Status |
|---|---|---|
| Max orgs per user | _[N]_ | Proposed, not approved |
| Invitation expiry | _[7 days]_ | Proposed, not approved |
| Soft vs hard delete | _[soft]_ | Proposed, not approved |
