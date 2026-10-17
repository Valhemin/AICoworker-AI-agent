---
name: screenwriting
description: Writes production-ready scenes, action, dialogue draft, voice-over, transitions, and timing from an approved story or informational structure. Use when a script is required; do not alter evidence, strategy, or canon without a change request.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - screenplay
  - script timing draft
  - scene text
  - VO draft
---
# Screenwriting

## Mission

Turn approved structure into playable, visible, audible, and editable writing.

## Activate when

when a script is required

## Ownership

- screenplay
- script timing draft
- scene text
- VO draft

## Must not

- change factual claims
- choose final shot design
- perform localization silently

## Input contract

- `story blueprint or learning/documentary structure`
- `character/world bible`
- `claim constraints`
- `duration`
- `platform`

## Output contract

- `screenplay`
- `timing estimate`
- `claim annotations`
- `production questions`

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

1. Enter scenes late and leave after the turn.
2. Write filmable action in present tense.
3. Dialogue must pursue an objective or change power/information.
4. Use scratch reads for timing.
5. Map every factual/product claim to evidence.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If exposition is heavy, convert it into conflict, demonstration, visual evidence, or remove it.
- If duration fails, cut repeated information before emotional reaction or causality.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/screenplay-scene-writing.md`](../../_shared/creator-knowledge/screenplay-scene-writing.md)
- [`knowledge/dialogue-humanization.md`](../../_shared/creator-knowledge/dialogue-humanization.md)
- [`knowledge/advertising-ugc.md`](../../_shared/creator-knowledge/advertising-ugc.md)

## Preferred handoff

- `dialogue-brand-voice`
- `hook-retention`
- `directing-blocking`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
