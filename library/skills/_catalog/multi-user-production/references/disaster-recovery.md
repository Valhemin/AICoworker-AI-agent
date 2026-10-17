# Disaster Recovery

## Required Definitions (get user approval)

- **RPO** (Recovery Point Objective): maximum acceptable data loss. "Last 1 hour" means backups must run at least hourly.
- **RTO** (Recovery Time Objective): maximum acceptable downtime. "4 hours" means recovery procedure must complete within 4 hours.

Without approved RPO/RTO values, backup frequency and DR architecture cannot be designed correctly. Mark as `Status: Proposed, not approved` until confirmed.

## Backup Policy

- Backup frequency must satisfy RPO
- Backups must be stored in a different region or provider from primary data
- Backup encryption: same standard as production data
- Retention: define how long backups are kept (cost vs compliance tradeoff — product decision)
- Test restore: run a restore drill at least once before launch; schedule recurring drills

## Restore Drill

Document the restore procedure in `DISASTER_RECOVERY.md`:
1. How to identify which backup to restore from
2. How to execute the restore
3. How to verify data integrity after restore
4. How to re-route traffic after restore

Time the drill. Record the actual RTO achieved — compare against target.

## Failure Scenarios to Plan For

| Scenario | Response |
|---|---|
| Database outage | Read replica failover; connection retry logic |
| Region outage | Failover to secondary region (if multi-region); or accept downtime per RTO |
| Provider outage | Communication plan; status page update; ETA estimate |
| Credential compromise | Rotate all secrets immediately; audit access logs; notify affected users if data accessed |
| Corrupted migration | Rollback plan; restore from backup if needed; migration rehearsal prevents this |
| Background job failure | Dead-letter queue; safe retry; alerting |

## Kill Switch & Feature Flags

Any feature that can fail in a way that affects all users must have a way to disable it without a code deploy. Document:
- How to toggle the feature off
- Who has permission to do so
- What the fallback behavior is when toggled off
- How to monitor the toggle state

## Incident Communication

- Define severity levels (P0–P3 or equivalent)
- Status page URL (internal and/or public)
- Who gets paged on P0
- Template for incident communication to affected users
- Post-incident review process
