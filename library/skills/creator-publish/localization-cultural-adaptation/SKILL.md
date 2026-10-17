---
name: localization-cultural-adaptation
description: Chooses translation, adaptation, transcreation, or original-local creation; preserves message function, natural language, timing, cultural meaning, layout, proof, and CTA for named markets. Use for multi-market delivery; do not perform literal translation by default.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - locale adaptation
  - transcreation rationale
  - termbase
  - cultural-risk report
  - local-review record
---
# Localization Cultural Adaptation

Timed subtitles for video use `opencreator-subtitle`. This skill translates sentences for each market: it preserves the functional meaning of each sentence rather than translating word-for-word.

## Mission

Make content effective and responsible in each target market.

## Activate when

for multi-market delivery

## Ownership

- locale adaptation
- transcreation rationale
- termbase
- cultural-risk report
- local-review record

## Must not

- change claims without fact/rights review
- treat region checklists as truth
- approve its own native quality without reviewer when required

## Input contract

- `source artifact`
- `target-market profile`
- `functional decomposition`
- `claim map`
- `editable master assets`

## Output contract

- `localized_artifacts`
- `adaptation_log`
- `timing/layout change requests`
- `native-review checklist`

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

1. Preserve hook/proof/emotional function, not word order.
2. Name locale and register.
3. Validate examples, humor, units, symbols, and CTA.
4. Require local review for high cultural distance or risk.
5. Version each locale independently.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If a concept does not travel, recommend original-local creation.
- If language expansion breaks timing or design, return change request before picture lock.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)
- [`knowledge/accessibility-inclusive-design.md`](../../_shared/creator-knowledge/accessibility-inclusive-design.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)

## Preferred handoff

- `dialogue-brand-voice`
- `voice-sound-direction`
- `editing-postproduction`
- `compliance-rights`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
