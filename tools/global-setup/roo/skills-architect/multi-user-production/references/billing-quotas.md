# Billing & Quotas

*Apply only when the project has monetization. Skip entirely for free tools.*

## Subscription Lifecycle

States: `trialing → active → past_due → canceled → paused`

Every transition must be handled:
- Trial end: notify before expiry; downgrade or lock on expiry
- Payment failure: grace period (e.g. 7 days); retry schedule; final cancellation
- Upgrade: prorate or charge immediately — define and document the behavior
- Downgrade: enforce feature limits immediately or at period end — document
- Cancellation: access until period end; data retention policy applies
- Refund: manual or automatic; define window

## Webhook Idempotency

Payment provider webhooks (Stripe, Paddle, etc.) can deliver the same event multiple times.

- Store event IDs and skip duplicates
- Process webhooks asynchronously — never block on payment provider latency in a sync request
- Return `200` quickly; process in background; use dead-letter queue for failures
- Never assume a webhook fires exactly once or in order

## Usage Metering & Quota Enforcement

- Define quota units clearly (API calls, storage GB, seats, compute minutes)
- Enforce quotas at the service layer — never only in the UI
- Soft limit: warn user before hitting hard limit
- Hard limit: reject operation with clear error explaining what limit was hit and how to upgrade
- Quota resets: define period (monthly, rolling 30d) and timezone

## Billing Reconciliation

- Log usage events as they happen — do not reconstruct from other logs
- Usage log schema: `{ user_id, tenant_id, event_type, quantity, timestamp }`
- Reconciliation run: sum usage logs → compare to invoice → alert on discrepancy
- Refund window: keep usage records long enough to support the refund policy

## Security

- Never store raw card numbers — use tokenization via payment provider
- Billing portal actions (cancel, downgrade) must be authenticated and rate-limited
- Billing webhooks must verify provider signature before processing
