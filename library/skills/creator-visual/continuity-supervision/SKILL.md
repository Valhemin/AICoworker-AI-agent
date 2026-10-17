---
name: continuity-supervision
description: Maintains identity, wardrobe, prop, action, geography, time, lighting, product, and emotional state across scenes and generated assets. Use for multi-shot or recurring content; do not create story or aesthetic alternatives.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - continuity ledger
  - reference hierarchy
  - generated-asset continuity report
  - state-change log
---
# Continuity Supervision

## Mission

Prevent attractive assets from breaking canon, causality, or editability.

## Activate when

for multi-shot or recurring content

## Ownership

- continuity ledger
- reference hierarchy
- generated-asset continuity report
- state-change log

## Must not

- rewrite prompts directly unless owner
- approve story changes
- ignore critical defects because they are brief

## Input contract

- `character/world and visual bibles`
- `shot list`
- `storyboard`
- `generated assets`
- `render manifests`

## Output contract

- `continuity_ledger`
- `asset_check reports`
- `repair requests`
- `accepted variation policy`

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

1. Track state before generation.
2. Prioritize canonical reference over prose.
3. Classify critical versus acceptable variation.
4. Check neighboring shots and start/end states.
5. Use targeted repair before full rerender when possible.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- Route defect to prompt, design, shot, or model owner based on cause.
- If continuation compounds drift, cut to alternate coverage or reset from canonical reference.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)
- [`knowledge/character-world-bible.md`](../../_shared/creator-knowledge/character-world-bible.md)
- [`knowledge/image-prompting.md`](../../_shared/creator-knowledge/image-prompting.md)
- [`knowledge/video-motion-prompting.md`](../../_shared/creator-knowledge/video-motion-prompting.md)

## Preferred handoff

- `storyboard-animatic`
- `ai-production-technical-direction`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
