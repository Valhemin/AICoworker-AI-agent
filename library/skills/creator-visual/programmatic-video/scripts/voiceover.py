#!/usr/bin/env python3
"""Script text -> voice.wav + captions.json (word timing) using local Kokoro + faster-whisper.
Usage: voiceover.py script.txt OUT_DIR [voice=af_heart] [lang=a]
  English: Kokoro (voice af_heart, lang a).  Vietnamese: pass lang=vi -> Piper vi_VN-vais1000-medium (voice arg ignored).
Needs the venv from references/audio.md (kokoro, soundfile, faster-whisper, av<16, espeak-ng).
Prints voice seconds: set durationInFrames = ceil(seconds*30) + tail.
"""
import json
import os
import subprocess
import sys

import numpy as np
import soundfile as sf


def main(script, out, voice="af_heart", lang="a"):
    from faster_whisper import WhisperModel
    text = open(script, encoding="utf-8").read().strip()
    if not text:
        sys.exit("empty script")
    os.makedirs(out, exist_ok=True)
    wav = os.path.join(out, "voice.wav")
    if lang == "vi":
        model = os.path.expanduser("~/.local/share/piper-voices/vi_VN-vais1000-medium.onnx")
        subprocess.run([sys.executable, "-m", "piper", "-m", model, "-i", script, "-f", wav], check=True)
        audio, sr = sf.read(wav)
    else:
        from kokoro import KPipeline

        pipe = KPipeline(lang_code=lang, repo_id="hexgrad/Kokoro-82M")
        audio = np.concatenate([a for _, _, a in pipe(text, voice=voice)])
        sr = 24000
        sf.write(wav, audio, sr)
    # Kokoro output is quiet (~-25 LUFS); normalize to ~-16 LUFS for social.
    norm = os.path.join(out, "voice-norm.wav")
    os.system(f'ffmpeg -loglevel error -y -i "{wav}" -af loudnorm=I=-16:TP=-1.5:LRA=11 "{norm}" && mv "{norm}" "{wav}"')
    segs, _ = WhisperModel("small", compute_type="int8").transcribe(wav, word_timestamps=True, language=("vi" if lang == "vi" else None))
    caps = [
        {"text": w.word.strip(), "startMs": round(w.start * 1000), "endMs": round(w.end * 1000)}
        for s in segs for w in s.words if w.word.strip()
    ]
    json.dump(caps, open(os.path.join(out, "captions.json"), "w"), ensure_ascii=False, indent=2)
    print(f"voice {len(audio) / sr:.2f}s, {len(caps)} words -> {out}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(*sys.argv[1:5])
