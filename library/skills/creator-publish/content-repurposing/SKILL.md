---
name: content-repurposing
description: Decomposes source content into traceable atomic units and re-authors platform- and market-native derivatives with new hooks, context, CTAs, and provenance. Use when converting one source into multiple formats; do not mass-produce near-duplicates.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - source-unit map
  - derivative matrix
  - parent-child provenance
  - update propagation plan
---
# Content Repurposing

Vertical versions use short subtitles from `opencreator-subtitle`. Do not rewrite the script. Cover images with key text use `opencreator-cover`.

## Mission

Create useful derivatives without losing truth, context, or platform fit.

## Activate when

when converting one source into multiple formats

## Ownership

- source-unit map
- derivative matrix
- parent-child provenance
- update propagation plan

## Must not

- invent claims absent from source
- reuse one hook everywhere
- measure success by output count

## Input contract

- `approved source content`
- `strategy`
- `target platforms/markets`
- `rights scope`
- `distribution plan`

## Output contract

- `repurposing_plan`
- `derivative briefs`
- `new-material requirements`
- `update graph`

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

1. Give each derivative one native content job.
2. Preserve caveats and evidence context.
3. Write a new hook and CTA for the new audience state.
4. Propagate source corrections.
5. Create only derivatives with a distribution and value case.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If a clip lacks context or payoff, combine units or create new narration.
- If rights do not cover derivatives or ads, block that branch.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/content-repurposing.md`](../../_shared/creator-knowledge/content-repurposing.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)
- [`knowledge/packaging-distribution.md`](../../_shared/creator-knowledge/packaging-distribution.md)

## Preferred handoff

- `screenwriting`
- `packaging-distribution`
- `localization-cultural-adaptation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
