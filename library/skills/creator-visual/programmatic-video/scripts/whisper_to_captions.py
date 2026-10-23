#!/usr/bin/env python3
"""Convert faster-whisper / OpenAI-whisper word-timestamp JSON to [{text,startMs,endMs}].
Usage: whisper_to_captions.py whisper.json > captions.json
Accepts {"segments":[{"words":[{"word","start","end"}]}]} (seconds) or a flat list of such words.
"""
import json
import sys


def convert(data):
    words = data if isinstance(data, list) else [w for s in data.get("segments", []) for w in s.get("words", [])]
    out = []
    for w in words:
        text = str(w.get("word", w.get("text", ""))).strip()
        if not text:
            continue
        if "start" not in w or "end" not in w:
            raise ValueError(f"word without start/end: {w!r} (transcribe with word_timestamps=True)")
        out.append({"text": text, "startMs": round(w["start"] * 1000), "endMs": round(w["end"] * 1000)})
    if not out:
        raise ValueError("no words found")
    return out


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    json.dump(convert(json.load(open(sys.argv[1]))), sys.stdout, ensure_ascii=False, indent=2)
