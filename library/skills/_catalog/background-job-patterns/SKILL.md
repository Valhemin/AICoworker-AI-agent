---
name: background-job-patterns
description: "Background job / worker patterns — queue setup, retry, dead letter, idempotency, observability. Use when offloading work from the request cycle."
---

TRIGGER: offloading work from the HTTP request cycle — sending email, processing uploads, running reports, or calling slow external APIs; OR implementing any scheduled/recurring task — database backup, cache warm-up, report generation, data cleanup, cron jobs
OUTPUT: detailed — idempotency mechanism, retry config, DLQ, timeout, payload schema documented per job; for scheduled tasks: schedule expression, retention/cleanup policy, failure alerting, and restore verification
SKIP: synchronous work that must complete and be confirmed within an HTTP response

---


## When to Use

Use when: sending email, processing uploads, running reports, calling slow external APIs, syncing data, or any work that should not block an HTTP response.

## Rule Zero

**Never do background work inline in a request handler.** If a job fails, the user gets a 500. If a job is slow, the request times out. Enqueue and return immediately.

## Job Design Rules

### Idempotency (non-negotiable)

Every job must be safe to run more than once with the same input. Design for at-least-once delivery.

Techniques:
- Database unique constraint on a deduplication key before doing work.
- Check-then-act with a status column (`status IN ('pending', 'processing', 'done', 'failed')`).
- External API calls: check if the operation already happened before calling again (look up by idempotency key).

### Payload Design

- Keep payloads small — store IDs, not full objects. The job fetches fresh data at run time.
- Version your job payloads. Add a `version: 1` field so you can handle old-format jobs after a deploy.
- Never put PII or secrets directly in the job payload if the queue backend stores in plaintext.

### Retry Strategy

- Retry on transient errors: network timeouts, 5xx from external APIs, DB deadlocks.
- Do not retry on: validation errors, 4xx from external APIs, business logic failures (wrong state).
- Use exponential backoff with jitter. Do not hammer the failing dependency.
- Set a `maxAttempts` limit. Default: 3–5 attempts.
- After max attempts: move to dead letter queue (DLQ). Do not silently discard.

### Timeouts

- Every job must have an execution timeout. Long-running jobs that hang tie up workers.
- Set timeout shorter than the queue's visibility timeout (SQS) or job lock TTL (BullMQ).

### Dead Letter Queue

- DLQ is mandatory for production jobs. No DLQ = silent data loss.
- Alert on DLQ depth > 0. A message in the DLQ means a job failed all retries and needs human attention.
- Log the full job payload and error chain when sending to DLQ.

## Worker Implementation

```
1. Fetch job from queue.
2. Acquire idempotency lock / check dedup key.
3. Fetch fresh data by ID (do not trust stale payload data).
4. Execute job logic within a DB transaction when atomicity is needed.
5. Mark job complete / release lock.
6. Ack the job message.
7. On failure: log with context, let the queue retry (do not ack).
```

Never ack before the work is committed. Acking early = silent data loss on crash.

## Observability

- Log on job start: job type, job ID, attempt number.
- Log on job end: success/failure, duration, records affected.
- Emit a metric or structured log field for job duration and result.
- Never log secrets, tokens, or PII from job payloads.
- Instrument queue depth and worker lag — alert when lag grows beyond threshold.

## Checklist per Job Type

- [ ] Idempotency: safe to run twice with same input?
- [ ] Retry config: which errors retry, which do not?
- [ ] DLQ configured and monitored?
- [ ] Execution timeout set?
- [ ] Payload versioned?
- [ ] Observability: start/end/failure logged with job ID?
- [ ] PII/secrets not in plaintext payload?

## Output Contract

Document per job:
- Job name and trigger (API call, cron, event).
- Idempotency mechanism.
- Retry config: max attempts, backoff strategy.
- DLQ: configured yes/no, alert configured yes/no.
- Timeout value.
- Payload schema.
- Side effects (email sent, external API called, DB written).
