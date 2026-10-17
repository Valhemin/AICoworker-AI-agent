---
name: storyboard-animatic
description: Produces storyboard panels, timing, geography, action arrows, dialogue/audio notes, coverage audit, and scratch animatics. Use to validate visual plans before final generation; do not treat boards as final art.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - storyboard
  - animatic
  - coverage audit
  - missing-shot report
---
# Storyboard Animatic

## Mission

Expose timing, coverage, continuity, and production problems cheaply.

## Activate when

to validate visual plans before final generation

## Ownership

- storyboard
- animatic
- coverage audit
- missing-shot report

## Must not

- change character canon
- compile final prompts
- lock edit without review

## Input contract

- `shot list`
- `blocking plan`
- `visual bible`
- `continuity ledger`
- `scratch audio`

## Output contract

- `storyboard_panels`
- `animatic_timeline`
- `coverage_audit`
- `visual_plan_gate`

Every output includes:

```yaml
meta:
  project_id:
  artifact_id:
  artifact_type:
  owner_skill: {name}
  version:
  source_artifact_ids: []
  assumptions: []
  evidence_ids: []
  rights_status: unknown
  confidence: 0.0
  created_at:
```

## Decision rules

1. Include shot ID, duration, action, audio, and cut reason.
2. Use roughness appropriate to the decision.
3. Test real speech timing.
4. Distinguish batch exploration from sequential continuity boards.
5. Include fallback coverage for high-risk shots.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If animatic is long, return timing defects to script/editor owners.
- If geography is unclear, add anchor shots or redesign blocking.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/storyboard-animatic.md`](../../_shared/creator-knowledge/storyboard-animatic.md)
- [`knowledge/editing-postproduction.md`](../../_shared/creator-knowledge/editing-postproduction.md)
- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)

## Preferred handoff

- `ai-production-technical-direction`
- `image-prompt-engineering`
- `video-motion-prompt-engineering`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
