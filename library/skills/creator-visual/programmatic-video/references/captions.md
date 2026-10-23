# Captions pipeline

1. Extract/prepare audio: `ffmpeg -i assets/video.mp4 -vn -ac 1 -ar 16000 assets/audio.wav`
2. Transcribe with word timestamps (venv, no sudo; model download needs network approval):
   ```python
   from faster_whisper import WhisperModel
   import json
   segs, _ = WhisperModel("small").transcribe("assets/audio.wav", word_timestamps=True)
   json.dump({"segments": [{"words": [{"word": w.word, "start": w.start, "end": w.end} for w in s.words]} for s in segs]}, open("whisper.json", "w"))
   ```
3. Convert: `python3 -I scripts/whisper_to_captions.py whisper.json > captions.json`
4. Proofread text against the script (names, numbers). Pass as `props.captions` to `CaptionedSocial`.
5. Duration: `durationInFrames = round(ffprobe_seconds * 30)`.

Alternative: `@remotion/captions` (`Caption[]`: text, startMs, endMs, timestampMs, confidence) — same shape plus two fields; add them if you switch.
