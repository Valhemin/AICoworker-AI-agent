# Capacity & Reliability

## Capacity Planning Inputs

These are product decisions — mark as `Status: Proposed, not approved` until confirmed:

- Monthly active users (MAU)
- Concurrent users at peak
- Peak requests per second (RPS)
- p95 API latency target (e.g. < 300ms)
- Availability target (e.g. 99.9% = 8.7h downtime/year)
- Max acceptable queue delay
- DB connection pool size
- Storage growth rate

Without these numbers, performance targets in code are guesses. Surface the gap and get approval before optimizing for scale.

## Required Reliability Patterns

| Pattern | When required |
|---|---|
| Timeout on every external call | Always |
| Retry with exponential backoff + jitter | Idempotent operations only |
| Circuit breaker | When downstream failure would cascade |
| Rate limiting | Auth endpoints always; others by product decision |
| Idempotency keys | Any non-idempotent operation users might retry |
| Graceful degradation | Non-critical services (recommendations, analytics) must not block core flow |
| Queue + dead-letter handling | Background jobs and webhooks |

## Load Testing

Before production launch with scale requirements:

- Load test: target normal peak RPS for 10+ minutes
- Stress test: ramp beyond expected peak to find the breaking point
- Spike test: sudden 10× traffic surge
- Soak test: sustained load for hours to catch memory leaks and connection exhaustion

Document results in `CAPACITY_PLAN.md`. If tests were not run, state this explicitly — do not claim scale readiness without evidence.

## Database Connection Management

- Use a connection pool (PgBouncer, RDS Proxy, or equivalent)
- Set pool size = (core count × 2) + effective_spindle_count as a starting baseline
- Monitor active vs idle connections — connection exhaustion is a common production incident
- Set query timeouts — a slow query must not hold a connection indefinitely
