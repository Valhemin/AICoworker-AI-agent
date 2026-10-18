---
name: db-migration-workflow
description: Write and apply database migrations safely — two-step non-nullable additions, rollback testing, destructive change review, and zero-downtime patterns.
---

TRIGGER: adding, modifying, or removing any database table, column, index, or constraint
OUTPUT: compact — migration file exists, tested forward + rollback, destructive changes flagged in RISK file, applied in correct environment order
SKIP: no database schema change (e.g., only adding business logic to a service)

---

# DB Migration Workflow

## Core rule

Never change a database schema without a migration file that can be rolled back. Schema changes in production without a recorded migration are the leading cause of unrecoverable outages.

---

## Environment order

Always apply in this order, never skip:

```
local dev → test/staging → production
```

A migration that works locally and breaks in production is a failed migration. Test in staging with production-like data before promoting.

---

## Two-step pattern for non-nullable columns

Adding a non-nullable column to an existing table with data fails if done in one step — the existing rows have no value for the new column.

### Step 1 — Add nullable, backfill

```sql
-- Migration: 001_add_user_timezone.sql
ALTER TABLE users ADD COLUMN timezone VARCHAR(50);

-- Backfill existing rows
UPDATE users SET timezone = 'UTC' WHERE timezone IS NULL;
```

Deploy the application code first (it can handle `timezone` being `null`). Apply Step 1 migration. Verify backfill is complete.

### Step 2 — Add NOT NULL constraint

```sql
-- Migration: 002_make_timezone_not_null.sql
ALTER TABLE users ALTER COLUMN timezone SET NOT NULL;
ALTER TABLE users ALTER COLUMN timezone SET DEFAULT 'UTC';
```

Apply Step 2 after Step 1 is confirmed complete. This order guarantees zero existing rows violate the constraint.

---

## Prisma migrations

```bash
# Create a named migration from schema.prisma diff
npx prisma migrate dev --name add_user_timezone

# Apply pending migrations to staging/production
npx prisma migrate deploy

# Check migration status
npx prisma migrate status

# Rollback the last dev migration (only in development)
npx prisma migrate reset   # ← resets entire DB — dangerous in non-dev environments
```

Prisma does not support automatic rollback in production. Write manual rollback SQL in the migration folder (see below).

---

## Knex migrations

```javascript
// migrations/20241017_add_user_timezone.js
exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.string('timezone', 50).defaultTo('UTC')   // nullable first
  })
  await knex.raw(`UPDATE users SET timezone = 'UTC' WHERE timezone IS NULL`)
}

exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('timezone')
  })
}
```

```bash
npx knex migrate:latest      # apply all pending
npx knex migrate:rollback    # rollback the last batch
npx knex migrate:rollback --all   # rollback everything (dev only)
npx knex migrate:status      # show what is and isn't applied
```

---

## Drizzle migrations

```bash
npx drizzle-kit generate     # generate migration file from schema diff
npx drizzle-kit migrate      # apply pending migrations
```

Drizzle generates SQL files — review them in the PR before applying.

---

## Rollback testing (mandatory for all migrations)

Every migration must be tested in reverse before it reaches staging:

```bash
# 1. Apply migration
npx prisma migrate deploy   # or knex migrate:latest

# 2. Verify the application works with the new schema
npm test

# 3. Rollback
knex migrate:rollback   # or run manual rollback SQL

# 4. Verify the application still works (or gracefully fails) without the schema change
npm test

# 5. Re-apply
knex migrate:latest
```

If a migration is not reversible (e.g., data was dropped), document this explicitly in the RISK file.

---

## Irreversible / destructive changes → RISK file required

Any migration that **cannot be rolled back** or **permanently deletes data** requires a RISK file in the same PR:

```markdown
<!-- RISK: migrations/20241017_drop_legacy_columns.md -->
# RISK: Drop legacy user_v1 columns

## What this migration does
Drops columns: users.legacy_name, users.legacy_email, users.migrated_at

## Why it is irreversible
Dropped columns cannot be restored without a backup restore.

## Data impact
~50,000 rows will lose these column values.

## Prerequisites before running
- [ ] Verified no application code reads these columns (grep confirms)
- [ ] Backup taken: `pg_dump -Fc production > backup_$(date +%Y%m%d).dump`
- [ ] Staged and verified on staging with production data snapshot

## Rollback plan
Restore from backup if the deployment fails within 30 minutes.
Full restore will cause ~15 minutes downtime.

## Approval needed from
Tech Lead before applying to production.
```

Stop and create the RISK file before continuing. Do not apply destructive migrations without documented approval.

---

## Index strategy

```sql
-- Add index in a separate migration from the column addition (non-blocking on large tables)
-- PostgreSQL: CREATE INDEX CONCURRENTLY does not lock the table
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id);
CREATE INDEX CONCURRENTLY idx_orders_status_created ON orders(status, created_at DESC);
```

Add indexes for:
- Foreign keys used in JOINs
- Columns in `WHERE` clauses on tables with >10k rows
- Columns in `ORDER BY` on frequently sorted queries

Check `EXPLAIN ANALYZE` for any query slower than 100ms before adding indexes blindly.

---

## Zero-downtime deployment order

For high-traffic tables, coordinate the migration with the deployment:

```
1. DEPLOY: app code that tolerates both old and new schema
2. MIGRATE: apply the schema change (Step 1: add nullable column)
3. DEPLOY: app code that uses the new column fully
4. MIGRATE: Step 2 — add NOT NULL constraint, drop old column
```

This ensures zero downtime: the running application always works with the current schema.

---

## Checklist before marking scope done

- [ ] Migration file created with clear name (date + description)
- [ ] Non-nullable column additions use two-step pattern (add nullable → backfill → add NOT NULL)
- [ ] Rollback tested locally: apply → verify → rollback → verify
- [ ] RISK file created for any destructive or irreversible migration
- [ ] `INDEX CONCURRENTLY` used for indexes on large tables in Postgres
- [ ] Migration applied in order: local → staging → production (never skip staging)
- [ ] No schema change exists only in production without a corresponding migration file
