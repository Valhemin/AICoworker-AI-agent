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

When the product is a website, web app, or desktop app that collects personal data or sells, also read the latest legal-surface note, web-security-assurance note, and consent-and-erasure note in the spec or implement report.

- Not ready while a CRITICAL or HIGH security control in that note is still open.
- Not ready while a required in-product page, consent row, export, or server delete is missing.
- List every OWNER ACTION still open (ministry filing, data-transfer file, e-invoice). Those do not by themselves block the code, and they must be visible in this report. Do not describe the product as certified.
