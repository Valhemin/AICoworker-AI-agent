---
name: creative-brief
description: Converts a content request into an approved, measurable creative brief with audience, target markets, deliverables, constraints, evidence needs, success metrics, and definition of done. Use before strategy or production when requirements are incomplete; do not generate concepts or scripts.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - approved brief
  - assumption log
  - definition of done
  - constraint list
---
# Creative Brief

## Mission

Define the problem and acceptance criteria so downstream skills do not guess.

## Activate when

before strategy or production when requirements are incomplete

## Ownership

- approved brief
- assumption log
- definition of done
- constraint list

## Must not

- research the market
- choose the final concept
- write copy or shots

## Input contract

- `user goals`
- `stakeholder information`
- `brand/product facts`
- `target markets`
- `available assets`
- `budget and deadline`

## Output contract

- `approved_brief`
- `blocking_questions`
- `safe_assumptions`
- `success-metric tree`

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

1. Translate vague goals into observable audience or business change.
2. Separate must-have constraints from preferences.
3. Require one primary job per deliverable.
4. Specify market, language/locale, platform, and content status: factual, fictional, or hybrid.
5. Do not accept “viral” as a success metric without operational measures.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- When stakeholders conflict, record alternatives and decision owner.
- When market is unknown, stop market-sensitive creative work but allow format-neutral exploration labeled speculative.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/content-strategy.md`](../../_shared/creator-knowledge/content-strategy.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)

## Preferred handoff

- `research-fact-verification`
- `market-intelligence`
- `content-strategy`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
