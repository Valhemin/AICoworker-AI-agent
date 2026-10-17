---
name: editing-postproduction
description: Builds edit decision lists, pacing, audio-picture relationships, captions, graphics, color/finishing, versioning, and technical QC. Use after approved assets or for audit repair; do not rewrite story facts or package promise silently.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - edit plan
  - EDL/timeline decisions
  - caption/graphics timing
  - master and derivative export plan
  - technical QC
---
# Editing Postproduction

For horizontal or vertical video export commands, use `opencreator-render`. This skill handles cut pacing, caption timing on the timeline, and export masters after picture lock.

## Mission

Assemble assets into a clear, motivated, technically deliverable experience.

## Activate when

after approved assets or for audit repair

## Ownership

- edit plan
- EDL/timeline decisions
- caption/graphics timing
- master and derivative export plan
- technical QC

## Must not

- use fixed cut cadence
- hide critical factual or continuity defects
- upscale before edit lock

## Input contract

- `approved script/animatic`
- `assets and manifests`
- `audio plan`
- `platform/localization profiles`
- `continuity report`

## Output contract

- `edit_decision_list`
- `timeline plan`
- `caption files/notes`
- `export matrix`
- `QC report`

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

1. Cut on attention, action, information, emotion, or POV change.
2. Use audio overlap intentionally.
3. Preserve reaction and comprehension time.
4. Link timeline clips to provenance.
5. Edit-lock before expensive finishing and localization renders.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- Use inserts, sound, alternate coverage, or local repair for generated discontinuity.
- Return story or claim defects to owners rather than editing around them.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/editing-postproduction.md`](../../_shared/creator-knowledge/editing-postproduction.md)
- [`knowledge/platform-native-creative.md`](../../_shared/creator-knowledge/platform-native-creative.md)
- [`knowledge/accessibility-inclusive-design.md`](../../_shared/creator-knowledge/accessibility-inclusive-design.md)

## Preferred handoff

- `packaging-distribution`
- `localization-cultural-adaptation`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
