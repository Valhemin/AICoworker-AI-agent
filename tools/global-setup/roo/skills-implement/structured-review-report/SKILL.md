---
name: structured-review-report
description: Generate a severity-scored code review report from a git diff. Reviewer operates on diff + spec only — not on the implementer's chat. Produces a merge-readiness verdict.
---

TRIGGER: explicitly asked for a code review report, merge readiness assessment, or severity-scored diff analysis
OUTPUT: report — score from 100 with explicit deductions, CRITICAL/HIGH/MEDIUM/LOW verified findings, merge-readiness verdict
SKIP: routine post-implementation self-review (use `incremental-self-review` instead); per-slice gate (use `requesting-code-review` instead)

---

## When to Use

Use for a **full diff review** before merge or release — covers multiple slices already individually reviewed, or a PR-level gate.

## Independence rule

This report is produced by a session that received:
- The git diff (or PR diff).
- The spec, PRD, or acceptance criteria the diff addresses.
- Test output.

It did **not** receive the implementer's chat, reasoning, or prior review verdicts. Evidence must be observable in the diff alone.

## How to produce the report

1. Determine base and compare refs safely (`git diff base..head` or equivalent). Do not guess.
2. For each changed file, read the surrounding context (±20 lines) before marking a finding verified.
3. Assign severity:
   - **CRITICAL** — security flaw, data loss risk, auth bypass, crash on normal input. Blocks merge unconditionally.
   - **HIGH** — spec requirement unmet, broken error path, missing test for changed behavior. Blocks merge unless explicitly deferred with reason.
   - **MEDIUM** — maintainability problem, missing edge case (non-security), style drift significant enough to confuse the next reader. Suggest fix; does not block merge unless project policy says so.
   - **LOW** — minor naming, optional improvement, nit. Does not block.

4. Score starts at 100. Deduct: CRITICAL −20, HIGH −10, MEDIUM −3, LOW −1. Floor at 0.
5. Do not invent issues. Do not approve beyond what the diff shows.

## Output format

```
## Code Review Report
Diff: <base>..<head> | <file list>
Spec / ACs: <path or "not provided">
Date: YYYY-MM-DD

### Score: XX / 100
Deductions: <list CRITICAL/HIGH/MEDIUM/LOW counts and reasons>

### Findings

| # | Severity | File:Line | Finding | Verified |
|---|---|---|---|---|
| 1 | CRITICAL | auth/middleware.ts:42 | Token accepted from query param — expose in logs | Yes |
| 2 | HIGH | api/users.ts:88 | AC-003 (pagination) not implemented | Yes |
...

### Merge Readiness
APPROVED / APPROVED WITH CONDITIONS / BLOCKED

Blocking items (if BLOCKED): <list finding #s>
Conditional items (if WITH CONDITIONS): <list finding #s + deferral path>
```

## After the report

- BLOCKED → implementer addresses CRITICAL and HIGH findings. Re-review on those files only.
- APPROVED WITH CONDITIONS → findings recorded in `docs/review/deferred-<date>.md` before merge.
- APPROVED → hand to QA or release gate.
