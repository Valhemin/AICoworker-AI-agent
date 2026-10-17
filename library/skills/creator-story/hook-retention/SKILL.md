---
name: hook-retention
description: Designs openings, promise/payoff maps, proof timing, retention beats, resets, and package-body alignment for short and long content. Use after concept or script; do not use clickbait or rewrite entire stories.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - hook candidates
  - retention map
  - promise/payoff audit
  - drop-risk report
---
# Hook Retention

## Mission

Give the right audience a clear reason to start and continue.

## Activate when

after concept or script

## Ownership

- hook candidates
- retention map
- promise/payoff audit
- drop-risk report

## Must not

- invent unsupported proof
- change offer
- apply arbitrary cut frequency

## Input contract

- `concept or script`
- `audience tension`
- `platform profile`
- `package draft`
- `analytics history`

## Output contract

- `hook_slate`
- `retention_map`
- `proof_timing notes`
- `experiment variants`

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

1. Orient and create tension early enough for context.
2. Set an expected payoff and deliver it.
3. Use motivated value resets, not editing noise.
4. Diagnose retention with package and audience fit.
5. Test mechanisms, not punctuation changes.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If hook is strong but body weak, return to script owner.
- If clarity and curiosity conflict, create a visual or proof-first opening.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/hook-retention.md`](../../_shared/creator-knowledge/hook-retention.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)
- [`knowledge/analytics-experimentation.md`](../../_shared/creator-knowledge/analytics-experimentation.md)

## Preferred handoff

- `screenwriting`
- `editing-postproduction`
- `packaging-distribution`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
