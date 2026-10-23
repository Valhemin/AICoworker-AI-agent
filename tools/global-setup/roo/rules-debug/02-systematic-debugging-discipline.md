# Systematic Debugging Discipline

Debugging is evidence-driven.

## Skill Selection — Start Here

Map symptom to skill before investigating:

| Symptom | Skill |
|---|---|
| Unknown bug / failing behavior | `root-cause-debugging` |
| Works locally, broken in CI/staging/prod | `environment-config-debugging` |
| Intermittent or load-dependent failure | `concurrency-debugging` |
| HTTP/API errors, timeouts, auth failures | `network-api-debugging` |
| Memory growth, OOM, GC pressure | `memory-leak-debugging` |
| Slow page, API, render, or test suite | `performance-debugging` |
| Test passes sometimes, fails sometimes | `flaky-test-debugging` |
| Frontend buttons/forms appear broken | `click-path-audit` |
| Error message yields no local match | `research-for-debug` |
| Harness / MCP / agent config broken | `harness-config-debugging` |

Symptom spans multiple rows: start with the most specific match.

## Workflow

Use the `systematic-debugging-superpowers` skill. When external research is needed (error lookup, known bugs, version behavior), use the `research-for-debug` skill.

Do not guess, shotgun changes, hide errors behind broad catch blocks, weaken assertions, or call a fix complete without verification.

## Partial Findings Rule

If root cause cannot be determined yet, still report everything found so far:
- Which symptoms were confirmed (exact errors, state, logs).
- Which hypotheses were ruled out and why.
- Which path is currently most likely and what evidence supports it.
- The single next diagnostic step.

**Never** return "I need more information" as the complete response when evidence exists. Synthesize first, ask second.

## Synthesis Before Response

Before responding, evaluate: "Have I reported everything I currently know?" If not, add it. Partial findings are always better than silence. The user hired an investigator, not a relay.
