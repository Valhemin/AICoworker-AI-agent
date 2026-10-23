---
name: requesting-code-review
description: Produce an independent review of a completed slice. Reviewer receives only spec + diff — not the implementer's reasoning or chat. Use after verify-change, before handing off to QA.
---

TRIGGER: after completing and self-verifying an implementation slice — before moving to test/QA
OUTPUT: review report at `docs/review/review-<slug>-<YYYYMMDD>.md` — PASS or FAIL with line-level findings
SKIP: trivial single-line formatting or comment-only changes with no logic, state, or branching impact

---

# Independent Code Review

## Why independence matters

Self-review (`incremental-self-review`) checks the implementer's own work. This skill is different: a **second session with no access to the implementer's chat or internal reasoning** evaluates only observable artifacts. This eliminates confirmation bias — the reviewer cannot "know" why a decision was made and must evaluate on evidence alone.

## What the reviewer receives (and only this)

- The spec or acceptance criteria for the slice.
- The diff (changed files and lines).
- Test output for the slice.

The reviewer does **not** receive: the implementer's chat history, inline reasoning, or any explanation of intent. If intent is not visible in code + spec, that is itself a finding.

## Review dimensions

For each dimension, emit PASS / RISK / FAIL + the specific finding (file:line if applicable):

1. **Spec compliance** — Does the diff satisfy the stated acceptance criteria? Check order: one result line per AC.
2. **Scope creep** — Is there any behavior not requested by the spec? Extra code = FAIL.
3. **Edge cases & error handling** — Are error paths covered for the slice's behavior?
4. **Security** — Applies when the slice touches auth, input, session, tokens, file paths, URLs, IPC, WebView, or payment. Check: HTTPS enforced, no token in logs/localStorage/query, no open redirect, no SSRF surface, input validated at trust boundary.
5. **Test coverage** — Is there at least one test for the behavior just changed? Missing = FAIL.
6. **Maintainability** — Is the code readable without the chat context? Unexplained magic numbers, undocumented side effects, or unclear naming = RISK.

## Output format

```
## Independent Review — <slice name> — <YYYY-MM-DD>

Reviewed: spec at <path>, diff of <files>
Reviewer context: spec + diff only (no implementer chat)

| Dimension        | Result | Finding (file:line if applicable) |
|---|---|---|
| Spec compliance  | PASS / FAIL | ... |
| Scope creep      | PASS / FAIL | ... |
| Edge cases       | PASS / RISK | ... |
| Security         | PASS / FAIL / N/A | ... |
| Test coverage    | PASS / FAIL | ... |
| Maintainability  | PASS / RISK | ... |

**Verdict: PASS / FAIL**
Blocking findings: <list or "none">
```

## After review

- **PASS** → hand off to test/QA.
- **FAIL** → return the report to the implementer. Implementer fixes exactly the listed findings. No silent rewrites. Re-review after fix.
- **Two consecutive FAIL** on the same slice → escalate: write `docs/review/BLOCKED-<slug>.md` five lines and stop. Do not loop a third time.

Do not modify the diff being reviewed. Do not silently fix findings and then approve.
