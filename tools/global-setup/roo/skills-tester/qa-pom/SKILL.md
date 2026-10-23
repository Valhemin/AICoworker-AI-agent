---
name: qa-pom
description: Move locators from a raw spec into Page Objects. Keep assertions unchanged. Do not loosen pass conditions.
---

# QA POM

When a spec is calling locators directly in the file, move them to Page Objects.

1. Feature not in the mapping: ask — do not create a new folder.
2. Page already exists: add a method. Does not exist: create in `pages/<feature>/`, following the existing Page Object pattern in the repo.
3. Locators are private fields. Multiple actions on one screen become one method named after the business job. Spots that need assertions become getters. Do not put `expect` inside Page Objects.
4. Specs only call methods and make assertions. Keep assertion intent unchanged. Do not loosen conditions to make it easier to pass. Apply `@smoke` or `@regression` to the correct case.
5. `npx tsc --noEmit` and `npm run lint` must be clean.
6. **Run the spec after refactoring** to confirm it is still green — tsc/lint do not catch logic errors (wrong method name, wrong argument after merging locators): `npx playwright test <spec-path> --project=chromium`. Fails after refactoring: report to the user — do not loosen assertions to pass.

Report files changed and run result.
