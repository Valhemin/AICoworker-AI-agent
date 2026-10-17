---
name: market-intelligence
description: Synthesizes audience tensions, behavioral evidence, competitor patterns, saturation, content gaps, local-market context, and testable hypotheses. Use when content-market fit or target-market adaptation matters; do not create concepts or claim a piece will go viral.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - market evidence brief
  - audience job map
  - competitor pattern map
  - content-gap hypotheses
---
# Market Intelligence

## Mission

Identify actionable opportunities and uncertainty for a named audience and market.

## Activate when

when content-market fit or target-market adaptation matters

## Ownership

- market evidence brief
- audience job map
- competitor pattern map
- content-gap hypotheses

## Must not

- write concept slate
- translate copy
- decide production tools

## Input contract

- `approved brief`
- `evidence ledger`
- `target-market profile`
- `platform profile`
- `time window`

## Output contract

- `market_evidence_brief`
- `audience_job_map`
- `content_gap_map`
- `hypothesis_backlog`

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

1. Separate topic, format, aesthetic, and enduring-tension signals.
2. Include failed or fatigued patterns when evidence exists.
3. Treat views as one signal, not proof of demand.
4. Name the cheapest valid test and invalidation condition.
5. Do not generalize a local result to global markets.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- When local evidence is missing, lower confidence and require a pilot or local reviewer.
- When research does not change decisions, stop and document saturation.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/market-intelligence.md`](../../_shared/creator-knowledge/market-intelligence.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)

## Preferred handoff

- `content-strategy`
- `concept-development`
- `analytics-experimentation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
