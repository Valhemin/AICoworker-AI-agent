---
name: qa-write
description: Write Page Objects and Playwright specs from existing cases. Must run green at least once.
---

# QA write

For web pages only. Desktop windows: use `qa-desktop`. Do not fix product code.

1. Read `knowledge/<system>/<feature>.md` if it exists — reuse URLs, locators, and quirks already noted. Read requirements and cases. Missing expected results, unclear whether login is needed, or unclear data requirements: ask.
2. Multiple screens: write the main-flow spec first, then edge cases per screen.
3. Page Objects in `pages/<feature>/`. Methods named after business jobs. No `expect` in Page Objects. Locators: priority role > label > test id. Do not fabricate locators. If survey notes exist, reuse and verify when running.
4. Specs in `tests/<feature>/`. Test name is the behavior and result. Tag `@smoke` if broken means the product cannot be used immediately; otherwise `@regression`. **Add TC-ID annotation** from `testcases/<system>/<feature>.md` — do not assign new IDs: `{ annotation: [{ type: 'case', description: 'TC-LOGIN-001' }] }`. Each test covers one behavior with no dependency on other tests. Use expectations with waiting. No `waitForTimeout`. No `test.only`. `test.skip` requires a reason.
5. `npx tsc --noEmit` and `npm run lint` must be clean. Run the spec at least once to green. If not green, say not green. Do not change assertions to match a failing app.
6. Feature completely removed: ask before deleting the test file. UI change only: edit in place — do not rewrite from scratch. After deletion, run `npm run check:docs` if the repo has that command.

Report files changed, test count, run result, and `## Needs clarification`.
