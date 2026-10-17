---
name: systematic-debugging-superpowers
description: "Entry-point orchestrator — triage symptom, select the right debug skill, then apply it."
---

TRIGGER: symptom is unclear, the right debug skill is unknown, or this is the first debug invocation with no prior investigation
OUTPUT: compact — triage result with category, selected skill routed to, then that skill's output
SKIP: when the debug category is already known — go directly to the specific skill instead

---

## Triage (state result before proceeding)

1. Obvious from reading? → **fast path**: fix directly, 1-sentence explanation
2. Intermittent / load-dependent? → `flaky-test-debugging` or `concurrency-debugging`
3. Environment-specific only? → `environment-config-debugging`
4. Memory growing unboundedly? → `memory-leak-debugging`
5. Slow but not broken? → `performance-debugging`
6. HTTP/API/auth failure? → `network-api-debugging`
7. External error / library bug suspected? → `research-for-debug`
8. Harness/MCP/config broken? → `harness-config-debugging`
9. None of above → `root-cause-debugging`

Symptom spans multiple rows → start with most specific match.

## After routing

Apply the selected skill's process. Output contract from `rules-debug/01` applies.
