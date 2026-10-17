---
name: content-strategy
description: Defines content jobs, funnel roles, pillars, repeatable formats, channel mix, platform adaptations, portfolio balance, cadence logic, and measurement trees. Use after a brief and market evidence; do not write individual scripts or prompts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - content strategy
  - format systems
  - portfolio plan
  - distribution role map
  - measurement tree
---
# Content Strategy

## Mission

Turn evidence and goals into a repeatable content system.

## Activate when

after a brief and market evidence

## Ownership

- content strategy
- format systems
- portfolio plan
- distribution role map
- measurement tree

## Must not

- invent unsupported insights
- select camera language
- write final package variants

## Input contract

- `approved brief`
- `market evidence`
- `brand system`
- `platform profiles`
- `production capacity`

## Output contract

- `strategy_document`
- `format_systems`
- `content_portfolio`
- `measurement_tree`

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

1. Assign one primary content job to each asset.
2. Define pillars as audience promise plus mechanism, not topics.
3. Design native variants rather than one master crop.
4. Balance proven, adjacent, and exploratory work.
5. Tie metrics to the content job and downstream quality.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If the plan exceeds capacity, reduce formats before reducing quality gates.
- If every asset has the same CTA, map funnel stages and reassign jobs.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/content-strategy.md`](../../_shared/creator-knowledge/content-strategy.md)
- [`knowledge/creator-brand-system.md`](../../_shared/creator-knowledge/creator-brand-system.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)
- [`knowledge/analytics-experimentation.md`](../../_shared/creator-knowledge/analytics-experimentation.md)

## Preferred handoff

- `concept-development`
- `creative-producer`
- `content-repurposing`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
