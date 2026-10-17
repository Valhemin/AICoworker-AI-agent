---
name: error-handling-patterns
description: "adding error states to a feature, catching exceptions, surfacing failures to users, or handling async operations that can fail"
---

TRIGGER: adding error states to a feature, catching exceptions, surfacing failures to users, or handling async operations that can fail
OUTPUT: detailed — failure modes covered, recovery strategy per layer, what is not covered and why
SKIP: happy-path-only implementations where error paths are explicitly deferred by design

---

# Error Handling Patterns

Use when: adding error states to a feature, catching exceptions, surfacing failures to users, or handling async operations that can fail.

## Hierarchy — Handle at the Right Layer

1. **Input validation** — reject bad input at the boundary (API handler, form submit, CLI arg parse). Never let invalid data flow deeper.
2. **Operation errors** — catch at the call site when recovery is possible (retry, fallback, default). Re-throw when recovery is not possible.
3. **Domain errors** — use typed error results (`Result<T, E>` / discriminated unions) for expected failure modes (not found, permission denied, conflict). Do not use exceptions for expected failures.
4. **Unexpected errors** — let propagate to a top-level handler (middleware, error boundary, global handler). Log with context. Show safe user message.
5. **External service errors** — always wrap with a timeout, map to internal error types, never leak vendor error messages to users.

## Rules

- Never swallow errors silently (`catch {}`, `catch (e) { return null }`).
- Never expose stack traces or internal error messages to end users.
- Always log errors with enough context to reproduce: operation, inputs (redacted), error type, and message.
- User-facing errors must be: actionable (say what to do), honest (do not lie about what happened), non-technical (no stack traces, no internal IDs unless needed for support).
- Async: always handle the rejection path. No floating promises.

## Checklist per Error Site

- [ ] What are the expected failure modes? (enumerated, not "anything can go wrong")
- [ ] Is recovery possible? If yes, implement it. If no, propagate.
- [ ] Is the error logged with context?
- [ ] Is the user message safe and actionable?
- [ ] Is the error type correct for this layer (exception / typed result / HTTP status)?

## Output Contract

When adding error handling, document:
- Failure modes covered.
- Recovery strategy (retry / fallback / propagate / user message).
- What is NOT covered and why (acceptable gaps vs follow-up items).
