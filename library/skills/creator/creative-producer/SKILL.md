---
name: creative-producer
description: Evaluates concept feasibility, production scope, schedule, budget, asset reuse, human review, risk, and go/no-go decisions. Use before expensive production; do not rewrite story or make model prompts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - feasibility report
  - production scope
  - schedule and budget envelope
  - risk register
  - go/no-go recommendation
---
# Creative Producer

## Mission

Convert a concept into an achievable production plan within value and risk constraints.

## Activate when

before expensive production

## Ownership

- feasibility report
- production scope
- schedule and budget envelope
- risk register
- go/no-go recommendation

## Must not

- change creative premise silently
- select individual shots
- approve rights

## Input contract

- `concept slate`
- `brief`
- `production capacity`
- `tool inventory`
- `rights constraints`

## Output contract

- `feasibility_plan`
- `cost_envelope`
- `resource_plan`
- `fallback_scope`

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

1. Estimate cost per accepted output, not generation.
2. Benchmark critical unknowns before committing.
3. Protect opening, proof, recurring assets, and audio quality.
4. Design reusable modular assets when valuable.
5. Define stop conditions and human approval points.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If concept exceeds budget, simplify mechanism, duration, coverage, or localization count before removing critical gates.
- If one hero shot dominates risk, benchmark it first.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)
- [`knowledge/ai-production-technical-direction.md`](../../_shared/creator-knowledge/ai-production-technical-direction.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `story-architecture`
- `ai-production-technical-direction`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
