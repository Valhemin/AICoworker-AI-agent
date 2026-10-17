---
name: image-prompt-engineering
description: Compiles approved semantic visual intent into model-specific image prompt packages with references, controls, negatives, seeds, dimensions, and iteration plans. Use for image generation after canon and shot/design decisions are locked; do not change story or art direction.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - image prompt package
  - image adapter parameters
  - prompt iteration log
---
# Image Prompt Engineering

Cover images with key text use `opencreator-cover`. This skill handles image prompts for assets that are not cover images.

## Mission

Produce controllable, reproducible image-generation instructions.

## Activate when

for image generation after canon and shot/design decisions are locked

## Ownership

- image prompt package
- image adapter parameters
- prompt iteration log

## Must not

- invent design
- promise perfect consistency
- accept final asset without continuity review

## Input contract

- `shot or asset brief`
- `visual bible`
- `canonical references`
- `continuity constraints`
- `selected model adapter`

## Output contract

- `semantic_prompt`
- `model_adapter package`
- `negative constraints`
- `render variants plan`

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

1. Separate intent from model syntax.
2. Identify what each reference controls.
3. Use negatives for diagnosed failures.
4. Plan compositing for exact text/product geometry.
5. Change one important variable at a time after selection.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- Diagnose identity, composition, interaction, style, or text defect before retry.
- Use local edits and control images before full rerenders.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/image-prompting.md`](../../_shared/creator-knowledge/image-prompting.md)
- [`knowledge/continuity-management.md`](../../_shared/creator-knowledge/continuity-management.md)
- [`knowledge/ai-production-technical-direction.md`](../../_shared/creator-knowledge/ai-production-technical-direction.md)

## Preferred handoff

- `ai-production-technical-direction`
- `continuity-supervision`
- `quality-evaluation`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.

## Release note

Record the exact artifact version, unresolved uncertainty, and cheapest valid fallback before handoff.

