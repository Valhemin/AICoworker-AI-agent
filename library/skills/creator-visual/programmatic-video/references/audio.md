# Audio: voice, captions, music

Voice sets timing; visuals follow the voice.

## One-time setup (host, no sudo)

```bash
brew install espeak-ng            # likely already present
uv venv --python 3.12 ~/.venvs/pv-audio     # Kokoro needs Python 3.11-3.12
uv pip install --python ~/.venvs/pv-audio/bin/python kokoro soundfile faster-whisper "av<16"
```

Always run with `VIRTUAL_ENV=$HOME/.venvs/pv-audio PATH=$HOME/.venvs/pv-audio/bin:$PATH` (Kokoro calls `uv pip` internally).
`av<16` needed: faster-whisper 1.2.1 fails with av 19 (`metadata_errors`). First run downloads models from Hugging Face (network approval).
Tested 2026-10-22: 6.4s voice generated + word timestamps OK on macOS arm64.

## Pipeline (manual; `scripts/make_video.py` does this per scene automatically)

```bash
python scripts/voiceover.py script.txt out/audio     # -> out/audio/voice.wav + captions.json
cp out/audio/voice.wav <remotion-app>/public/assets/
# durationInFrames = ceil(voice_seconds*30) + ~30 tail
```

`voiceover.py` normalizes loudness to about -16 LUFS (raw Kokoro is about -25 LUFS, too quiet).
Proofread captions.json vs script. Pass `audioSrc: "assets/voice.wav"` (and optional `musicSrc`) to a template; captioned graphics: use `captions` too.

## Mixing rules

- Voice volume 1.0; music `musicVolume` 0.08-0.15 (under voice).
- Music only with clear license (CC0 / purchased / own). Record source in PLAN.md.
- Loudness: `sh scripts/mix_check.sh out/video.mp4` (target about -16 LUFS integrated).

## TTS options

| Tool | License | Note |
|------|---------|------|
| Kokoro (default) | Apache-2.0 | local, English best; other languages need lang_code + voices |
| Piper (OHF-Voice/piper1-gpl) | GPL-3.0 | installed; Vietnamese via `lang=vi` |
| `opencreator-voice` | service | may cost; gate as paid |

Vietnamese: Kokoro has no Vietnamese voice. Installed: Piper (`piper-tts` 1.8.0, GPL-3.0 code) + voice `vi_VN-vais1000-medium` (CC BY 4.0 — credit "VAIS-1000" in the video description), in `~/.local/share/piper-voices/`. Run `python scripts/voiceover.py script.txt out/audio "" vi`. Tested: 3s sentence, Whisper recognized it back with one word off — proofread captions, and listen before publishing. Alternative: `opencreator-voice`.

## Verified (2026-10-22)

Voice file passed through `AudioTracks` into a rendered MP4: audio in the MP4 matched the source wav (correlation about 1.0). Templates take `audioSrc`, `musicSrc`, `musicVolume`; shared component `templates/AudioTracks.tsx` (copy next to `compositions/` as `src/AudioTracks.tsx`).
