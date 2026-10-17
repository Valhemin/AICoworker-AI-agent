---
name: dialogue-brand-voice
description: Humanizes dialogue and copy, differentiates speakers, applies brand voice, improves speakability, subtext, register, and target-language naturalness without changing story facts or intent. Use after a draft script; do not restructure the story.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - dialogue/voice pass
  - speaker voice profiles
  - brand-language compliance notes
  - read-aloud defects
---
# Dialogue Brand Voice

## Mission

Make language playable, distinctive, culturally appropriate, and non-generic.

## Activate when

after a draft script

## Ownership

- dialogue/voice pass
- speaker voice profiles
- brand-language compliance notes
- read-aloud defects

## Must not

- change plot or claims
- add local cultural references without evidence
- imitate a living creator exactly

## Input contract

- `draft script`
- `character voice profiles`
- `brand system`
- `market/locale`
- `claim constraints`

## Output contract

- `revised dialogue`
- `change log`
- `scratch-read notes`
- `locale risk flags`

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

1. Write from speaker intent and relationship.
2. Use disfluency strategically, not randomly.
3. Remove generic AI rhetoric and explanatory emotion.
4. Test voice distinction without speaker names.
5. Preserve silence and reaction where they carry subtext.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If target-language rhythm breaks timing, transcreate and return a timing change request.
- If voices merge, increase worldview, status, vocabulary, and noticing differences.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/dialogue-humanization.md`](../../_shared/creator-knowledge/dialogue-humanization.md)
- [`knowledge/global-localization-transcreation.md`](../../_shared/creator-knowledge/global-localization-transcreation.md)
- [`knowledge/creator-brand-system.md`](../../_shared/creator-knowledge/creator-brand-system.md)

## Preferred handoff

- `hook-retention`
- `localization-cultural-adaptation`
- `voice-sound-direction`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
