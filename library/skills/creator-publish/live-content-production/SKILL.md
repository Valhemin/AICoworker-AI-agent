---
name: live-content-production
description: Builds live-stream or event rundowns, host beats, audience interaction, moderation, technical contingencies, claims guardrails, clip markers, and escalation paths. Use for live content; do not over-script spontaneous conversation or omit safety controls.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - live rundown
  - contingency plan
  - moderation and escalation rules
  - host cue sheet
  - clip marker plan
---
# Live Content Production

## Mission

Deliver reliable live value while preserving flexibility and safety.

## Activate when

for live content

## Ownership

- live rundown
- contingency plan
- moderation and escalation rules
- host cue sheet
- clip marker plan

## Must not

- guarantee real-time outcomes
- use unverified live claims
- ignore platform delay and moderation

## Input contract

- `event goal`
- `host/guest list`
- `platform`
- `run time`
- `technical setup`
- `risk category`

## Output contract

- `rundown`
- `run_of_show`
- `contingencies`
- `moderation guide`
- `post-live derivative notes`

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

1. Give viewers a reason to attend now.
2. Design resets for late arrivals.
3. Assign decision owners for failures.
4. Prepare backups for guest, connection, media, and demo.
5. Mark claims and prohibited topics.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If a segment fails, move to preplanned alternate without confusing the audience.
- If safety or factual risk emerges, pause, correct, or end the segment.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/live-content.md`](../../_shared/creator-knowledge/live-content.md)
- [`knowledge/podcast-interview.md`](../../_shared/creator-knowledge/podcast-interview.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `voice-sound-direction`
- `editing-postproduction`
- `content-repurposing`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
