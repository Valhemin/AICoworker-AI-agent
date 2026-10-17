---
name: independent-review
description: Review a code slice against the spec and changed files. Do not fix code. Do not use the implementer's own words as evidence.
---

# Independent review

Use after `implement` has a code slice. Do not use when the task is fixing a bug that `tester` has already pinpointed. That belongs to `debug`.

Read only the slice's spec, the list of changed files, and the slice's tests. Do not read `implement`'s chat history. Do not read another role's memory.

## Review

1. The slice does exactly what the spec requires. Extra features are FAIL.
2. The slice's error paths are handled. No test for the changed behavior: FAIL.
3. New repos: the four layers `domain`, `app`, `adapters`, `ui` are still correct. Existing repos: no second parallel tree.
4. Slice touches login, money, files, URLs, sessions, WebView, or IPC: check: HTTPS, no token in a public location, apps with login enforce one account per device, versions below the minimum are blocked. One open item: FAIL.
5. The implementer's own self-review does not count as passed.

## Result

Write `docs/review/review.md` in the repo. Each item includes file, what is wrong, and observed evidence. No issues found: write PASS.

Do not edit product code. Do not adjust tests to match. Do not spawn other agents.

FAIL: next step is `implement` fixing exactly those items. After two rounds still FAIL: write `../shared/05_Approvals/Pending/BLOCKED-<domain>-<project-name>.md` in five lines and stop. PASS: next step is `tester`.
