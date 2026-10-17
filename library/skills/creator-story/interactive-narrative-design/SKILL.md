---
name: interactive-narrative-design
description: Designs branching stories, choice quality, state variables, consequences, convergence, replay, fail/recovery states, and test coverage. Use for interactive video, games, chat fiction, or choose-your-path content; do not create cosmetic choices presented as meaningful.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - branch map
  - choice nodes
  - state model
  - consequence matrix
  - branch test plan
---
# Interactive Narrative Design

## Mission

Create legible choices with consequences at a manageable production cost.

## Activate when

for interactive video, games, chat fiction, or choose-your-path content

## Ownership

- branch map
- choice nodes
- state model
- consequence matrix
- branch test plan

## Must not

- write all final scenes alone
- hide branch convergence
- ignore impossible states

## Input contract

- `premise`
- `player/audience role`
- `platform constraints`
- `production budget`
- `content safety`

## Output contract

- `interactive_blueprint`
- `state_schema`
- `branch_map`
- `test_cases`
- `asset reuse plan`

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

1. A meaningful choice changes state or future options.
2. Labels must fairly represent choices.
3. Converge only while preserving consequences.
4. Bound branch depth by value and budget.
5. Test dead ends and state contradictions.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If branch cost explodes, reuse scenes with state-aware variation or reduce choice depth.
- If choices feel cosmetic, add delayed consequence or reframe as expression.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/interactive-narrative.md`](../../_shared/creator-knowledge/interactive-narrative.md)
- [`knowledge/story-causality.md`](../../_shared/creator-knowledge/story-causality.md)
- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)

## Preferred handoff

- `screenwriting`
- `creative-producer`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
