---
name: analytics-experimentation
description: Designs measurement trees, creative taxonomies, A/B or multivariate tests, decision rules, outcome analysis, and learning-loop updates. Use before release and after performance data; do not infer causation from weak comparisons.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - experiment plan
  - creative coding taxonomy
  - result analysis
  - pattern-library update
---
# Analytics Experimentation

## Mission

Turn publication into reliable creative learning.

## Activate when

before release and after performance data

## Ownership

- experiment plan
- creative coding taxonomy
- result analysis
- pattern-library update

## Must not

- change content without owner request
- optimize vanity metrics alone
- generalize local results globally

## Input contract

- `strategy`
- `package variants`
- `historical data`
- `platform metrics`
- `business/learning outcomes`

## Output contract

- `experiment_log`
- `metric tree`
- `decision report`
- `new hypotheses`

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

1. Pre-register primary metric and variable.
2. Use diagnostic and guardrail metrics.
3. Record exposure, targeting, and context.
4. Accept null results.
5. Link performance to creative mechanisms and cost.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If test is underpowered, report uncertainty rather than winner.
- If CTR rises but quality falls, diagnose package-audience mismatch.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/analytics-experimentation.md`](../../_shared/creator-knowledge/analytics-experimentation.md)
- [`knowledge/market-intelligence.md`](../../_shared/creator-knowledge/market-intelligence.md)
- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)

## Preferred handoff

- `market-intelligence`
- `content-strategy`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
