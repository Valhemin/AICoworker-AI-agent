# Market Intelligence Playbook

## Purpose

Convert noisy market signals into a small set of testable creative decisions for a named audience, market, platform, and time window.

## Evidence hierarchy

1. Direct audience evidence: interviews, customer calls, comments, search queries, support tickets, sales objections, lesson errors.
2. Behavioral evidence: retention, saves, shares, qualified clicks, purchases, repeat viewing, search demand.
3. Platform evidence: trend tools, top ads, keyword tools, category pages, public creator performance.
4. Competitor evidence: repeated formats, promises, proof mechanisms, comments, offers, creative fatigue.
5. Expert or secondary evidence: reports, articles, analyst summaries.
6. Intuition: allowed only as a labeled hypothesis.

High view counts do not automatically mean demand. They may reflect distribution, novelty, creator fame, paid media, or controversy.

## Minimum decision questions

Before research, write no more than five questions that could change the creative decision. Examples:

- Which tension is active for this segment now?
- Which promise is saturated, and which proof is missing?
- Which format is native to the platform but underused in this category?
- Which objections prevent action after attention is captured?
- Does the concept need original-local production or can it be transcreated?

Stop research when new evidence no longer changes the choice or confidence band.

## Audience job map

For each segment, capture:

```yaml
audience_job:
  trigger_situation:
  functional_job:
  emotional_job:
  social_job:
  current_workaround:
  desired_progress:
  anxieties:
  habits_and_constraints:
  proof_they_trust:
  words_they_use:
```

Avoid demographic-only segments. “Women 18–34” is not actionable unless paired with a situation, motivation, and behavior.

## Competitor deconstruction

Code a sample using the same fields:

- opening mechanism;
- promise;
- emotional tension;
- format and presenter type;
- proof mechanism;
- visual device;
- pacing pattern;
- CTA;
- audience comments and objections;
- likely production cost;
- repeatability;
- signs of fatigue.

Separate **topic trend**, **format trend**, **aesthetic trend**, and **enduring tension**. A format can be trending while the underlying need is stable.

## Content-gap tests

A gap is useful only when at least one condition is true:

- important audience question is unanswered;
- available content is inaccurate, generic, or hard to apply;
- proof is weak or absent;
- existing content speaks to the wrong awareness level;
- the topic exists but not in the audience’s preferred format or language;
- the same promise can be delivered through a distinct mechanism;
- local context or cultural meaning is missing.

Changing only wording, colors, or narrator does not create a meaningful gap.

## Market hypothesis format

```yaml
market_hypothesis:
  segment:
  active_tension:
  existing_pattern:
  saturation_signal:
  underserved_angle:
  proposed_promise:
  proof_mechanism:
  platform_native_device:
  evidence_ids: []
  counter_evidence: []
  confidence: 0.0
  cheapest_valid_test:
  success_metric:
  invalidation_condition:
```

## Global-market rules

- Name countries and locales; do not use “global” as a substitute for research.
- Re-run market research when the source market and target market differ materially.
- Preserve the human tension but validate local expression, proof, humor, norms, and regulation.
- In multilingual markets, specify language mix, script, code-switching, subtitles, dubbing, and local-review policy.
- Do not infer cultural behavior from a single creator or viral example.

## Cost controls

- Begin with internal evidence before buying or collecting more data.
- Use a small stratified competitor sample before large-scale coding.
- Batch extraction and classification; reserve stronger models for synthesis and counter-argument.
- Track the number of decisions changed by research. Research that changes nothing may be unnecessary.

## Failure patterns

- trend list without audience implications;
- competitor imitation framed as strategy;
- global average used for a local market;
- single metric used as proof of demand;
- confirmation bias: only successful examples are reviewed;
- research continues because the team is avoiding a creative decision.

## Quality gate

Pass when the evidence brief identifies a specific segment, a tension, a differentiated and testable opportunity, uncertainty, counter-evidence, and the cheapest valid experiment. Fail when the output merely describes trends.
