---
name: context-window-management
description: Manage context window budget — load minimally, summarize aggressively, audit token overhead from skills/rules/MCPs.
---

TRIGGER: task touches many files, large logs, long generated code, or session output quality degrades due to context pressure
OUTPUT: compact — audit of token overhead per component, oversized items flagged, recommendations to trim or disable
SKIP: short focused tasks with few files and no context pressure

---


Use when a task touches many files, long logs, generated code, large docs, or multiple subtasks. Also use periodically to audit context overhead.

## Loading Rules

- Build a compact context map before editing.
- Read only relevant sections first; expand progressively only when a decision needs more evidence.
- Summarize large files/logs into reusable bullets and continue from the summary.
- Keep unrelated stack traces, dependency output, and generated content out of active reasoning.
- Prefer task-local summaries when delegating subtasks.
- Before final response, compress progress into: changed files, checks run, pass/fail, risks, next step.

## Context Budget Audit

When session feels sluggish or output quality degrades, audit token consumption:

| Component | Where | Warning threshold |
|---|---|---|
| Skills | `skills/*/SKILL.md` | >400 lines per skill |
| Rules | `rules*/*.md` | >100 lines per rule |
| MCP servers | `mcp.json` | >7 enabled simultaneously |
| MCP tool schemas | per server | ~500 tokens/tool, servers with >20 tools |

### Audit steps
1. Count active skills, rules, and MCP servers.
2. Estimate total token overhead (lines × 1.3 ≈ tokens).
3. Flag oversized items and redundancies.
4. Recommend: disable unused MCPs, merge overlapping skills, trim verbose rules.

## Anti-patterns

- Loading an entire repo without a targeted question.
- Keeping failed command logs after extracting the root signal.
- Enabling many MCPs "just in case."
- Treating memory as more authoritative than current files.
- Skills >400 lines that could be split or trimmed.
