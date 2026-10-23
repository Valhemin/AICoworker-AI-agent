---
name: multi-user-production
description: >
  Use when a project supports multiple authenticated users,
  organizations, shared resources, tenant-isolated data,
  paid plans, quotas, or production-scale requirements.
---

TRIGGER: project has ANY of the following:
- Multiple user accounts with authentication
- Organizations, teams, workspaces, or tenants
- Shared resources between users
- Role-based or permission-based access control
- Tenant-isolated data ownership
- Subscription, billing, or usage quotas
- Admin / support operations
- Production availability target, backup, or disaster-recovery requirement

SKIP when project is:
- Static landing page with no auth
- Local-only single-user tool
- Unauthenticated prototype
- Offline app with no shared data

---

## Step 0 — Confirm Scope With User

Before designing, present these as **proposed, not decided**:

- Tenancy model (single-tenant / shared / isolated)
- Organization / workspace structure
- Role and permission design
- Expected user count and concurrent traffic
- Availability target (e.g. 99.9%), RPO, RTO
- Infrastructure budget
- Data residency and retention period
- Billing model and quota design (if any)
- Admin access scope
- Compliance requirements (GDPR, HIPAA, SOC2, etc.)

Mark every item `Status: Proposed, not approved` until the user confirms. Do not proceed with design decisions that affect these without approval.

---

## What to Build

Load the reference file matching the current concern. Do not load all at once.

| Concern | Reference |
|---|---|
| User accounts, orgs, tenant model | `references/identity-tenancy.md` |
| Roles, permissions, access control | `references/authorization.md` |
| Scale, load, availability | `references/capacity-reliability.md` |
| Brute force, spam, abuse | `references/abuse-protection.md` |
| Backup, recovery, outage | `references/disaster-recovery.md` |
| Admin tools, support ops | `references/admin-operations.md` |
| Billing, quotas, metering | `references/billing-quotas.md` |

---

## Approval Gates

Require explicit user confirmation before:

- Choosing tenancy model
- Choosing authentication provider
- Changing authorization model
- Choosing primary database
- Adding a paid service
- Adding billing integration
- Changing retention policy
- Adding telemetry
- Changing public API contract
- Running any migration
- Deploying to production

---

## Required Artifacts

Create under `docs/multi-user/` when skill is activated:

- `TENANCY_MODEL.md` — use template
- `PERMISSION_MATRIX.md` — use template
- `CAPACITY_PLAN.md` — use template
- `DISASTER_RECOVERY.md` — use template
- `ABUSE_PROTECTION.md` — free-form, cover all threat vectors
- `ADMIN_OPERATIONS.md` — free-form, cover safe ops and guardrails
- `BILLING_AND_QUOTAS.md` — only if project has monetization

---

## Source of Truth Precedence (multi-user addendum)

```
User-approved business decision
> PRODUCT.md
> TENANCY_MODEL.md
> PERMISSION_MATRIX.md
> SECURITY.md
> DATA_MODEL.md
> Architecture decisions
> Skill defaults
> Model assumptions
```

When conflict exists — stop and surface it. Never silently resolve.

---

## Done Checklist (multi-user features)

- [ ] Tenant isolation tested — cross-tenant access rejected
- [ ] Authorization enforced server-side, not just in UI
- [ ] Duplicate/concurrent requests do not create duplicate data
- [ ] Rate-limit behavior verified for auth and resource-intensive endpoints
- [ ] Backup and recovery path documented
- [ ] Capacity assumptions approved or marked `Proposed, not approved`
- [ ] Permission matrix updated
- [ ] Sensitive actions covered by audit log
- [ ] No secrets or PII in logs
- [ ] All multi-user artifact docs are current
