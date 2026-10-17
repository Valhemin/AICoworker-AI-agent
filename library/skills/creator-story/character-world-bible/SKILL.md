---
name: character-world-bible
description: Defines canonical character identity, psychology, relationships, voice, wardrobe, props, reference assets, locations, world rules, and allowed/forbidden changes. Use for recurring characters, series, fiction, comics, or consistent generated assets; do not write scenes.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - character bible
  - world bible
  - location bible
  - canonical asset IDs
  - change history
---
# Character World Bible

## Mission

Create a controllable canon for story and visual continuity.

## Activate when

for recurring characters, series, fiction, comics, or consistent generated assets

## Ownership

- character bible
- world bible
- location bible
- canonical asset IDs
- change history

## Must not

- write plot beats
- create shot prompts
- approve final generated identity

## Input contract

- `story blueprint or format system`
- `reference assets`
- `brand/world constraints`
- `consent status`

## Output contract

- `character_world_bible`
- `reference_capture plan`
- `canon_change protocol`

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

1. Separate immutable identity from scene variables.
2. Define behavior and movement, not only appearance.
3. Create multi-angle references for recurring generated characters.
4. Make world rules affect choices and design.
5. Record intentional state changes with scene boundaries.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- When references conflict, assign priority and rebuild a clean canonical set.
- When character cannot be reproduced reliably, simplify design or choose a stronger identity workflow.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/character-world-bible.md`](../../_shared/creator-knowledge/character-world-bible.md)
- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)
- [`knowledge/production-design-art-direction.md`](../../_shared/creator-knowledge/production-design-art-direction.md)

## Preferred handoff

- `screenwriting`
- `production-design`
- `continuity-supervision`
- `image-prompt-engineering`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
