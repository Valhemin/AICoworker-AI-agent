---
name: technical-planning-research
description: Resolve technical unknowns and produce implementation plans with decisions, rationale, alternatives, contracts, and validation.
---

TRIGGER: mid-planning unknown blocking implementation — architecture, integration, data model, or API behavior unclear after direction is set; NOT pre-commitment viability check (use feasibility-research)
OUTPUT: detailed — TECHNICAL DECISION blocks with cited sources, RESEARCH-NEEDED blocks for gaps, all artifacts written to disk
SKIP: architecture already clearly decided; pre-commitment viability check (use feasibility-research instead)

---

Process:
1. Fill technical context from repo evidence and user requirements.
2. Mark true unknowns as `NEEDS CLARIFICATION` only when they block a safe plan.
3. For library/API/runtime decisions, research current official docs, release notes, source, or issue trackers.
4. For each decision, document:
   - Decision
   - Rationale
   - Alternatives considered
   - Risks/trade-offs
   - Verification path
5. Produce only relevant artifacts: `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `test-plan.md`, `rollback.md`.
6. Re-check governing principles and production-readiness gates after design.

## Source quality tiers

| Tier | Label | Examples | Trust |
|---|---|---|---|
| 1 | `[official]` | Library docs, API reference, vendor pricing, source repo | Highest |
| 2 | `[repo]` | Existing code, config, migrations in this project | High |
| 3 | `[reputable]` | Tech news, conference talks, benchmarks ≤12mo | Medium-high |
| 4 | `[community]` | GitHub Issues, Stack Overflow, forums | Medium — flag as unofficial |

Minimum tier 1 or tier 2 for every architectural decision. If only tier 4 available: mark `confidence: low`. Never cite from model knowledge without `[unverified]`.

## Output format

Each decision must use this block:

```
## TECHNICAL DECISION: [topic]
Chosen: [approach]
Source: [URL or doc reference] [tier label] [date accessed]
Rationale: [why]
Alternatives considered: [what else was evaluated and why rejected]
Risks / trade-offs: [what this introduces]
Verification path: [how to confirm this works before full implementation]
```

Unknown facts that could not be verified:
```
## RESEARCH-NEEDED: [topic]
Tried: [search terms / sources checked]
Impact: [what decision is blocked or degraded by this gap]
Unblock: [what would resolve it — e.g., "contact vendor", "prototype test"]
```

## Done-definition

Technical planning research is COMPLETE when:
- Every architectural decision has a `TECHNICAL DECISION:` block with a cited source.
- Every unresolved gap has a `RESEARCH-NEEDED:` block — no silent assumptions for verifiable facts.
- All produced artifacts exist on disk (not just planned).
- Governing principles and production-readiness gates re-checked.
