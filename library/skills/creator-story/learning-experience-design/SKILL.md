---
name: learning-experience-design
description: Designs observable learning outcomes, misconception maps, instructional sequence, examples, practice, retrieval, feedback, transfer checks, and cognitive-load constraints. Use for lessons, explainers, training, and educational content; do not merely make a script entertaining.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - learning blueprint
  - misconception map
  - assessment plan
  - instructional sequence
---
# Learning Experience Design

## Mission

Ensure content produces learning, not only attention.

## Activate when

for lessons, explainers, training, and educational content

## Ownership

- learning blueprint
- misconception map
- assessment plan
- instructional sequence

## Must not

- verify domain facts alone
- write final visual prompts
- substitute views for learning evidence

## Input contract

- `learner profile`
- `domain evidence`
- `delivery constraints`
- `prior knowledge`
- `learning objective`

## Output contract

- `learning_blueprint`
- `practice items`
- `feedback rules`
- `comprehension gate`

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

1. Write observable outcomes.
2. Surface plausible misconceptions.
3. Use explanation plus retrieval/application.
4. Manage cognitive load and reading speed.
5. Measure comprehension or transfer separately from engagement.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If the lesson is too dense, reduce scope or segment it.
- If learners can repeat but not apply, add varied practice and decision rules.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/learning-experience-design.md`](../../_shared/creator-knowledge/learning-experience-design.md)
- [`knowledge/visual-explanation-information-design.md`](../../_shared/creator-knowledge/visual-explanation-information-design.md)
- [`knowledge/children-family.md`](../../_shared/creator-knowledge/children-family.md)

## Preferred handoff

- `screenwriting`
- `visual-explanation-design`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
