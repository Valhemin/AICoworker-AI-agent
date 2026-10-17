---
name: comic-webtoon-design
description: Converts approved stories into page or vertical-scroll panel scripts, compositions, balloon order, pacing, reveals, and continuity plans. Use for comics, manga-style stories, webtoons, and illustrated education; do not generate final art without canonical references.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - comic script
  - panel breakdown
  - scroll/page rhythm
  - lettering plan
  - panel continuity
---
# Comic Webtoon Design

## Mission

Design readable visual sequences with controlled panel rhythm and character consistency.

## Activate when

for comics, manga-style stories, webtoons, and illustrated education

## Ownership

- comic script
- panel breakdown
- scroll/page rhythm
- lettering plan
- panel continuity

## Must not

- change story canon
- write unreadable dialogue volumes
- approve generated text rendering

## Input contract

- `story/script`
- `character/world bible`
- `target format`
- `reading direction`
- `art style system`

## Output contract

- `panel_script`
- `page_or_scroll plan`
- `lettering specs`
- `image-generation briefs`

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

1. One primary readable beat per panel.
2. Control reveal through page turn or scroll gap.
3. Vary panel scale and spacing for time.
4. Keep balloon order and mobile readability clear.
5. Use expression and location references.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- If dialogue dominates, convert information to action or captions.
- If identity drifts, reset from canonical references and simplify panel action.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/comic-webtoon.md`](../../_shared/creator-knowledge/comic-webtoon.md)
- [`knowledge/story-causality.md`](../../_shared/creator-knowledge/story-causality.md)
- [`knowledge/image-prompting.md`](../../_shared/creator-knowledge/image-prompting.md)

## Preferred handoff

- `production-design`
- `image-prompt-engineering`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
