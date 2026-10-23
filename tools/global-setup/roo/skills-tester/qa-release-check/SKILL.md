---
name: qa-release-check
description: Summarize Pass, Fail, and Not-run cases. Do not run new tests. Do not self-approve a release.
---

# QA release check

Do not run new tests. Read `testcases/`, `reports/ai/summary.json` if available, and `docs/test/product-test.md` if a desktop run exists. If neither report exists, say there is no recent run.

Ask first: is the current result in the files the most recent, or does a new round need to run before summarizing? User wants a new round: go to `qa-run` first. User does not: note clearly in the report "summary based on current results, no new round run".

Count Pass, Fail, Skipped, Not-run, and Manual by system. List features still Fail or Not-run with specific case IDs. Smoke case still Fail or Not-run: suggest not releasing — state the reason. Only non-smoke cases failing: state the issue for a person to decide. Cases marked Not-run for an unknown reason for a long time: list separately to ask about. Do not self-conclude that a release is safe.

Report in text. End with `## Needs clarification`.
