---
name: database-backup-dr
description: Configure automated daily database dumps, off-site encrypted cloud backup (S3/R2), and verify disaster recovery restore procedures.
---

TRIGGER: production database provisioned, before launching to paying users, or quarterly DR drill
OUTPUT: detailed — backup-dr-plan.md with automated dump cron/script, retention policy, and tested restore commands
SKIP: static frontend-only sites without a persistent database

---

# Database Backup & Disaster Recovery (DR)

Ensure persistent customer data is resilient against hardware failure, corruption, or accidental deletion. Adapted from `agency-agents/engineering` Database Reliability methodology.

## Input

Read before starting:
- Database engine (PostgreSQL, MySQL, SQLite, MongoDB)
- Destination off-site backup storage (AWS S3, Cloudflare R2, Backblaze B2)

---

## Step 1 — Automated Dump & Encryption Schedule

1. **Daily Incremental / Nightly Full Backup**:
   - PostgreSQL: `pg_dump -Fc` or WAL archiving.
   - SQLite: `.backup` or Litestream streaming replica.
   - MySQL: `mysqldump --single-transaction`.
2. **Encryption at Rest**: Encrypt backup archives with GPG or S3 server-side encryption (SSE-S3/KMS) before upload.
3. **Retention Policy**: Keep 7 daily backups, 4 weekly backups, 12 monthly backups (grandfather-father-son policy).

---

## Step 2 — Off-Site Cloud Sync

1. Upload encrypted archives to off-site cloud storage bucket (must be separate from primary VPS provider).
2. Configure lifecycle rule to automatically delete archives older than retention window.

---

## Step 3 — Restore Drill (The True Test)

A backup is only as good as its restore:
1. Write executable shell script `scripts/restore-drill.sh` to spin up a blank test container and restore the latest backup.
2. Verify table row counts and schema integrity.
3. Document Recovery Time Objective (RTO < 30 mins) and Recovery Point Objective (RPO < 24 hours).

---

## Write

Write `../shared/01_Projects/<domain>/<project-name>/backup-dr-plan.md`.

Format:
- `## Vietnamese` backup schedule and verified restore procedure
- `## English` backup schedule and verified restore procedure

End with one next step.
