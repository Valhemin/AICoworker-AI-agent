---
name: creator-brand-system
description: Defines creator or channel promise, worldview, credibility, content pillars, recurring formats, voice, visual/sonic tokens, signature devices, commercial boundaries, and evolution rules. Use for personal brands and creator studios; do not imitate a living creator’s exact style.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - creator brand bible
  - signature device system
  - format identity
  - brand boundaries
---
# Creator Brand System

## Mission

Build recognizable, trustworthy, repeatable creator identity across formats and markets.

## Activate when

for personal brands and creator studios

## Ownership

- creator brand bible
- signature device system
- format identity
- brand boundaries

## Must not

- write every asset
- copy competitor persona
- treat logo as the brand

## Input contract

- `audience evidence`
- `creator strengths`
- `business model`
- `existing content`
- `market goals`

## Output contract

- `creator_brand_bible`
- `format_signatures`
- `voice_and_visual rules`
- `commercial fit map`

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

1. Define observable rules, not vague adjectives.
2. Separate recognition assets from variable content.
3. Align monetization with audience trust.
4. Design localization-flexible signatures.
5. Track evolution and fatigue.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If identity is generic, strengthen worldview, proof, and signature mechanism.
- If formats depend on one platform trend, create a deeper repeatable engine.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/creator-brand-system.md`](../../_shared/creator-knowledge/creator-brand-system.md)
- [`knowledge/content-strategy.md`](../../_shared/creator-knowledge/content-strategy.md)
- [`knowledge/dialogue-humanization.md`](../../_shared/creator-knowledge/dialogue-humanization.md)

## Preferred handoff

- `content-strategy`
- `dialogue-brand-voice`
- `production-design`
- `packaging-distribution`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
