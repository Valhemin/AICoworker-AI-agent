TRIGGER: restructuring code without changing behavior — renaming, extracting, reorganizing modules or functions
OUTPUT: compact — files changed, before/after test result, any unintended behavior delta flagged
SKIP: adding new functionality or fixing bugs simultaneously; separate refactor from behavior changes

---

# Safe Refactor

Use when restructuring code without changing behavior.

Rules:
- Characterize current behavior first.
- Keep changes narrow.
- Avoid mixing refactor with feature behavior unless necessary.
- Run tests before and after when possible.
- Preserve public APIs unless explicitly planned.

## Delivery Contract

Before: run relevant tests/checks, record baseline pass/fail count.
After: run same checks, confirm no new failures.
Output: files changed, before/after test result, any behavior delta (should be none — if found, flag as bug not a feature).

## Scope Discipline

Do not add unrequested functionality during a refactor. If you notice a bug, file it as a follow-up; do not fix it in-flight unless it is the stated goal.
