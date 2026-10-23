---
name: product-test
description: Test a coded slice and write PASS or FAIL. Do not fix the product. Do not produce false passes.
---

# Product test

Use when the task is a coded slice that needs a PASS or FAIL conclusion. Writing web tests, running a Playwright suite, comparing to Figma, or drafting a bug report: call the skill for that specific job. Desktop windows: call `qa-desktop`, not the web test path.

1. Get criteria from the spec or from the task. No criteria: test exactly the behavior the task requires. Still unclear: write `UNCLEAR`, do not guess.
2. For forms or input screens, check all seven groups: main flow, missing required fields, wrong format, min/max boundary, special states, network errors when the UI shows them, and access permissions. Groups that do not apply: write the reason.
2b. When the slice collects personal data, sets non-essential cookies, or sells: open each legal page or desktop screen, reject an optional consent, confirm a payment only after the review step, export the account, and delete it. PASS requires the server copy to be gone or anonymized. Uninstalling a desktop app is not a pass. User A must not export or delete user B. Missing screen or a consent row that was never stored is FAIL.
3. Run the repo's test command for the changed slice. Read the actual result. No command available: write not run.
4. Environment error or dead domain is not a product FAIL. Write which environment failed and stop the full suite.
5. Web pages with `docs/design/`: compare to the screen. Deviation is FAIL. Figma link for a web page: use `qa-figma`. Desktop windows do not compare to Figma.
6. Do not change expected values to match a failing app. Do not use `test.fixme`, `toBeTruthy`, or `force: true` to pass.

Write `docs/test/product-test.md`. Each item includes the action taken, the result observed, and PASS or FAIL. `ceo` gate: two sections `## Vietnamese` and `## English`. Other gates: Vietnamese. End of file has a `## Needs clarification` section. If none: write `None`.

Only when every item is PASS is the slice considered to have passed testing. FAIL: do not fix product code. End with one next step.
