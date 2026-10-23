---
name: qa-cleanup
description: List leftover test data and delete only what has been confirmed.
---

# QA cleanup

Read `reports/qa/test-data.json` or `leftover_data` in `reports/ai/summary.json`. If neither exists, say so and stop.

Group by type and deletion method. Unclear deletion method: separate that group — do not guess the path. Ask for confirmation by group. Do not delete without agreement.

For agreed groups: perform exactly the stated action. If the button is not where described, stop that item. When done, verify the item is gone, then mark it as cleaned in the data file. Report how many were deleted, how many remain, and a `## Needs clarification` section.
