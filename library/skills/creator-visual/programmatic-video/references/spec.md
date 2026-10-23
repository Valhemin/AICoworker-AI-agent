# spec.json (single input of the production flow)

`python scripts/make_video.py <project> [--init] [--render] [--aspect 9:16|16:9|1:1]` — run with the pv-audio venv (`audio.md`). Example: `examples/sample-vi.json`.

```json
{
  "meta":  { "title": "...", "lang": "vi|en", "aspect": "9:16", "captions": true, "voice": "af_heart (en only)" },
  "brand": { "accent": "#RRGGBB", "background": "#RRGGBB", "text": "#RRGGBB", "track": "#RRGGBB", "ctaText": "#RRGGBB" },
  "music": { "file": "assets/music.mp3", "volume": 0.1 },
  "rights": [{ "file": "assets/x.mp4", "source": "URL or 'own'", "license": "CC0 | Pexels | Pixabay | own | ..." }],
  "scenes": [ { "type": "...", "narration": "spoken text (or \"seconds\": N for silent)", ... } ]
}
```

## Scene types

| type | required | optional | use for |
|------|----------|----------|---------|
| hook | text (<=9 words, `**word**` = highlight) | | first 3 seconds, kinetic words synced to voice |
| kinetic | text | | punchy statement, words pop with the voice |
| title | title | subtitle | brand moment (logo from brand.logo) |
| ui | url, button, items[<=3 {name,meta}], app | doneLabel | animated app mock (typing, click, progress); drawn as "Minh họa giao diện", never as real footage |
| counter | value (number), label | prefix, suffix, decimals | one big real number counting up |
| features | heading, items[<=4 {icon,title,desc}] | | icon cards; icon = lucide-react name (Gauge, ShieldCheck, Lock, Zap...) |
| steps | heading, items[<=4 {title,desc?}] | | numbered timeline following the voice |
| pricing | heading, items[<=5 {name,price,note?,highlight?,badge?}] | source | real prices only |
| bullets | heading, items[<=5] | | fallback list |
| screenshot | image | heading | real product screenshot |
| chart | heading, unit, series[{label,value}] | | real data only |
| quote | quote | attribution | |
| footage / image | src | heading, startFromSec | licensed stock or own |
| cta | heading, button | url | last scene |

Any scene: `transition` (slide-up | slide-left | fade | wipe; default alternates), `captions:false`, `source` (small attribution line).
Brand adds `accent2` (second gradient color) and optional `logo` (SVG/PNG in assets, needs rights entry). meta adds `music` (tech|calm|uplift|none, generated bed, ducks under voice) and `sfx` (whoosh on cuts, hit on hook/counter/cta).
Scene length = voice length + 0.6s; transitions overlap 9 frames.

## What the script enforces (FAIL, no render)

Pacing rules: scene 1 must be hook/counter/kinetic with <=14 words of narration; last scene must be cta; no text scene over 9s; no same scene type three times in a row; item limits per type.

lang/aspect valid; brand hex colors; text/background and ctaText/accent contrast >= 4.5; required fields; <=5 bullets; chart values numeric; assets exist inside the project folder; every asset (and music) has a `rights` entry with source + license; footage long enough for its scene.
After render: size, duration, audio stream, loudness -19..-13 LUFS, true peak <= -1 dBTP, then `out/RELEASE.md` + `out/qc/contact-sheet.png`.

## Add a scene type

Component in `templates/video/src/Video.tsx` + entry in `SCENES` + required fields in `TYPES` (`make_video.py`).
