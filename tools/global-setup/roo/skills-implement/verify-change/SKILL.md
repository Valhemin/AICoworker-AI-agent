---
name: verify-change
description: Verify the just-completed code slice using the repo's existing commands, then report PASS or FAIL.
---

# Verify change

Method source: ECC `verification-loop` (MIT). Only run commands the project already has.

1. Check `package.json`, `pyproject.toml`, `go.mod`, or equivalent. Use existing scripts.
2. Build or typecheck if the repo has such a command. Fail: stop.
3. Lint if the repo has such a command.
4. Test the changed slice. Do not require coverage if the repo has not configured it.
5. `git diff --stat`. Review files outside the intended scope.
6. Look for new secrets in the diff: `sk-`, `api_key`, `BEGIN PRIVATE KEY`. Do not fix style outside scope.

Keep the last ~30 lines of each command. Report:

- Build, type, lint, test: PASS or FAIL
- Files changed
- Overall: WAITING REVIEW when the slice's tests have run. NOT READY when any are still FAIL.

Stop here. Do not commit unless the user requests it.
