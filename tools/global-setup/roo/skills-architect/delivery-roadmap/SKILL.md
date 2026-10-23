---
name: delivery-roadmap
description: Plan production delivery with ordered milestones, dependencies, verification gates, and release/rollback notes.
---

TRIGGER: planning production delivery with milestones, ordered slices, dependencies, and verification gates
OUTPUT: detailed — milestones with dependencies, risks/mitigations, verification gates, release/rollback notes, manual QA checklist
SKIP: single-task work that doesn't require multi-milestone planning

---

# Delivery Roadmap

## Roadmap Must Include

- Milestones (ordered, with dependencies stated).
- Slice order and rationale.
- Dependencies between slices.
- Risks and mitigations per milestone.
- Verification gates (what must pass before next milestone starts).
- Release/rollback notes.
- Manual QA checklist.

## After Each Milestone Completes

Architect Pro produces a milestone synthesis (see coordination contract):
- Which subtasks completed/failed.
- Gate status: pass / fail / partial.
- Decision: advance to next milestone, hold for fixes, or escalate.
- Next action with owner and artifact destination.

Do not advance to the next milestone without a synthesis and an explicit gate decision.
