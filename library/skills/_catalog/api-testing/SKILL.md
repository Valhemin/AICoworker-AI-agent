---
name: api-testing
description: "Test HTTP endpoints after implementation — happy path + edge cases. DEFAULT after any API/backend implementation."
---

TRIGGER: any HTTP endpoint, route handler, API controller, or backend service function is added or modified
OUTPUT: report — test cases listed with PASS/FAIL per case, bugs discovered, coverage note
SKIP: pure frontend work with no API touched, or explicit 'skip tests' instruction from user

---


## When to Use / When NOT to Use

**DEFAULT after any API or backend implementation.** No explicit user request needed.

**Use when:** Any HTTP endpoint, route handler, API controller, or backend service function is added or modified.
**Skip only when:**
- Pure frontend task with no API touched.
- User explicitly says "skip tests" or "no tests".

## Test Structure: Arrange → Act → Assert

For each case:
1. **Arrange** — set up request data, auth tokens, DB state.
2. **Act** — call the endpoint (real HTTP call or integration-level invocation).
3. **Assert** — check: HTTP status code + response body schema + error format.

Prefer integration tests over mocks at the API boundary. Mocking the HTTP layer is acceptable for unit tests of business logic; the API boundary itself must be tested with real or near-real calls.

## Edge Cases — Always Cover

For every endpoint, test at minimum:

| Case | What to verify |
|---|---|
| Happy path | Correct status (200/201), response schema, expected body |
| Invalid input | 400 + error message identifies the bad field |
| Missing required fields | 400 + error message names the missing field |
| Auth failure | 401 when token absent, 403 when token present but lacks permission |
| Unexpected content-type | 400 or 415 — not a 500 |
| Boundary values | Min/max lengths, 0, negative numbers, max int, empty string |
| Empty / null payloads | Does not 500 — returns meaningful error |
| Rate limit (if applicable) | 429 returned, Retry-After header present |

Add endpoint-specific cases beyond the above when the implementation has conditional branches.

## Output Contract

After running tests, report:

```
## API Test Results — [endpoint(s) tested] — [date]

### Cases Tested
- [ PASS | FAIL ] [case name]: [status expected] → [status got], [assertion result]
...

### Bugs Discovered
[list any unexpected behavior found, or NONE]

### Coverage Note
[any edge cases intentionally skipped + reason]
```

Never report "tests passed" without listing individual cases and their results.

## Rules

- Do not skip the auth failure case — it is not optional.
- Do not accept a test that only checks the status code — always assert body shape.
- If test infrastructure does not exist, report the gap explicitly and use the strongest available alternative (curl commands with expected vs actual, manual run log).
- A missing test is a valid output only when accompanied by the reason and an alternative verification path.
