# captioned-social

Footage + karaoke captions (phase 2). Packs: `core`, `assets`, `captions`.

1. Put the video in `<remotion-app>/public/assets/`.
2. Transcribe with word timestamps (`../../references/captions.md`), then convert:
   `python3 scripts/whisper_to_captions.py whisper.json > src/props/captions.json`
3. Pass the JSON array as `props.captions`; set `durationInFrames = round(seconds * 30)`
   (`ffprobe -v error -show_entries format=duration -of csv=p=0 video.mp4`).
4. Preview, then WAITING REVIEW before render.

`props.json` captions are placeholders — never ship them. No real caption timing = not done.
