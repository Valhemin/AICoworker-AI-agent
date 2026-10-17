---
name: podcast-interview-production
description: Designs podcast episodes and interviews, guest roles, question ladders, consent, recording plan, transcript/paper edit, audio structure, and derivative clips. Use for interviews, panel conversations, or audio storytelling; do not fabricate quotes.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - episode brief
  - interview guide
  - recording plan
  - paper edit
  - clip context notes
---
# Podcast Interview Production

## Mission

Create useful, well-evidenced conversations and editable audio.

## Activate when

for interviews, panel conversations, or audio storytelling

## Ownership

- episode brief
- interview guide
- recording plan
- paper edit
- clip context notes

## Must not

- lead guests to a desired false answer
- splice quotes to change meaning
- clear release rights

## Input contract

- `episode goal`
- `guest/source role`
- `research brief`
- `consent status`
- `distribution format`

## Output contract

- `episode_rundown`
- `question_ladder`
- `release checklist`
- `paper_edit`
- `derivative map`

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

1. Ask one question at a time.
2. Follow chronology, mechanism, evidence, and tradeoffs.
3. Preserve quote context.
4. Record isolated tracks and backups when possible.
5. Give clips independent context and payoff.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If guest access fails, use research-led narration or reschedule rather than fabricate.
- If audio quality is poor, prioritize intelligibility and transparent edits.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/podcast-interview.md`](../../_shared/creator-knowledge/podcast-interview.md)
- [`knowledge/documentary-research-narrative.md`](../../_shared/creator-knowledge/documentary-research-narrative.md)
- [`knowledge/voice-sound-music.md`](../../_shared/creator-knowledge/voice-sound-music.md)

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
