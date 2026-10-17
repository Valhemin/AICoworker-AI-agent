---
name: finishing-development-branch
description: "Close a large feature branch with readiness evidence and next actions."
---

TRIGGER: all planned tasks on a large feature branch are complete or user asks for final readiness assessment
OUTPUT: compact — tasks status, tests/build/lint/manual QA summary, docs updated, known risks, next action (merge/PR/iterate/defer)
SKIP: mid-feature work; only use when implementation is genuinely complete

---

Checklist:
- tasks complete and marked only when actually done
- tests/build/lint/typecheck/manual QA status summarized
- docs/specs updated to match implementation
- known risks and skipped checks listed
- release/rollback notes prepared when relevant
- next action proposed: merge, PR, keep iterating, or defer
