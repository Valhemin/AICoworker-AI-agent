# Image Prompt Engineering Playbook

## Two-layer prompt design

Keep creative intent separate from model syntax.

```yaml
semantic_prompt:
  narrative_function:
  asset_ids: []
  subject:
  action_and_expression:
  setting_and_time:
  composition:
  camera_and_field_of_view:
  lighting:
  production_design:
  continuity_constraints: []
  allowed_variation: []
  text_safe_zone:
  final_state:

model_adapter:
  model_and_version:
  mode:
  positive_prompt:
  negative_prompt:
  reference_images: []
  identity_controls:
  pose_depth_edge_controls:
  seed:
  sampler_or_steps:
  guidance:
  denoise_or_strength:
  dimensions:
```

## Prompt order

Order by importance and model behavior. A practical semantic order is subject identity → action → environment → composition/camera → lighting → design/style → constraints. Adapter syntax may differ.

## Reference discipline

- use clean, non-conflicting references;
- identify what each reference controls;
- avoid reference images with unwanted lighting or style when identity is the only goal;
- record weights and priority;
- store accepted outputs and settings;
- test identity across angles and expressions.

## Negative constraints

Use negatives for recurring failures, not as an unbounded list. Separate anatomical defects, identity drift, product/text errors, composition errors, and unwanted style.

## Text and products

Readable text, logos, packaging, and exact geometry often require dedicated tools or compositing. Generate clean plates, mask areas, and plan post-production rather than trusting one-pass generation.

## Iteration protocol

1. Validate semantic intent.
2. Create low-cost roughs with controlled variation.
3. Select composition and identity candidate.
4. Lock references and seed where useful.
5. Refine one variable at a time.
6. Use local edits for localized defects.
7. Run continuity and rights checks.
8. Record final manifest.

## Failure diagnosis

- wrong identity → reference quality/weight/model suitability;
- wrong composition → prompt priority/control image/canvas;
- style drift → conflicting references or broad style labels;
- bad hands/interaction → redesign pose, use control, crop, or composite;
- inconsistent wardrobe → asset ID/reference not prose repetition;
- weak focal point → composition and lighting, not more adjectives.

## Cost controls

Use grids for composition discovery, lower resolution for selection, and targeted inpainting for repairs. Upscale only accepted finals. Do not generate full-resolution variants when the decision is still about concept or pose.
