---
name: concept-development
description: Creates structurally distinct concept slates, defines premise, promise, creative mechanism, emotional engine, proof/payoff, visual device, repeatability, and differentiation. Use after strategy; do not write full scripts or prompts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - concept slate
  - concept cards
  - concept score matrix
  - selected-concept recommendation
---
# Concept Development

## Mission

Generate and select concepts with real mechanism-level differences.

## Activate when

after strategy

## Ownership

- concept slate
- concept cards
- concept score matrix
- selected-concept recommendation

## Must not

- write screenplay
- choose final model
- claim market success

## Input contract

- `brief`
- `market hypothesis`
- `content strategy`
- `brand and production constraints`

## Output contract

- `concept_candidates`
- `concept_scores`
- `kill_or_repair notes`
- `concept_gate package`

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

1. Vary mechanisms, not only wording or styling.
2. Include a proven, adjacent, and high-upside option when mode permits.
3. Require a visible or audible mechanism.
4. Do not pass concepts without a feasible payoff or proof.
5. Treat rights, truth, and producibility as veto gates.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- Repair weak concepts by changing mechanism, proof, format, or scope.
- Kill concepts whose differentiation disappears when trend styling is removed.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/concept-development.md`](../../_shared/creator-knowledge/concept-development.md)
- [`knowledge/advertising-ugc.md`](../../_shared/creator-knowledge/advertising-ugc.md)
- [`knowledge/story-causality.md`](../../_shared/creator-knowledge/story-causality.md)

## Preferred handoff

- `creative-producer`
- `story-architecture`
- `learning-experience-design`
- `documentary-narrative`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
