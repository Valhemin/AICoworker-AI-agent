# Accessibility and Inclusive Design Playbook

## Purpose

Make content perceivable, understandable, operable, and respectful for a wider audience while recognizing that accessibility requirements vary by medium, platform, jurisdiction, and user need.

## Plan accessibility at brief stage

Record target standards, audience needs, languages, assistive contexts, and delivery constraints. Accessibility cannot be fully repaired by adding captions after picture lock.

## Video and audio

- accurate synchronized captions, not raw unreviewed transcripts;
- speaker identification when needed;
- meaningful sound and music cues;
- readable line length, timing, contrast, and placement outside UI/safe-zone conflicts;
- transcript for long or information-dense content;
- audio description or described version when essential visual information is otherwise unavailable;
- avoid essential meaning conveyed only by color, sound, or rapid visual change;
- control flashes, abrupt volume changes, and overwhelming motion.

## Images, graphics, and documents

- provide concise alt text for function and meaning, not every pixel;
- mark decorative images appropriately;
- maintain logical reading order and heading hierarchy;
- use real text rather than flattened text where the channel permits;
- ensure charts have labels, patterns, or direct annotation beyond color;
- preserve contrast and readable size across mobile and projected environments.

## Language and cognition

- define specialized terms;
- use clear structure and predictable navigation;
- break complex procedures into stages;
- state prerequisites and expected outcomes;
- provide examples and summaries where they reduce load;
- avoid unnecessary idiom in critical instructions;
- localize accessibility assets, not only the main script.

## Inclusive representation

Representation quality includes agency, competence, context, and role—not merely visual presence. Review stereotypes and avoid using disability, accent, age, body, ethnicity, religion, gender, or socioeconomic status as an unexplained shorthand for incompetence, villainy, or inspiration.

## Production workflow

```yaml
accessibility_plan:
  target_requirements:
  caption_languages: []
  transcript_required:
  audio_description_required:
  alt_text_required:
  motion_flash_review:
  contrast_text_review:
  keyboard_or_interaction_review:
  local_reviewer:
  known_exceptions: []
```

## QA

Test captions against the final audio, not the script. Inspect mobile and desktop. Check reading order. Perform automated checks where useful, then manual and user testing for critical experiences. Record exceptions and remediation owner.

## Failure patterns

- captions cover product or important action;
- auto captions change names, numbers, or claims;
- translated captions exceed reading time;
- alt text repeats adjacent copy;
- color is the only comparison signal;
- motion cannot be paused or reduced where interaction requires it;
- inclusion is cosmetic while narrative agency remains stereotyped.

## Acceptance criteria

Required accessibility assets are complete, synchronized, localized, and checked in the final delivery context; critical meaning remains available through more than one appropriate channel; exceptions are documented and owned.
