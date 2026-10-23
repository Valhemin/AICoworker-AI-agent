---
name: dispatching-parallel-agents
description: Delegate independent work safely without losing context or quality.
---

TRIGGER: work can be split into independent scopes with no shared state or file conflicts between subtasks
OUTPUT: compact — per-subtask brief with purpose, constraints, ACs, verification; synthesis table after all agents complete
SKIP: tasks that modify the same files or depend on incomplete shared state from another parallel task

---


Delegation contract per subtask: see `rules-architect/03` (Delegation Contract section).

## When NOT to use

- Shared files with high conflict risk
- Unknown root-cause debugging
- Small edits faster done sequentially
- Tasks lacking acceptance criteria

## After All Agents Complete

Architect Pro collects all summaries → produces synthesis table (see coordination contract). Do not relay raw. Make a single integrated decision: proceed / hold / escalate / re-delegate. Identify merge conflicts or integration risks across parallel outputs.

## Partial Failure Handling

If one agent fails: record it in the synthesis as `failed`, assess downstream impact, and continue unblocked agents. Propose resolution (retry, Debug Pro, or defer). Never silently drop a failed agent from the synthesis.
