---
name: customer-issue
description: Receive an active customer incident. Route to architect for scoping, then debug for the fix and tester if needed.
---

# Customer issue

1. What the customer did, what they saw, and what they want. Write the domain and project name in the correct existing folder.
2. A feature request: stop and route to CEO.
3. A product incident: spawn `architect` with the steps the customer took. Architect scopes the module, then delegates to `debug`. If re-verification is needed, architect delegates to `tester`.
4. Do not fix code yourself. Do not spawn `debug` directly.

Write `support-issue.md` in the project folder. End with one next step.
