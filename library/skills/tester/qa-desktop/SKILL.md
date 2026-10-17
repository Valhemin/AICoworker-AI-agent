---
name: qa-desktop
description: Write and run tests for one desktop window from existing cases. Electron, Tauri, or native app. Do not compare to Figma.
---

# QA desktop

Use when the window case table already exists and tests need to be written or run. Creating the table is `qa-plan`. Do not call `qa-write`, `qa-pom`, `qa-run`, or `qa-figma`.

If expected results are missing, ask. Do not fix product code. Do not install Xcode, Appium, or drivers system-wide. If tools are missing, still write the test file, mark the run section as `not available`, and stop.

## Choose one path

Read the repo then choose exactly one path. Do not mix two runners in one spec.

- Electron: Playwright `_electron`. Do not use Spectron.
- Tauri: WebdriverIO with `@wdio/tauri-service`, provider `embedded`. Do not use `tauri-driver` on macOS.
- macOS app (not a web view): Appium 3, driver `mac2`, `platformName` is `mac`, `automationName` is `mac2`, with `bundleId`.
- Windows app (not a web view): Appium Windows driver. Do not use WinAppDriver.
- Linux app (not Electron or Tauri): write `not available` for the run path. Do not choose a different library.

Desktop specs go in the repo's desktop test folder. If not separated, use `desktop/<feature>/`. Do not write into the web `tests/` folder.

## Write

One test per behavior. Test name is the behavior and result. Broken means the user cannot use the product: tag smoke. Otherwise: regression. Each test opens and closes the app by itself. Do not share one app process across multiple behaviors. No `test.only`. `test.skip` requires a reason.

Page objects per window: methods are the user's jobs. Assertions stay in the spec, not in the object. Locators come from actual UI inspection — do not fabricate them.

Locator priority for web view windows: role, label, then test id. Native apps: accessibility id, then visible name or label. XPath only when neither is available. If the accessibility tree is readable, do not click by coordinates.

The first window being a splash screen: do not treat it as the screen to test. Wait for the window with the correct title or the correct main screen path. OS file-picker dialogs: stub in the app process to return a fixed path. Do not control OS dialogs directly.

Electron must not receive `ELECTRON_RUN_AS_NODE`. Electron's `dialog` is not intercepted by Playwright. Replace that function in the main process before the test clicks the open-file button.

## Run

If the repo has a desktop test script, run exactly that script for one feature. If not, run exactly one spec file just written using the existing runner in the repo. If the runner is not in the repo, write `not available` — do not install it.

Read the command result. App not opening, missing Accessibility permission, or missing driver is an environment error — not a product FAIL. Do not change assertions to match a failing app. If not green, say not green.

Write `docs/test/product-test.md` when the task needs a PASS or FAIL. Each item has the action, the result observed, and PASS or FAIL. `ceo` gate: two sections `## Vietnamese` and `## English`. End of file has `## Needs clarification`. If none: write `None`.

Confirmed FAIL on the product: next step is `qa-bug`. No `reports/ai/summary.json`: take the report from this test record.
