---
name: incremental-self-review
description: "after completing each implementation scope, self-check before moving to the next scope — no external reviewer, agent reviews own work"
---

TRIGGER: after completing each implementation scope, self-check before moving to the next scope — no external reviewer, agent reviews own work
OUTPUT: compact — one-line verdict per dimension (spec match, hidden changes, edge cases, errors, tests, simplicity, cleanup)
SKIP: trivial single-line changes with no logic, state, or branching

---

# Incremental Self Review

Use after each implementation scope.

Review:
- Does this match the spec?
- Did it introduce hidden behavior changes?
- Are edge cases handled?
- Are errors/user states acceptable?
- Are tests meaningful?
- Is the code simpler than the alternatives?
- Is any cleanup needed before moving on?

## Required Output

After every self-review, emit a one-line verdict per dimension above: PASS, RISK, or FAIL with the specific concern. Do not omit dimensions. Do not write "looks good" without checking each one. If all pass, write "Self-review: all clear — proceeding." If any fail, fix before proceeding.
