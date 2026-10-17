# AI Production Technical Direction Playbook

## Role

Translate creative requirements into a reliable, reproducible, and cost-bounded technical pipeline.

## Model selection criteria

- modality and control mode;
- identity and product fidelity;
- motion complexity;
- prompt and language behavior;
- resolution and duration;
- hardware, latency, and cost;
- license and commercial terms;
- integration and reproducibility;
- failure profile;
- local versus hosted privacy needs.

Do not select by leaderboard or demo quality alone.

## Benchmark protocol

Use representative shots:

1. character close-up with expression change;
2. full-body movement;
3. prop or product interaction;
4. environment/camera motion;
5. difficult lighting or composition;
6. target-language typography if needed.

Run fixed prompt/reference sets across candidate models. Record accepted rate, retry rate, cost per accepted asset, time, defects, and post-production burden.

## Pipeline plan

```yaml
production_pipeline:
  stage:
  input_artifact_ids: []
  tool_and_version:
  adapter_id:
  hardware_or_provider:
  parameters:
  expected_cost:
  cache_key:
  retry_policy:
  fallback:
  output_validation:
  provenance_record:
```

## Reproducibility

Pin model, weights, node versions, workflow JSON, seeds where meaningful, preprocessing, reference files, environment, and post steps. Hash important assets. Save prompts and parameter manifests with outputs.

## Security and privacy

- do not upload private or licensed assets to unknown services;
- separate credentials from model-generated code;
- review custom nodes and dependencies;
- isolate execution when possible;
- record where assets were processed;
- use consent and retention policies for faces and voices.

## Fallback hierarchy

- adjust parameters;
- improve reference/preprocess;
- switch mode within model;
- switch model;
- simplify shot;
- use hybrid practical/composite/post solution;
- change creative plan.

## Cost metrics

Track cost per accepted image, accepted second, final delivered minute, and localized variant. Include human cleanup and render failure, not only API price.

## Failure patterns

- no representative benchmark;
- pipeline depends on unpinned custom nodes;
- model license assumed from code license;
- high-resolution generation used for discovery;
- retry loop without defect classification;
- workflow optimized for one hero demo but not batch reliability.
