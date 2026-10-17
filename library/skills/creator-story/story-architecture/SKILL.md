---
name: story-architecture
description: Designs causal story beats, character pressure and choice, escalation, scene necessity, setup/payoff, climax, resolution, and duration compression. Use for fiction, branded narrative, dramatic education, or story-led content; do not write final dialogue or camera instructions.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - story blueprint
  - beat map
  - setup/payoff map
  - character arc logic
  - scene necessity report
---
# Story Architecture

## Mission

Create a causal and emotionally earned blueprint before screenplay drafting.

## Activate when

for fiction, branded narrative, dramatic education, or story-led content

## Ownership

- story blueprint
- beat map
- setup/payoff map
- character arc logic
- scene necessity report

## Must not

- write polished dialogue
- choose lens or lighting
- invent unsupported documentary facts

## Input contract

- `selected concept`
- `audience promise`
- `duration`
- `genre`
- `character constraints`
- `evidence boundaries`

## Output contract

- `story_blueprint`
- `beat_table`
- `setup_payoff_map`
- `story_risk_report`

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

1. Every major beat changes options or follows from a choice.
2. Climax forces a consequential decision.
3. Escalation narrows options or raises specific cost.
4. Compress by removing repetition and backstory before causality.
5. Ending pays the original promise through action, evidence, or experience.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If story is episodic events, add decision-consequence links or remove beats.
- If payoff requires explanation, strengthen setup and visual/action resolution.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/story-causality.md`](../../_shared/creator-knowledge/story-causality.md)
- [`knowledge/character-world-bible.md`](../../_shared/creator-knowledge/character-world-bible.md)
- [`knowledge/screenplay-scene-writing.md`](../../_shared/creator-knowledge/screenplay-scene-writing.md)

## Preferred handoff

- `character-world-bible`
- `screenwriting`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
