---
name: executing-plans-batched
description: Execute plans in small batches with checkpoints and truthful progress.
---

TRIGGER: implementing from a written implementation plan (prose or structured doc) with defined slices and checkpoints — input is a plan doc, not a tasks.md file
OUTPUT: compact — completed scope with verification status, blocked task with error verbatim, next action
SKIP: exploratory work without a defined plan or task list

---


Batch execution:
1. Select a coherent slice.
2. Implement only that slice.
3. Self-review for spec compliance and code quality.
4. Run focused checks.
5. Fix failures before moving on.
6. Update task status only after real completion.

If blocked, report ALL of:
- Completed: scopes done, files changed, verification status
- Blocked at: exact task name and the error or missing input verbatim
- Attempted: what was tried
- Next action: one concrete next step

Never return with only "I am blocked." Always deliver the completed portion first.
