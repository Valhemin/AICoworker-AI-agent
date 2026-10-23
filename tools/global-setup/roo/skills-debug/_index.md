# Skill Index

Read this before loading any skill. Match trigger → load only that skill.

| Skill | Load when | Skip when |
|---|---|---|
| root-cause-debugging | Bug reported or test fails unexpectedly | Root cause already confirmed |
| systematic-debugging-superpowers | Symptom unclear, right debug skill unknown | Symptom and category already known |
| network-api-debugging | HTTP errors, timeouts, auth failures | Frontend network — use chrome-devtools |
| performance-debugging | Slow page, API, renders, or test suite | No concrete performance symptom yet |
| flaky-test-debugging | Test passes sometimes, fails other times | Deterministic test failure |
| environment-config-debugging | Works locally, broken in CI/staging/prod | Same behavior across all environments |
| concurrency-debugging | Intermittent bug worsens under load | Single-threaded, sequential code only |
| regression-test-design | After confirming and fixing a bug | Writing tests before bug is fixed |
| click-path-audit | UI interaction works alone, broken in sequence | Backend or non-UI bug |
| chrome-devtools-debugging | Frontend rendering, network, JS perf issues | Backend or non-browser debugging |
| memory-leak-debugging | Process RAM grows unboundedly, OOM errors | Memory stable, no growth pattern |
| research-for-debug | Internal investigation hit dead end | Root cause traceable in local code |
| harness-config-debugging | Agent harness/MCP/rules itself behaves wrong | Application code has the bug |
