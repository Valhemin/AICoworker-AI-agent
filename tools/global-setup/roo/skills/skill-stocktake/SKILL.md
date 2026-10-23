---
name: skill-stocktake
description: Audit and garbage-collect skills, rules, MCPs, and config for bloat, redundancy, and staleness.
---

TRIGGER: agent setup feels bloated or duplicated, after adding a new skill pack, or as periodic monthly maintenance
OUTPUT: report — keep/merge/move/disable/remove table with rationale, token/context impact, recommended file moves, total token savings
SKIP: during active implementation sessions; run as a dedicated maintenance task only

---


Use when the agent setup feels bloated, duplicated, stale, after adding a new skill pack, or as periodic maintenance (~monthly).

## Scan Channels

| Channel | Path | Staleness signals |
|---|---|---|
| Skills | `.roo/skills*/*/SKILL.md` | Overlapping names, never triggered, domain mismatch, empty/broken |
| Rules | `.roo/rules*/*.md` | Content overlap between rules, >100 lines, redundant with skills |
| MCP servers | `.roo/mcp.json` | Fail to connect, functional duplicates, long-unused enabled servers |
| Templates | `.roo/templates/` | Outdated content, never referenced by skills |

## Workflow

1. List all rules and skills by mode.
2. Detect duplicates, overlaps, stale assumptions, project-specific leakage, and always-on instructions that should be on-demand skills.
3. Classify each item:
   - **keep** — actively useful
   - **merge** — overlaps with another, combine
   - **move** — wrong mode scope (global → mode-specific or vice versa)
   - **disable** — not needed now but may be useful later
   - **remove** — no value, adds prompt weight
4. Check whether each skill improves real workflow quality or only adds prompt weight.
5. Preserve the smallest set that covers the workflow.

## Cleanup Protocol

- Prefer soft-delete: rename to `.disabled` or move to a `_archive/` folder before permanent removal.
- For MCP: set `"disabled": true` instead of removing from `mcp.json`.
- Log what was changed and why.
- After cleanup, verify no skill references a removed/renamed dependency.

## Output

- Keep/Merge/Remove table with rationale.
- Token/context impact: LOW / MEDIUM / HIGH per item.
- Recommended file moves.
- Total estimated token savings.
