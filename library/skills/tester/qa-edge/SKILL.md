---
name: qa-edge
description: Audit a case table against seven edge groups. Propose missing coverage. Do not invent cases outside the feature.
---

# QA edge

A case list must exist before auditing. If none, ask.

Read `requirements/<system>/<feature>.md` first — know the actual business rules (character limits, required fields) before comparing. Read `knowledge/<system>/<feature>.md` if it exists — know which APIs the feature calls that surface in the UI (affects group 6) and whether access control applies (group 7). Read existing specs in `tests/<feature>/` to avoid proposing cases that already exist. If the feature mapping is unknown, ask — do not guess the path.

Check against seven groups: main flow, missing required fields, wrong format, min/max boundary, special states, network error when the UI shows it, and access permissions.

Groups with coverage: keep. Groups missing: propose one case with input and expected result. Cases outside the feature scope: ask — do not delete. Risks outside the seven groups: list separately for a person to decide — do not turn them into mandatory cases.

Do not claim "fully covered" without having read all existing specs — state which files were read.

Return the group table, existing cases, and proposed cases. End with `## Needs clarification`. Write specs only when requested. Web pages: use `qa-write`. Desktop windows: use `qa-desktop`.
