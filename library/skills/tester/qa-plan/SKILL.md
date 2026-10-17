---
name: qa-plan
description: Build requirements and a test case table from the brief. Inspect the real UI. Do not write test code yet.
---

# QA plan

Brief describes fields, validation, buttons, and what happens after clicking. Do not write test code yet.

**Ask everything in one message when receiving the brief** (do not ask one by one): Which sprint? Plus every unclear item from the brief — character limits, error copy, what happens on success, data that must exist beforehand, time rules, file upload, dependent features, risk if broken. If already answered this session, do not ask again.

1. One screen or several linked screens. Web pages: write each URL. Desktop windows: write how to open the app — no URL. Unknown: write `UNCLEAR`.
2. Write `requirements/<system>/<feature>.md`. Unanswered items: write `UNCLEAR`. Do not fill in guessed values.
3. Read `knowledge/<system>/<feature>.md` if it exists — reuse information already surveyed, do not re-survey from scratch. Open the real UI. Write fields, buttons, and error text exactly as seen. Write locators in the requirement (priority: role > label > test id). Brief deviates from UI: write it in Needs clarification — do not conclude which side is right. Write what was just observed immediately in `knowledge/<system>/<feature>.md` with the date.
4. Write `testcases/<system>/<feature>.md`. ID format `TC-<FEATURE>-001`. Issued IDs do not change and are not reused. Required columns: `TC-ID`, `Result`, `Notes`. Multiple screens: one section per screen. `Result` column starts as `Not run`.
5. Cover seven groups: main flow, missing required fields, wrong format, boundary, special states, network error when UI shows it, access permissions. Groups that do not apply: write the reason. Cases outside the brief: tag `[suggested addition]`. Broken means the user cannot use the product immediately → high risk → tag `@smoke`. Otherwise: `@regression`.
6. Self-check before done: every row in the `Steps` column must be non-empty, including `❌` cases. Fix before reporting.
7. Make changes exactly where requested. Do not edit other cases. Table not approved: do not write tests yet. Web pages: go to `qa-write`. Desktop windows: go to `qa-desktop`. Desktop does not call `qa-figma`.

End with total case count, number automated, number manual, number from brief, number suggested. End with one next step.
