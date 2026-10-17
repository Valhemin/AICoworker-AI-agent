---
name: release-readiness
description: "before shipping to production — includes deploy steps, migration sequence, rollback plan, known risks"
---

TRIGGER: before shipping to production — includes deploy steps, migration sequence, rollback plan, known risks
OUTPUT: compact — acceptance criteria status, verification commands and results, migration/deploy steps, rollback notes, known risks
SKIP: in-progress features; correctness-only check not going to prod (use quality-gate instead)

---

# Release Readiness

Use before calling work done.

Report:
- Acceptance criteria status.
- Verification commands and results.
- Migration/deploy steps.
- Feature flags or rollout plan if needed.
- Known risks and manual QA.
- Rollback notes.
