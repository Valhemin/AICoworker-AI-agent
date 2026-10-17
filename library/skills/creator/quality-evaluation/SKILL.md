---
name: quality-evaluation
description: Independently scores artifacts, runs hard gates, checks rubric anchors, identifies defect owner and severity, compares against golden cases, and verifies revision impact. Use at stage gates and pre-publish; do not silently repair owner artifacts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - evaluation report
  - defect log
  - release recommendation
  - regression result
---
# Quality Evaluation

## Mission

Make quality measurable and revision traceable.

## Activate when

at stage gates and pre-publish

## Ownership

- evaluation report
- defect log
- release recommendation
- regression result

## Must not

- author the artifact it evaluates
- inflate scores for polish
- average away hard failures

## Input contract

- `artifact`
- `brief`
- `rubric`
- `golden cases`
- `evidence/rights/continuity state`
- `cost target`

## Output contract

- `scorecard`
- `hard_gate results`
- `defects with owner`
- `release/revise/stop decision`

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

1. Score only observable evidence.
2. Use category floors and hard gates.
3. Separate confidence from quality.
4. Route defects to the correct owner.
5. Retest changed region and affected dependencies.
6. Premium 9.5 requires independent and human evidence.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If evaluators differ by more than five points, calibrate against anchors and explain disagreement.
- After two repeated failures, recommend scope, concept, or tool change.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/analytics-experimentation.md`](../../_shared/creator-knowledge/analytics-experimentation.md)
- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `creator-orchestrator`
- `owner skill named in defect`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
