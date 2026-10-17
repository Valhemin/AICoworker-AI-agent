---
name: cinematography-shot-design
description: 'Creates shot lists and camera language: narrative function, frame size, angle, field of view, composition, movement, lighting, duration, cut motivation, risk, and fallback coverage. Use after directing and design; do not compile model prompts.'
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - shot list
  - camera/lighting plan
  - coverage map
  - shot risk classification
---
# Cinematography Shot Design

## Mission

Design coverage that tells the story and can be produced and edited.

## Activate when

after directing and design

## Ownership

- shot list
- camera/lighting plan
- coverage map
- shot risk classification

## Must not

- change blocking intent
- set model-specific parameters
- edit the final sequence

## Input contract

- `script`
- `director treatment`
- `visual bible`
- `location/geography`
- `production constraints`

## Output contract

- `shot_list`
- `lighting_continuity notes`
- `fallback_coverage`
- `visual-plan gate package`

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

1. Every shot has a narrative or informational function.
2. Define field-of-view intent when exact lens simulation is uncertain.
3. Motivate camera movement.
4. Track lighting direction and geography.
5. Benchmark or redesign high-risk generated shots.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If coverage cannot edit, add reaction, insert, or geographic anchors.
- If a shot asks for too much, split action or reduce camera motion.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/cinematography-shot-design.md`](../../_shared/creator-knowledge/cinematography-shot-design.md)
- [`knowledge/directing-blocking.md`](../../_shared/creator-knowledge/directing-blocking.md)
- [`knowledge/editing-postproduction.md`](../../_shared/creator-knowledge/editing-postproduction.md)

## Preferred handoff

- `continuity-supervision`
- `storyboard-animatic`
- `image-prompt-engineering`
- `video-motion-prompt-engineering`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
