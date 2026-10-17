---
name: acceptance-test-planning
description: "Produce a test plan that maps every acceptance criterion to a test strategy — unit, integration, or e2e — with exact coverage for the spec pack's..."
---

TRIGGER: writing 07-test-plan.md in a spec pack, or generating a test plan for any feature with defined acceptance criteria
OUTPUT: detailed — coverage summary table, per-AC test strategy with type, inputs, expected outcome, tool, edge cases
SKIP: writing tests before acceptance criteria are defined or requirements are finalized

---

## Input contract

Requires at least one of:
- `01-product-requirements.md` (for FR and AC IDs)
- `03-technical-architecture.md` (for integration boundaries)
- User story list with Given/When/Then criteria

## Coverage mandate

Every acceptance criterion (`AC-N`) must have at least one test strategy entry. An AC with no test strategy is a CRITICAL gap — do not emit the plan until resolved or explicitly flagged.

## Test strategy selection rules

Use this hierarchy to assign test type per AC:

| Condition | Test type |
|---|---|
| AC is a pure algorithmic or business-logic rule | Unit |
| AC crosses a service boundary (API call, DB write, queue) | Integration |
| AC involves a user interaction flow from entry to outcome | E2E |
| AC is a non-functional metric (latency, throughput) | Performance / load test — name the tool |
| AC is a security constraint (auth, injection, data exposure) | Security test — name the check |

More than one type is allowed per AC. Default: when in doubt, prefer integration over unit (integration catches boundary failures; unit catches logic failures).

## Required output sections

### Test plan format

```
## Test Plan

### Coverage summary
- Total ACs: N
- Unit covered: N
- Integration covered: N
- E2E covered: N
- Performance covered: N
- Security covered: N
- Uncovered (CRITICAL): N

---

### [US1] [User story name]

#### AC-1: [AC text]
- Test type: [Unit | Integration | E2E | Performance | Security]
- Description: [What the test does — one sentence. Not "test the function". Describe the observable behavior being verified.]
- Inputs / setup: [data, state, or actor preconditions]
- Expected outcome: [exact observable: return value, DB state, HTTP response, UI text]
- Tool / framework: [Jest, Pytest, Cypress, k6, OWASP ZAP, etc. — or "TBD" with rationale]
- Edge cases: [at least one failure or boundary scenario, or "none — happy path only" if truly none]

#### AC-2: ...
```

### Done-definition for the plan

Test plan is READY when:
- Every AC has at least one test strategy entry.
- No AC is marked "TBD" without an explicit reason and owner.
- Every integration test names the boundary being crossed.
- Every E2E test names the user role performing the action.
- At least one negative/failure test exists per integration boundary.
- Tool/framework is named for every entry (even if "not yet decided" is noted with a follow-up action).

## Special cases

### NFRs as test entries

Non-functional requirements (latency, uptime, throughput) MUST appear as test entries. Example:

```
#### NFR: API p95 < 300 ms at 500 req/s
- Test type: Performance
- Tool: k6
- Setup: 500 concurrent virtual users, 60-second ramp
- Pass criterion: p95 latency < 300 ms, error rate < 0.1%
```

### Security-sensitive ACs

If the feature handles auth, PII, or financial data, include at least:
- One auth bypass test (unauthenticated request to protected resource)
- One input validation test (SQL injection or XSS attempt on any user-supplied field)

### Missing ACs

If a functional requirement exists but has no AC, flag it:
```
[CRIT] FR-N has no acceptance criterion — cannot generate test strategy. Add AC before test plan is READY.
```
