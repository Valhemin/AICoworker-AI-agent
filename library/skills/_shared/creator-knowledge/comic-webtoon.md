# Comic and Webtoon Production Playbook

## Purpose

Design comics, manga-style pages, educational comics, and vertical webtoons where story, panel rhythm, character continuity, lettering, and scroll/page behavior work together.

## Format decision

- page comic: composition is experienced as a page and page turn matters;
- vertical webtoon: spacing, scroll reveal, mobile width, and episode cadence matter;
- strip/carousel: compact setup-turn-payoff and slide boundaries matter;
- illustrated story: text/image allocation and reading level dominate.

Lock target platform specifications and reading direction before layouts.

## Script contract

```yaml
panel:
  panel_id:
  narrative_function:
  characters_and_state:
  action:
  expression:
  setting:
  camera_and_composition:
  dialogue:
  caption:
  sfx:
  continuity_refs:
  lettering_space:
  transition_to_next:
```

Write only information that must be visible or heard. Do not direct impossible simultaneous actions in one static panel.

## Panel grammar

- wide panels establish space, scale, pause, or spectacle;
- close panels emphasize reaction, detail, or decision;
- repeated framing reveals change;
- gutters create time, omission, and inference;
- vertical whitespace controls anticipation in scrolling formats;
- page turns and long scroll gaps can hide reveals;
- panel density affects perceived speed.

## Dialogue and lettering

Budget space early. Keep balloons in reading order, tails unambiguous, and text away from important art. Dialogue must be shorter than prose. Use captions for time, voice, or information that image/dialogue cannot efficiently carry. Localized text expansion may require re-lettering, not shrinking.

## Character and location continuity

Maintain canonical front/side/three-quarter references, expression sheets, scale, costume states, props, location layouts, and color tokens. For AI images, generate/approve character sheets before sequential panels and keep a render manifest per panel.

## AI image workflow

1. thumbnail the episode without final rendering;
2. approve panel function and composition;
3. create hard reference assets;
4. render difficult hero panels first as model benchmarks;
5. render sequentially with continuity state;
6. repair anatomy/text separately where possible;
7. letter from editable text, not generated lettering;
8. inspect the full page/scroll at actual reading size.

## Episode design

An episode needs a local promise, progression, emotional or informational turn, and a reason to continue. Cliffhangers should arise from a changed state, choice, revelation, or imminent consequence—not arbitrary interruption.

## Global adaptation

Review reading direction, sound effects, honorifics, name order, typography, censorship/ratings, cultural references, platform payment model, and episode length. Preserve joke and emotion function through transcreation.

## Failure recovery

- talking heads: move conflict into action, props, space, reaction, or visual metaphor;
- inconsistent character: strengthen references and simplify camera/wardrobe variation;
- unreadable scroll: increase grouping and controlled whitespace;
- repetitive panels: vary function, not randomly angle;
- localization overflow: re-letter and redesign panel text allocation;
- generated text errors: remove text from image generation and letter separately.

## Acceptance criteria

Panels have distinct narrative functions, reading order is unambiguous, character/location states are continuous, lettering remains editable and localized, and the final page/scroll is tested at target device size.
