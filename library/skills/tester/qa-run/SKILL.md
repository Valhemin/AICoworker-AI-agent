---
name: qa-run
description: Run Playwright with exactly one command then read summary.json. Do not conclude a bug when the error is environmental.
---

# QA run

For web pages only. Desktop windows run via `qa-desktop` — do not use this skill.

**Ask everything in one message when receiving the task** (one message, not sequentially): Which sprint? Which round (if the same feature is running multiple rounds)? If already known this session, do not ask again.

1. Read `knowledge/<system>/<feature>.md` if it exists — know the URL, hidden flows, or quirks before running.
2. Feature not in the repo mapping: stop and ask. Do not guess the path.
3. URL comes from repo config. Production: ask before running.
4. Full smoke or regression suite: check the domain first (`curl -o /dev/null -s -w "%{http_code}" <domain>`). Dead or 5xx: stop — do not run the whole suite and produce dozens of fake timeouts.
5. One feature: `npx playwright test --grep "@<feature>"` (with browser). Smoke: `npm run test:smoke` (headless). Regression: `npm run test:regression` (headless). Re-run failures: `npm run test:failed`. `test:ui` and `test:debug` wait for user input — say so, do not fabricate results.
6. Run with `> /dev/null 2>&1`. Read `reports/ai/summary.json`. Do not read long logs, HTML reports, or `trace.zip`.
7. Check `knowledge_warnings` in summary.json — if warnings exist, re-read `knowledge/<system>/<feature>.md`, compare to the real screen, **update the knowledge file immediately** before reporting. Stale knowledge that is not corrected will repeat.
8. Only when the group is `assertion` or `timeout`: read at most two files in `reports/qa/diagnostics/`.

`environment` = infrastructure failure, not a product bug. `locator` = UI changed, fix the test. `assertion` = possible bug — do not conclude until diagnostics are read. `timeout` = app slow or API hanging. `flaky` = unstable test.

Report: pass/fail count, domain, grouped failure reason (same cause = 1 line), and `## Needs clarification`. Maximum 15 lines in the results section. Do not fix code to pass unless the task explicitly asks to fix the test.
