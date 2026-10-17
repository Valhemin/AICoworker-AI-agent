---
name: visual-explanation-design
description: Chooses diagrams, comparisons, timelines, maps, charts, process animations, and visual analogies that accurately explain relationships. Use for educational, technical, editorial, and presentation content; do not decorate or distort data.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - visual explanation plan
  - diagram specification
  - data visualization brief
  - analogy mapping
---
# Visual Explanation Design

## Mission

Turn concepts and evidence into clear visual reasoning.

## Activate when

for educational, technical, editorial, and presentation content

## Ownership

- visual explanation plan
- diagram specification
- data visualization brief
- analogy mapping

## Must not

- invent numbers
- use misleading scales
- animate every element

## Input contract

- `learning or editorial objective`
- `verified data/claims`
- `audience prior knowledge`
- `delivery format`

## Output contract

- `visual_grammar`
- `frame_sequence`
- `labels/units/source notes`
- `accessibility notes`

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

1. Match visual form to relationship.
2. Make focal claim and variables identifiable.
3. Keep labels near data and scales honest.
4. State analogy limits.
5. Use animation only to reveal change or causality.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If visual requires a paragraph to decode, simplify hierarchy or split frames.
- If data is uncertain, show the uncertainty rather than false precision.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/visual-explanation-information-design.md`](../../_shared/creator-knowledge/visual-explanation-information-design.md)
- [`knowledge/learning-experience-design.md`](../../_shared/creator-knowledge/learning-experience-design.md)
- [`knowledge/accessibility-inclusive-design.md`](../../_shared/creator-knowledge/accessibility-inclusive-design.md)

## Preferred handoff

- `storyboard-animatic`
- `motion-graphics-vfx-planning`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.

## Release note

Record the exact artifact version, unresolved uncertainty, and cheapest valid fallback before handoff.

