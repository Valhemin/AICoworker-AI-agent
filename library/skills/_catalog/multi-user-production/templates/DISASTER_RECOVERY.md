# Disaster Recovery Plan

> Status: Proposed, not approved — confirm RPO, RTO, and backup policy before launch.

## Objectives

| Metric | Target | Status |
|---|---|---|
| RPO (max acceptable data loss) | _[e.g. 1 hour]_ | Proposed, not approved |
| RTO (max acceptable downtime) | _[e.g. 4 hours]_ | Proposed, not approved |

## Backup Policy

| Item | Value |
|---|---|
| Backup frequency | _[matches RPO]_ |
| Backup location | _[different region/provider from primary]_ |
| Encryption | _[same standard as prod data]_ |
| Retention period | _[N days — compliance + cost tradeoff]_ |
| Last restore drill | _[date or "not yet run"]_ |
| Next scheduled drill | _[date]_ |

## Restore Procedure

1. Identify which backup to restore from: _[how to find the right snapshot]_
2. Execute restore: _[commands or runbook link]_
3. Verify data integrity: _[checks to run post-restore]_
4. Re-route traffic: _[DNS change, load balancer update, etc.]_
5. Notify affected users: _[template or process]_

Actual RTO from last drill: _[N hours N minutes — or "not measured yet"]_

## Failure Scenarios

| Scenario | Response | Owner |
|---|---|---|
| DB primary outage | Failover to replica | _[team]_ |
| Region outage | _[failover plan or accept downtime per RTO]_ | _[team]_ |
| Provider outage | Status page update; ETA; comms | _[team]_ |
| Credential compromise | Rotate all secrets; audit access logs; user notification if data accessed | _[team]_ |
| Corrupted migration | Restore from backup; migration rollback plan | _[team]_ |
| Background job failure | Dead-letter queue; safe retry; alert | _[team]_ |

## Kill Switches & Feature Flags

| Feature | Toggle mechanism | Fallback behavior | Owner |
|---|---|---|---|
| _[feature name]_ | _[env var / flag service]_ | _[what users see when off]_ | _[team]_ |

## Incident Severity & Escalation

| Severity | Definition | Response time | Who gets paged |
|---|---|---|---|
| P0 | Complete outage or data loss | 15 min | _[on-call]_ |
| P1 | Major feature broken | 1 hour | _[team lead]_ |
| P2 | Degraded performance | 4 hours | _[async]_ |
| P3 | Minor issue | Next business day | _[backlog]_ |

## Status Page

URL: _[internal and/or public URL]_
Update owner on incident: _[who updates it]_

## Post-Incident Review

Template: [link or inline]
Cadence: run within 48h of any P0/P1 incident.
