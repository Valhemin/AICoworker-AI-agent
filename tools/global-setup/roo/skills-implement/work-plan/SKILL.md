---
name: work-plan
description: Write a short plan for non-trivial code work, then stop after testing for user approval.
---

# Work plan

Skip this skill when the task is a bug or small change — one behavior, a few files, cause already clear.

For everything else:

1. Read `../shared/00_System/OPERATING.md` if the stop gates are unclear.
2. Write the plan to the repo at `docs/plans/YYYY-MM-DD-slug.md`, following `../shared/00_System/Templates/PLAN-TEMPLATE.md`.
3. If the requirement is missing or would damage the output, write one alternative approach in the plan and follow that approach.
4. Code until the happy path runs, the slice's error handling is in place, and the slice's tests pass.
5. Call `verify-change` if editing code.
6. Stop at `WAITING REVIEW`. Do not commit, push, or deploy.

The plan only needs to be detailed enough to execute and for the user to approve. Do not write unnecessary documentation.
