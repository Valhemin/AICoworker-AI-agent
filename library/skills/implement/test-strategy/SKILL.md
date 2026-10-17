---
name: test-strategy
description: "adding or changing behavior requiring test coverage decisions"
---

TRIGGER: adding or changing behavior requiring test coverage decisions
OUTPUT: compact — test type chosen with rationale, what is covered, any skipped tests with explicit reason and alternative verification
SKIP: automatically triggering E2E/browser tests; those require explicit user request

---

# Test Strategy

Use when adding/changing behavior.

## Test Type Selection

Choose the smallest useful coverage:
- Unit tests for pure logic.
- Integration tests for boundaries.
- Component tests for UI behavior.
- E2E tests for critical user flows — **only when user explicitly requests**.
- Regression tests for bugs.

## Default Behavior After Implementation

**After any backend/API work:** run `api-testing` skill. This is default, no user request needed.

## Rules

- Do not delete or weaken tests just to pass.
- Do not count typecheck or lint as a substitute for behavioral tests when tests are practical to write.

## Mandatory Output

State which test type was chosen and why.

If tests were skipped: say so explicitly with reason (e.g., "no test infra exists — verified via typecheck + manual run").

Silence on tests is not acceptable. "Tests not added" is valid only when accompanied by the reason and the alternative verification path used.
