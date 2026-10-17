---
name: using-git-worktrees
description: "Use isolated worktrees only when the repo policy and user consent allow it."
---

TRIGGER: risky parallel development or large branches needing isolation, after confirming project policy allows worktrees
OUTPUT: compact — worktree created with branch naming, setup commands verified, clean baseline confirmed
SKIP: routine single-branch tasks; do not create worktrees automatically

---

Before creating a worktree:
- check current git status
- confirm branch naming convention
- confirm setup commands
- verify clean baseline if possible

Do not create worktrees automatically for routine tasks.
