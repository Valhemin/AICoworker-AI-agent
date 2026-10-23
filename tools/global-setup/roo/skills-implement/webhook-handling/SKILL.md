---
name: webhook-handling
description: Inbound webhook receiver — signature verification, immediate 200, idempotency, async processing. Use when implementing a webhook endpoint for any third-party service.
---

TRIGGER: implementing a webhook receiver endpoint for a third-party service (Stripe, GitHub, Twilio, Shopify, etc.)
OUTPUT: detailed — signature verification, idempotency, immediate 200, background job enqueueing, security rules, test checklist
SKIP: outbound webhook calls or push notifications your service sends (not receiving)

---


## When to Use

Use when: a third-party service (Stripe, GitHub, Twilio, Shopify, etc.) will send HTTP POST events to your server, and you need to receive, verify, and process those events.

## Rule Zero: Return 200 Immediately

**Respond 200 before processing.** Webhook senders retry on non-2xx or timeout. Processing inline risks:
- Timeout → sender retries → duplicate processing.
- Your DB is slow → sender marks your endpoint unhealthy.

Pattern: verify signature → enqueue job → respond 200. All real work happens in the job (use `background-job-patterns` skill).

## Signature Verification (non-negotiable)

Every webhook endpoint must verify the request came from the declared sender. Without this, anyone can POST fake events to your endpoint.

General pattern (varies by provider — check their docs via `research-before-implement`):
1. Read the raw request body as bytes — do not parse JSON before verifying.
2. Compute HMAC-SHA256 (or provider's algorithm) of raw body using the webhook secret.
3. Compare to the signature header (`X-Hub-Signature-256`, `Stripe-Signature`, etc.) using a constant-time comparison.
4. Reject with 401 if signature does not match.
5. Reject with 400 if timestamp in header is outside tolerance window (typically ±5 minutes) — prevents replay attacks.

**Never skip signature verification** because "it's just internal" or "we'll add it later." Add it before the endpoint is reachable.

## Idempotency

Webhook senders guarantee at-least-once delivery. Your handler must be idempotent.

- Extract the event ID from the payload (e.g., `event.id` from Stripe).
- Before processing: check if this event ID was already processed (DB lookup).
- If already processed: return 200 immediately, do no work.
- If new: record the event ID in DB (with `processing` status) → enqueue → return 200.
- After job completes: update event status to `done`.

## Endpoint Implementation

```
POST /webhooks/{provider}

1. Read raw body (do not parse yet).
2. Verify signature. → 401 on failure.
3. Check timestamp tolerance. → 400 on replay.
4. Parse body as JSON.
5. Validate event type is one we handle. Unknown types → 200 (do not 400 — sender may add new event types).
6. Idempotency check on event ID. Already processed → 200.
7. Persist event record (event_id, type, payload, status=pending).
8. Enqueue background job with event_id.
9. Return 200 immediately.
```

## Security Rules

- Webhook secret lives in env vars — never hardcode.
- Never log the raw payload if it may contain PII or payment data.
- Log the event ID and type only.
- The webhook endpoint must NOT require an auth token from the sender — the signature IS the auth.
- Treat the webhook secret as a secret (rotate if leaked, add to `.env.example`).

## Error Handling

- Signature failure → 401. Log event_id (if parseable) and provider.
- Malformed JSON (after signature passes) → 400. Log raw body truncated to 500 chars.
- Idempotency duplicate → 200. Log "duplicate event, skipping".
- Enqueue failure → 500. Do NOT return 200 — let the sender retry.
- Job processing failure → handled by job retry logic, not the webhook endpoint.

## Testing Checklist (run `api-testing` skill after implementation)

| Case | Expected |
|---|---|
| Valid signature + new event | 200, job enqueued |
| Valid signature + duplicate event ID | 200, no duplicate job |
| Invalid signature | 401 |
| Valid signature + expired timestamp | 400 |
| Valid signature + unknown event type | 200, no error |
| Valid signature + malformed JSON | 400 |
| Enqueue failure | 500 |

## Output Contract

Document per webhook integration:
- Provider name and event types handled.
- Signature algorithm and header name.
- Timestamp tolerance window.
- Idempotency key field path in payload.
- DB table/column storing event records.
- Background job type enqueued.
- Env vars added (names only).
- Events intentionally ignored (and why).
