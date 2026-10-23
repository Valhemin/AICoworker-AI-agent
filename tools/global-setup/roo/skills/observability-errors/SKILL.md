TRIGGER: adding production flows requiring user-facing error states, developer logging, metrics, or retry/timeout behavior
OUTPUT: compact — user errors, developer logs, metrics/traces, retry/timeout, alert-worthy failures defined
SKIP: internal-only utilities or development tooling with no production monitoring requirement

---

# Observability and Error Handling

Use when adding production flows.

Include:
- User-facing error states.
- Developer logs with useful context and no secrets.
- Metrics/traces/events where existing infra supports them.
- Retry and timeout behavior.
- Alert-worthy failure modes.
