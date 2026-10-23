---
name: tasks-md-execution
description: Execute tasks.md phase-by-phase with checklist gates, per-scope self-review, and truthful verification.
---

TRIGGER: implementing tasks from a tasks.md file phase-by-phase with checklist gates — input is a tasks.md file with explicit phases
OUTPUT: compact — task marked complete only after real verification, blocked task with exact error verbatim, next action
SKIP: free-form implementation without a tasks.md driving the work

---


When implementing from `tasks.md`:

1. Check checklist status first.
2. Load only relevant docs for the current scope.
3. Execute one task or coherent scope.
4. Self-review immediately.
5. Run focused verification.
6. Fix before moving on.
7. Mark task complete only after it is actually done.
8. Continue until all requested tasks are done, blocked, or user stops you.

Never claim passed verification without running it. If tests don't exist, report the gap and use available build/typecheck/lint/manual checks.
