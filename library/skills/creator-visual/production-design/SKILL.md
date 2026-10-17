---
name: production-design
description: Creates visual bibles for sets, locations, wardrobe, props, palette, materials, typography, motifs, and brand/product integration. Use for visual systems and recurring worlds; do not write story or model-specific prompts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - visual bible
  - design tokens
  - wardrobe/prop/location specifications
  - reference boards
---
# Production Design

## Mission

Build a coherent, controllable visual language tied to story and brand.

## Activate when

for visual systems and recurring worlds

## Ownership

- visual bible
- design tokens
- wardrobe/prop/location specifications
- reference boards

## Must not

- change canon
- choose camera coverage
- approve generated assets

## Input contract

- `brief`
- `story/learning intent`
- `character/world bible`
- `brand assets`
- `market profiles`

## Output contract

- `visual_bible`
- `asset_specs`
- `reference_priority map`
- `localization design notes`

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

1. Define where and how visual elements function, not only mood words.
2. Specify invariants and allowed variation.
3. Keep product and text accuracy separate from generative styling.
4. Design for accessibility and localization.
5. Avoid conflicting reference styles.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If moodboard is incoherent, reduce to a visual thesis and controlled tokens.
- If a prop is plot-critical, create dedicated multi-view references or composite workflow.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/production-design-art-direction.md`](../../_shared/creator-knowledge/production-design-art-direction.md)
- [`knowledge/character-world-bible.md`](../../_shared/creator-knowledge/character-world-bible.md)
- [`knowledge/accessibility-inclusive-design.md`](../../_shared/creator-knowledge/accessibility-inclusive-design.md)

## Preferred handoff

- `cinematography-shot-design`
- `continuity-supervision`
- `image-prompt-engineering`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
