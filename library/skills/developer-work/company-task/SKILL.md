---
name: company-task
description: Accept a requirement or bug for the company repo. Route to implement, tester, and debug until PASS.
---

# Company task

Repo is the path in the task. You do not write code.

## Input

A requirement to implement, or a bug to resolve. Plus the repo.

## Output

`implement` has made the change. `tester` PASS. If still FAIL, name the items and the agent fixing them. Stop at WAITING REVIEW.

## Classification

- Not enough to code: spawn `architect` with a brief. Architect does not call `designer`.
- Already clear, or a bug: spawn `implement`.
- `implement` done: spawn `tester`.
- Tester FAIL: spawn `debug` with the test report. Debug fixes the FAIL items. Then `tester` reruns.
- Repeat until PASS or one error cannot be reproduced.

Do not call `web-seo`. Do not spawn `designer`, `marketer`, `analyst`, or `creator`.

Do not commit unless the user requests it. When deleting a file, implement names the file, the reason, and the impact.
