---
name: voice-sound-direction
description: Designs voice casting/performance, pronunciation, ambience, SFX, music arc, audio hierarchy, stems, consent, and audio QC. Use for video, podcast, film, ads, and lessons; do not imitate unauthorized voices or change script meaning.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - voice profile
  - audio plan
  - music/SFX brief
  - pronunciation guide
  - audio rights metadata
---
# Voice Sound Direction

For dubbing from subtitle files, use `opencreator-voice`. This skill handles voice performance, music, sound effects, and audio layer ordering.

## Mission

Make audio intelligible, emotionally purposeful, localizable, and rights-cleared.

## Activate when

for video, podcast, film, ads, and lessons

## Ownership

- voice profile
- audio plan
- music/SFX brief
- pronunciation guide
- audio rights metadata

## Must not

- rewrite claims
- choose visual shots
- use reference music as licensed material

## Input contract

- `approved script`
- `target locale`
- `director/edit intent`
- `rights status`
- `delivery platform`

## Output contract

- `voice_direction`
- `sound_cue_sheet`
- `music_brief`
- `scratch/final workflow`
- `audio QC report`

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

1. Use scratch voice before timing lock.
2. Direct through situation, intent, pace, and restraint.
3. Give each sound a narrative or informational job.
4. Keep separable stems for localization.
5. Verify voice and music permissions.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If speech fights music, solve arrangement and frequency before loudness.
- If locale timing changes, submit timing change request before final synthesis.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/voice-sound-music.md`](../../_shared/creator-knowledge/voice-sound-music.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `editing-postproduction`
- `localization-cultural-adaptation`
- `compliance-rights`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
