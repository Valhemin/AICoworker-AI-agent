---
name: qa-bug
description: Write one bug report from a confirmed failure run. Do not conclude that a product function is wrong.
---

# QA bug

Only write when the failure has been confirmed as not an environment error and not an outdated test. If not manually verified yet, ask first — do not write the report.

If `reports/ai/summary.json` exists, read that file and one diagnostics file from that run. For desktop windows without this file, take the FAIL from `docs/test/product-test.md`. One report per symptom. Title is what the user sees. Reproduction steps are enough for someone else to reproduce. Missing data: write not determined.

Suggested severity:
- Blocker: the main flow cannot be used.
- Critical: wrong money, wrong data, or security exposure.
- Major: broken but an alternative path exists.
- Minor: UI deviation while the action still works.

Write the reason. The caller decides the final severity.

Do not state which function in the product code is wrong. Do not combine multiple bugs. A bug on only one screen size: name that size in the title. Group `environment`: do not file a report for the developer.

After being told the fix is done, rerun exactly that case. Pass: say it can be closed. Fail: provide the new result. Write the report in the test report or the file the task requires. End with one next step.
