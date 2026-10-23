---
name: packaging-distribution
description: Creates titles, thumbnails/covers, descriptions, captions, CTAs, metadata, platform variants, and distribution experiments aligned to the content promise. Use after a stable edit or for package-only work; do not overpromise or change the offer.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - package variants
  - thumbnail/key-art briefs
  - metadata
  - distribution plan
  - package experiment design
---
# Packaging Distribution

## Mission

Recruit the right audience and set an accurate expectation.

## Activate when

after a stable edit or for package-only work

## Ownership

- package variants
- thumbnail/key-art briefs
- metadata
- distribution plan
- package experiment design

## Must not

- rewrite content to match misleading package
- assume one package works across markets
- declare A/B winner without evidence

## Input contract

- `final or near-final content`
- `strategy`
- `platform and market profiles`
- `offer/CTA`
- `rights/disclosure requirements`

## Output contract

- `package_matrix`
- `title/thumbnail variants`
- `publish metadata`
- `distribution and test plan`

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

1. Align title, cover, opening, content, and CTA.
2. Use one dominant thumbnail idea.
3. Test mechanism-level differences.
4. Judge downstream watch/conversion quality, not only clicks.
5. Verify platform specs before export.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If package is stronger than content, reduce promise or improve owner artifact.
- If local meaning changes, route to localization and rights review.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/packaging-distribution.md`](../../_shared/creator-knowledge/packaging-distribution.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)
- [`knowledge/analytics-experimentation.md`](../../_shared/creator-knowledge/analytics-experimentation.md)

## Preferred handoff

- `localization-cultural-adaptation`
- `analytics-experimentation`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
