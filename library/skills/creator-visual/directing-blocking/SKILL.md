---
name: directing-blocking
description: Defines performance intention, playable direction, staging, blocking, eyelines, spatial power, action beats, and coverage needs. Use after an approved script; do not choose model syntax or final edit.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - director treatment
  - blocking plan
  - performance notes
  - coverage intent
---
# Directing Blocking

## Mission

Translate dramatic or informational intent into behavior in space.

## Activate when

after an approved script

## Ownership

- director treatment
- blocking plan
- performance notes
- coverage intent

## Must not

- change script claims
- choose final generation parameters
- randomly add movement

## Input contract

- `approved script`
- `story/learning intent`
- `character/world bible`
- `location constraints`
- `tool feasibility`

## Output contract

- `director_treatment`
- `blocking_beats`
- `performance_direction`
- `coverage_requirements`

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

1. Give playable actions rather than emotion labels.
2. Motivate movement through objective and pressure.
3. Use distance, orientation, and props to express relationships.
4. Limit simultaneous complex actions for generated shots.
5. Protect reaction and decision moments.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If a shot is technically unreliable, split action into coverage or redesign blocking.
- If staging communicates nothing, simplify and align to the scene turn.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/directing-blocking.md`](../../_shared/creator-knowledge/directing-blocking.md)
- [`knowledge/cinematography-shot-design.md`](../../_shared/creator-knowledge/cinematography-shot-design.md)
- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)

## Preferred handoff

- `production-design`
- `cinematography-shot-design`
- `storyboard-animatic`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
