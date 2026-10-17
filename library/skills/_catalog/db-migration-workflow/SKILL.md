---
name: db-migration-workflow
description: "changing database schema — adding/removing columns or tables, changing types, adding indexes or constraints, backfilling data"
---

TRIGGER: changing database schema — adding/removing columns or tables, changing types, adding indexes or constraints, backfilling data
OUTPUT: detailed — migration structure with up/down, deployment order, rollback plan, verification steps
SKIP: application-level data transformations not requiring schema changes

---

# DB Migration Workflow

Use when: changing a database schema — adding/removing columns or tables, changing types, adding indexes or constraints, backfilling data.

## Pre-Migration Checklist

Before writing a migration:
- [ ] Is this migration reversible? If not, say so explicitly and get confirmation before proceeding.
- [ ] Does the migration need to run on live data? Check row count and estimate duration.
- [ ] Is there a rollback plan? Define it before applying.
- [ ] Does application code need to deploy before, after, or at the same time as the migration?

## Safety Rules

- **Never drop columns or tables in the same migration that removes the code using them.** First deploy code that stops using the column, then migrate.
- **Nullable first.** Adding a NOT NULL column to an existing table requires a default or a backfill. Prefer: add nullable → backfill → add constraint. Not all at once.
- **Index creation on large tables** — use `CREATE INDEX CONCURRENTLY` (Postgres) or equivalent to avoid table locks. Note this in the migration.
- **Backfill in batches** — never `UPDATE` millions of rows in one transaction. Batch by ID range or use a background job.
- **Test against a copy of production data** when the migration touches tables with >100k rows or complex data.

## Migration Structure

```
-- Migration: [short description]
-- Direction: up / down
-- Reversible: yes / no (if no, state why)
-- Estimated impact: [rows affected, lock duration if known]

-- UP
[schema change]

-- DOWN
[rollback — required unless irreversible, with explicit note]
```

## Deployment Order

State explicitly which of these applies:
- **Migrate before deploy** — new columns with defaults, new tables, new indexes.
- **Deploy before migrate** — removing columns/tables (code stops using them first).
- **Deploy and migrate together** — only safe for new projects or feature flags that gate the new code.

## Post-Migration Verification

After applying a migration that adds or changes backend behavior:
- Confirm DB constraints hold: insert boundary values, attempt constraint violations.

## Output Contract

Document per migration:
- What changed (schema delta).
- Reversible: yes/no.
- Deployment order: migrate-first / deploy-first / simultaneous.
- Rollback plan.
- Any data loss risk: yes/no + what.
- Estimated rows affected and any lock risk.
