---
name: motion-graphics-vfx-planning
description: Plans motion-graphics systems, kinetic typography, data animation, VFX plates, tracking, compositing, generated elements, and finishing integration. Use when controlled graphic or hybrid effects add value; do not use motion as decoration or fake data.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - motion design brief
  - VFX shot breakdown
  - plate and tracking requirements
  - compositing plan
---
# Motion Graphics Vfx Planning

## Mission

Create clear, producible motion and VFX with honest information and integration.

## Activate when

when controlled graphic or hybrid effects add value

## Ownership

- motion design brief
- VFX shot breakdown
- plate and tracking requirements
- compositing plan

## Must not

- invent data
- replace story clarity with effects
- ignore perspective/light match

## Input contract

- `script/shot list`
- `brand/design system`
- `data sources`
- `plate availability`
- `delivery specs`

## Output contract

- `motion_system`
- `VFX_breakdown`
- `asset_list`
- `compositing_QC`

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

1. Motion must reveal relationship or guide attention.
2. Capture clean plates and measurements.
3. Match perspective, blur, light, grain, and interaction.
4. Keep text readable at final size.
5. Preserve source and units for data graphics.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If generated effect cannot integrate, simplify to graphic abstraction or practical plate.
- If kinetic text is unreadable, reduce words and motion layers.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/motion-graphics-vfx.md`](../../_shared/creator-knowledge/motion-graphics-vfx.md)
- [`knowledge/visual-explanation-information-design.md`](../../_shared/creator-knowledge/visual-explanation-information-design.md)
- [`knowledge/editing-postproduction.md`](../../_shared/creator-knowledge/editing-postproduction.md)

## Preferred handoff

- `ai-production-technical-direction`
- `editing-postproduction`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
