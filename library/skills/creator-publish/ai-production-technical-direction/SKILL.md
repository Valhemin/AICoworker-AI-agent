---
name: ai-production-technical-direction
description: Selects and benchmarks models/tools, designs reproducible pipelines, pins versions, manages render manifests, security, fallbacks, and cost per accepted asset. Use before and during generation; do not make creative or story decisions.
license: CC-BY-4.0
compatibility: Agent Skills-compatible clients. Network and generation tools depend on the selected routine and local policy.
metadata:
  version: 4.0.0
  quality_target: measured-9.0-to-9.5
  owner_artifacts:
  - model selection plan
  - benchmark report
  - pipeline specification
  - render manifest
  - technical incident log
---
# Ai Production Technical Direction

For sequencing downloads, subtitles, voice, frame format, and cover image, use `opencreator-handoff`. This skill only selects tools, pins versions, and writes the manifest. It does not make content decisions.

## Mission

Turn creative plans into reliable technical workflows.

## Activate when

before and during generation

## Ownership

- model selection plan
- benchmark report
- pipeline specification
- render manifest
- technical incident log

## Must not

- select concepts by demo beauty
- assume licenses
- hide failures through endless retries

## Input contract

- `visual/audio plan`
- `risk classes`
- `tool inventory`
- `hardware/provider constraints`
- `rights and privacy requirements`

## Output contract

- `production_pipeline`
- `model_benchmark`
- `cost estimate`
- `fallback tree`
- `reproducibility manifest`

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

1. Benchmark representative shots and record accepted rate.
2. Pin model, weights, workflow, nodes, preprocessing, and post.
3. Separate code, weights, dataset, and output rights.
4. Protect private assets and credentials.
5. Track human cleanup in cost.

## Operating procedure

1. Validate artifact versions, required inputs, target market, and quality mode.
2. Classify missing information as blocking, safe assumption, or optional.
3. Load only the listed playbooks, relevant market/platform profiles, and one or two nearest golden cases.
4. Produce only owner artifacts using the shared metadata contract.
5. Run schema checks and the skill-specific self-review.
6. Create change requests for defects owned elsewhere; never silently rewrite them.
7. Record confidence, evidence IDs, rights status, expected downstream use, and cost implications.

## Failure recovery

- Switch mode, reference, model, shot design, or hybrid workflow after classified failure.
- Do not commit a sequence before one representative critical shot passes.

## Cost discipline

- Use deterministic validation and existing project evidence before new model calls.
- Do not generate extra variants without a decision purpose.
- Escalate to stronger models or human review only for ambiguity, high risk, or premium gates.
- After two repetitions of the same defect, change method, scope, owner artifact, or tool.

## Knowledge to load

- [`knowledge/ai-production-technical-direction.md`](../../_shared/creator-knowledge/ai-production-technical-direction.md)
- [`knowledge/cost-optimization.md`](../../_shared/creator-knowledge/cost-optimization.md)
- [`knowledge/rights-provenance-safety.md`](../../_shared/creator-knowledge/rights-provenance-safety.md)

## Preferred handoff

- `image-prompt-engineering`
- `video-motion-prompt-engineering`
- `voice-sound-direction`
- `editing-postproduction`

## Acceptance criteria

- Output is complete enough for the named downstream user without hidden guesses.
- The skill stayed inside ownership boundaries.
- Critical assumptions, evidence, rights, and uncertainty are visible.
- The relevant routine scorecard category floor is met.
- No hard gate owned by this stage is unresolved.
