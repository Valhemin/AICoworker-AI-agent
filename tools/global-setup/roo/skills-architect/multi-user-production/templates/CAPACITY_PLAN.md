# Capacity Plan

> Status: Proposed, not approved — confirm all targets before optimizing for scale.

## Traffic Targets

| Metric | Target | Status |
|---|---|---|
| Monthly active users (MAU) | _[N]_ | Proposed, not approved |
| Daily active users (DAU) | _[N]_ | Proposed, not approved |
| Concurrent users at peak | _[N]_ | Proposed, not approved |
| Peak requests per second | _[N RPS]_ | Proposed, not approved |
| p95 API latency | _[< N ms]_ | Proposed, not approved |
| Availability target | _[99.N%]_ | Proposed, not approved |

## Availability Math

| Target | Max downtime per year | Max downtime per month |
|---|---|---|
| 99.0% | 87.6h | 7.3h |
| 99.5% | 43.8h | 3.6h |
| 99.9% | 8.76h | 43.8min |
| 99.95% | 4.38h | 21.9min |
| 99.99% | 52.6min | 4.4min |

## Infrastructure Sizing

| Component | Current sizing | Notes |
|---|---|---|
| Web servers | _[N × type]_ | |
| Database primary | _[spec]_ | |
| Database replica(s) | _[N replicas]_ | |
| Cache (Redis/etc.) | _[spec]_ | |
| Queue workers | _[N]_ | |
| Storage | _[GB / growth rate]_ | |

## Rate Limits

| Scope | Limit | Window |
|---|---|---|
| IP (unauthenticated) | _[N requests]_ | per minute |
| User (authenticated) | _[N requests]_ | per minute |
| Tenant aggregate | _[N requests]_ | per minute |
| Auth endpoints | _[N attempts]_ | per 15 minutes |
| Export / heavy ops | _[N requests]_ | per hour |

## Load Test Results

| Test type | Date | Tool | Target | Result |
|---|---|---|---|---|
| Load (normal peak) | _[date]_ | _[tool]_ | _[RPS for 10min]_ | Pass / Fail |
| Stress (above peak) | _[date]_ | _[tool]_ | _[breaking point]_ | _[RPS achieved]_ |
| Spike | _[date]_ | _[tool]_ | _[10× surge]_ | Pass / Fail |
| Soak | _[date]_ | _[tool]_ | _[sustained hours]_ | Pass / Fail |

_If tests have not been run, state this explicitly. Do not claim scale readiness without evidence._

## Open Risks

_List any capacity assumption that has not been validated by a test._
