# Cost Optimization Playbook

## Cost is a quality constraint

The goal is not minimum spend. It is maximum accepted value per unit of money, time, and risk.

## Cost ledger

```yaml
cost_item:
  stage:
  tool_or_model:
  request_count:
  input_units:
  output_units:
  compute_or_seconds:
  direct_cost:
  human_minutes:
  accepted_outputs:
  rejected_outputs:
  defect_codes: []
  reusable_asset_value:
```

Useful metrics:

- cost per accepted concept;
- cost per approved script minute;
- cost per accepted image;
- cost per accepted video second;
- cost per final delivered variant;
- cost per qualified outcome;
- human cleanup minutes per accepted asset.

## Cheap-to-expensive funnel

1. schema and deterministic checks;
2. small-model extraction;
3. medium-model ideation;
4. strong-model critical decisions;
5. rough boards and scratch audio;
6. representative model benchmark;
7. draft generation;
8. final generation;
9. upscale, interpolation, lip-sync, localization.

## Routing rules

- route simple classification and formatting to small models;
- use strong models for ambiguous architecture, conflict resolution, and final critique;
- use multimodal evaluation only when visual evidence matters;
- batch non-urgent comparable tasks;
- cache stable system prompts, schemas, bibles, and examples;
- summarize handoffs rather than forward unlimited conversation history;
- use deterministic scripts for validation, cost calculation, and file operations.

## Render funnel

`thumbnail roughs → selected keyframes → animatic → representative motion tests → edit draft → final shots → upscale/finalize`

Generate video only for shots where motion creates value. Use static composition, 2.5D moves, motion graphics, or editorial montage when appropriate.

## Retry policy

Classify the defect before retrying. Two identical failures trigger a strategy change. A retry must change a relevant variable; random rerolls without diagnosis are waste.

## Budget allocation

Reserve budget for:

- high-impact opening and proof;
- recurring character references;
- difficult hero shots;
- voice and audio clarity;
- local-market review;
- rights and factual verification;
- variant testing with sufficient distribution.

Reduce spend on disposable transitions, duplicate backgrounds, unseen resolution, and derivatives with no distribution plan.
