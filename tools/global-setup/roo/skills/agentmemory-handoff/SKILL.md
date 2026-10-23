---
name: agentmemory-handoff
description: Create session checkpoints and handoff summaries for long-running work across sessions, modes, or agents.
---

TRIGGER: context nearing compaction, switching modes, completing a delivery phase, or before delegating to another agent
OUTPUT: compact — checkpoint with goal, current phase, decisions, files changed, verification run, open risks, next step
SKIP: short sessions with no cross-session value or any checkpoint containing secrets or sensitive data

---


Use at the end of a substantial session, before compaction, before switching mode, after completing a phase, or before delegating to another mode/subtask.

## When to Trigger

- Context getting large (nearing compaction).
- Switching between modes (Spec → Implement, Debug → Implement).
- Completing a delivery phase.
- Before stopping work for the day.
- Before delegating to a subtask/subagent.

## Checkpoint Format

Capture:
- **Goal** — what we're trying to achieve.
- **Current phase/scope** — where we are in the workflow.
- **Decisions made** — architecture, tech choices, tradeoffs accepted.
- **Files changed** — or files intended to change next.
- **Verification run** — checks/tests executed and results.
- **Open risks/blockers** — what could go wrong or is blocking.
- **Next recommended step** — exact action for the next session/mode.

## Storage Rules

- Save only durable, non-sensitive engineering context to AgentMemory.
- Do not store secrets, tokens, credentials, customer data, raw logs, or transient command output.
- If the checkpoint contains only session-local info (no cross-session value), skip AgentMemory — summarize in chat instead.
- Verify current repo state before acting on recalled handoff — code may have changed since last session.
