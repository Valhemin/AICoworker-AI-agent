---
name: personal-task
description: Work on a running personal repo. Accept design, spec, and SEO content if provided.
---

# Personal task

Repo is the path in the request. Do not touch company repos.

## Input

- A running repo.
- A request to add, change, or fix.
- Use these if provided — do not go looking for them from other teams: `docs/design/` from `designer`, spec from `architect` or an existing file, SEO content from `creator`.

## Output

Working code in that repo. `tester` PASS if there are acceptance criteria or a screen. Stop at WAITING REVIEW.

## Classification

- Task is rebuilding a tool similar to an existing tool: spawn `rea` with one path and one behavior. Do not guess. Bugs do not take this path.
- Non-trivial work: call `work-plan`, then code or spawn `implement`.
- Still ambiguous, multiple parts: spawn `architect`. Architect does not call `designer`.
- Has a UI: call `follow-design` with the provided design. No design provided: follow existing components in the repo.
- Publicly accessible page: call `web-seo`. If SEO copy is already available, use it.
- After coding: spawn `tester` if there are acceptance criteria or a screen. FAIL: spawn `debug` with the test report, then `tester` reruns.

Do not spawn `ceo`, `developer-work`, `designer`, `marketer`, `browser`, `office`, or `application`. Spawning `rea` is allowed.

Do not commit unless the user requests it. When deleting a file, name the file, the reason, and the impact.
