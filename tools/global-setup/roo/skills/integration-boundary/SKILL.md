TRIGGER: connecting services, third-party APIs, SDKs, queues, webhooks, or external systems
OUTPUT: compact — ownership boundary, contract/schema, retry/timeout/idempotency, auth/secrets, failure modes, observability, test strategy defined
SKIP: purely internal module boundaries within a single service with no external dependency

---

# Integration Boundary

Use when connecting services, third-party APIs, SDKs, queues, webhooks, or external systems.

Define:
- Ownership boundary.
- Contract and schema.
- Retry/timeouts/idempotency.
- Auth/secrets.
- Failure modes.
- Observability.
- Local test/mocking strategy.
