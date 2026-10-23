#!/usr/bin/env python3
"""spec.json -> finished MP4 (voice per scene, durations from voice, Remotion render, QC, RELEASE.md).

Usage: make_video.py PROJECT_DIR [--spec FILE] [--init] [--render] [--aspect 9:16|16:9|1:1]
  default : validate + voice + write remotion/src/resolved.json, print preview/render commands (no render)
  --init  : create PROJECT_DIR/remotion (create-video + npm i; NETWORK, needs approval) and copy templates/video/src
  --render: local render + QC + out/RELEASE.md (run only after WAITING REVIEW approval)
Run with the pv-audio venv python (references/audio.md). Spec format: references/spec.md.
"""
import argparse, hashlib, json, math, os, re, shutil, socket, subprocess, sys

SKILL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASPECTS = {"9:16": (1080, 1920), "16:9": (1920, 1080), "1:1": (1080, 1080)}
FPS, LEAD, TAIL, MIN_FRAMES, TFRAMES = 30, 0.45, 0.6, 45, 9
MIN_BY_TYPE = {"ui": 150, "counter": 75, "steps": 90, "pricing": 90, "features": 75}
MAX_SEC = 9.0  # text scenes longer than this get boring: split them
MUSIC_STYLES = ("tech", "calm", "uplift", "none")
DEPS = ["@remotion/transitions", "lucide-react", "@fontsource/be-vietnam-pro"]
TARGET_LUFS = -16.0
TYPES = {  # required fields; asset fields listed in ASSET_FIELDS
    "hook": ["text"], "kinetic": ["text"], "counter": ["value", "label"],
    "ui": ["url", "button", "items"], "features": ["heading", "items"],
    "steps": ["heading", "items"], "pricing": ["heading", "items"],
    "title": ["title"], "bullets": ["heading", "items"], "screenshot": ["image"],
    "chart": ["heading", "unit", "series"], "quote": ["quote"], "footage": ["src"],
    "image": ["src"], "cta": ["heading", "button"],
}
ASSET_FIELDS = {"screenshot": "image", "footage": "src", "image": "src"}
HEX = re.compile(r"^#[0-9a-fA-F]{6}$")


def die(msg):
    sys.exit(f"FAIL: {msg}")


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, text=True, **kw)


def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def contrast(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def probe(path, entry):
    return float(run(["ffprobe", "-v", "error", "-show_entries", entry, "-of", "csv=p=0", path],
                     capture_output=True).stdout.strip().split("\n")[0] or 0)


def validate(spec, project):
    meta, brand, scenes = spec.get("meta", {}), spec.get("brand", {}), spec.get("scenes", [])
    if meta.get("lang") not in ("vi", "en"):
        die("meta.lang must be 'vi' or 'en'")
    if meta.get("aspect", "9:16") not in ASPECTS:
        die(f"meta.aspect must be one of {list(ASPECTS)}")
    if not meta.get("title"):
        die("meta.title required")
    for k in ("accent", "accent2", "background", "text", "track", "ctaText"):
        if not HEX.match(brand.get(k, "")):
            die(f"brand.{k} must be #RRGGBB")
    if contrast(brand["text"], brand["background"]) < 4.5:
        die("brand.text vs brand.background contrast < 4.5")
    if contrast(brand["ctaText"], brand["accent"]) < 4.5:
        die("brand.ctaText vs brand.accent contrast < 4.5 (CTA button unreadable)")
    if not scenes:
        die("scenes empty")
    if scenes[0].get("type") not in ("hook", "counter", "kinetic"):
        die("scene 1 must be a 'hook' (or counter/kinetic): open on the strongest line, not a logo/title card")
    if len(scenes[0].get("narration", "").split()) > 14:
        die("scene 1 narration > 14 words: the hook must land in about 3 seconds")
    if scenes[-1].get("type") != "cta":
        die("last scene must be 'cta' (one clear next step)")
    for i in range(2, len(scenes)):
        if scenes[i].get("type") == scenes[i - 1].get("type") == scenes[i - 2].get("type"):
            die(f"scenes {i - 1}-{i + 1}: same type three times in a row, vary the visuals")
    if not spec.get("music") and meta.get("music", "tech") not in MUSIC_STYLES:
        die(f"meta.music must be one of {MUSIC_STYLES}")
    rights = {r["file"]: r for r in spec.get("rights", []) if r.get("file")}
    used = []
    for i, s in enumerate(scenes, 1):
        t = s.get("type")
        if t not in TYPES:
            die(f"scene {i}: unknown type {t!r}")
        for f in TYPES[t]:
            if not s.get(f):
                die(f"scene {i} ({t}): missing '{f}'")
        if t == "bullets" and len(s["items"]) > 5:
            die(f"scene {i}: more than 5 bullets, split the scene")
        for k, lim in (("features", 4), ("steps", 4), ("pricing", 5), ("ui", 3)):
            if t == k and len(s["items"]) > lim:
                die(f"scene {i}: more than {lim} items in {k}, split the scene")
        if t == "hook" and len(re.sub(r"[*]{2}", "", s["text"]).split()) > 9:
            die(f"scene {i}: hook text > 9 words")
        if t == "counter" and not isinstance(s["value"], (int, float)):
            die(f"scene {i}: counter value must be a number (real data only)")
        if t == "pricing" and not all(it.get("name") and it.get("price") for it in s["items"]):
            die(f"scene {i}: each pricing item needs name and price")
        if t == "ui" and not s.get("app"):
            die(f"scene {i}: ui needs 'app' (window title); it is drawn as a labelled illustration, never as real footage")
        if t == "chart" and not all(isinstance(p.get("value"), (int, float)) for p in s["series"]):
            die(f"scene {i}: chart series values must be numbers (real data only)")
        if not s.get("narration") and not s.get("seconds"):
            die(f"scene {i}: needs 'narration' or 'seconds'")
        if t in ASSET_FIELDS:
            used.append((i, s[ASSET_FIELDS[t]]))
    if spec.get("music"):
        used.append(("music", spec["music"]["file"]))
    if brand.get("logo"):
        used.append(("brand.logo", brand["logo"]))
    for where, f in used:
        p = os.path.normpath(os.path.join(project, f))
        if not p.startswith(os.path.normpath(project) + os.sep):
            die(f"scene {where}: asset path escapes project: {f}")
        if not os.path.isfile(p):
            die(f"scene {where}: asset missing: {f}")
        r = rights.get(f)
        if not r or not r.get("license") or not r.get("source"):
            die(f"asset {f} needs a rights entry with 'source' and 'license' (use license 'own' for your own files)")
    return meta, brand, scenes, rights


def tts_engine(lang, voice):
    if lang == "vi":
        model = os.path.expanduser("~/.local/share/piper-voices/vi_VN-vais1000-medium.onnx")
        if not os.path.isfile(model):
            die("Piper vi voice missing (references/audio.md)")

        def synth(text, wav):
            tmp = wav + ".txt"
            open(tmp, "w", encoding="utf-8").write(text)
            run([sys.executable, "-m", "piper", "-m", model, "-i", tmp, "-f", wav], capture_output=True)
            os.remove(tmp)
        return synth
    from kokoro import KPipeline
    import numpy as np, soundfile as sf
    pipe = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")

    def synth(text, wav):
        sf.write(wav, np.concatenate([a for _, _, a in pipe(text, voice=voice or "af_heart")]), 24000)
    return synth


def align(narration, words):
    """Script text is the truth; whisper only supplies timing."""
    toks = narration.split()
    if not words:
        return []
    if len(toks) == len(words):
        return [{"text": t, "startMs": w["startMs"], "endMs": w["endMs"]} for t, w in zip(toks, words)]
    a, b = words[0]["startMs"], words[-1]["endMs"]
    tot = sum(len(t) for t in toks) or 1
    out, cur = [], a
    for t in toks:
        d = (b - a) * len(t) / tot
        out.append({"text": t, "startMs": round(cur), "endMs": round(cur + d)})
        cur += d
    return out


def measure_lufs(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "loudnorm=print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    j = json.loads(r.stderr[r.stderr.rindex("{"):r.stderr.rindex("}") + 1])
    return float(j["input_i"]), float(j["input_tp"])


def build_voice(meta, scenes, app):
    import numpy as np, soundfile as sf
    from faster_whisper import WhisperModel
    synth = tts_engine(meta["lang"], meta.get("voice"))
    whisper = WhisperModel("small", compute_type="int8")
    raw = os.path.join(app, "_voice_raw")
    outdir = os.path.join(app, "public", "assets", "voice")
    for d in (raw, outdir):
        shutil.rmtree(d, ignore_errors=True)
        os.makedirs(d)
    info = []
    for i, s in enumerate(scenes, 1):
        if not s.get("narration"):
            info.append(None)
            continue
        wav = os.path.join(raw, f"s{i:02d}.wav")
        synth(s["narration"], wav)
        a, sr = sf.read(wav)
        if a.ndim > 1:
            a = a.mean(axis=1)
        sf.write(wav, np.concatenate([np.zeros(int(LEAD * sr)), a]), sr)
        segs, _ = whisper.transcribe(wav, word_timestamps=True, language=meta["lang"])
        words = [{"text": w.word.strip(), "startMs": round(w.start * 1000), "endMs": round(w.end * 1000)}
                 for sg in segs for w in sg.words if w.word.strip()]
        info.append({"wav": wav, "sec": len(a) / sr + LEAD, "words": align(s["narration"], words)})
    wavs = [x["wav"] for x in info if x]
    if not wavs:
        return info
    lst = os.path.join(raw, "list.txt")
    open(lst, "w").write("".join(f"file '{w}'\n" for w in wavs))
    cat = os.path.join(raw, "all.wav")
    run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", cat])
    lufs, _ = measure_lufs(cat)
    gain = TARGET_LUFS - lufs  # one gain for all scenes keeps relative levels
    for i, x in enumerate(info, 1):
        if x:
            dst = os.path.join(outdir, f"s{i:02d}.wav")
            run(["ffmpeg", "-loglevel", "error", "-y", "-i", x["wav"], "-af",
                 f"volume={gain:.2f}dB,alimiter=limit=0.89", "-ac", "1", "-ar", "24000", dst])
            x["file"] = f"assets/voice/s{i:02d}.wav"
    shutil.rmtree(raw)
    print(f"voice: gain {gain:+.1f} dB (raw {lufs:.1f} LUFS -> target {TARGET_LUFS})")
    return info


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--spec")
    ap.add_argument("--init", action="store_true")
    ap.add_argument("--render", action="store_true")
    ap.add_argument("--aspect")
    a = ap.parse_args()
    project = os.path.abspath(a.project)
    spec_path = a.spec or os.path.join(project, "spec.json")
    spec = json.load(open(spec_path, encoding="utf-8"))
    if a.aspect:
        spec.setdefault("meta", {})["aspect"] = a.aspect
    meta, brand, scenes, rights = validate(spec, project)
    for t in ("ffmpeg", "ffprobe", "node"):
        if not shutil.which(t):
            die(f"{t} not on PATH")
    app = os.path.join(project, "remotion")
    if a.init and not os.path.isdir(app):
        run(["npx", "--yes", "create-video@latest", "--yes", "--blank", "remotion"], cwd=project)
        run(["npm", "i", "--loglevel=error"], cwd=app)
    if not os.path.isdir(app):
        die("no remotion app: run with --init (network, needs approval)")
    tdir = os.path.join(SKILL, "templates", "video", "src")
    for f in os.listdir(tdir):
        shutil.copy(os.path.join(tdir, f), os.path.join(app, "src", f))
    for junk in ("Composition.tsx",):
        p = os.path.join(app, "src", junk)
        if os.path.exists(p):
            os.remove(p)

    nm = os.path.join(app, "node_modules")
    missing = [d for d in DEPS if not os.path.isdir(os.path.join(nm, *d.split("/")))]
    if missing:
        ver = json.load(open(os.path.join(nm, "remotion", "package.json")))["version"]
        run(["npm", "i", "--loglevel=error", "--save-exact"] + [f"{d}@{ver}" if d == "@remotion/transitions" else d for d in missing], cwd=app)
    fdir = os.path.join(app, "public", "fonts")
    os.makedirs(fdir, exist_ok=True)
    fsrc = os.path.join(nm, "@fontsource", "be-vietnam-pro", "files")
    for wgt in (500, 700, 800, 900):
        for sub in ("latin", "vietnamese"):
            n = f"be-vietnam-pro-{sub}-{wgt}-normal.woff2"
            shutil.copy(os.path.join(fsrc, n), os.path.join(fdir, n))

    # assets -> public/
    rel = [s[ASSET_FIELDS[s["type"]]] for s in scenes if s["type"] in ASSET_FIELDS]
    if spec.get("music"):
        rel.append(spec["music"]["file"])
    for f in set(rel):
        dst = os.path.join(app, "public", f)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy(os.path.join(project, f), dst)

    info = build_voice(meta, scenes, app)
    out_scenes, total = [], 0
    for i, (s, x) in enumerate(zip(scenes, info), 1):
        sec = x["sec"] + TAIL if x else float(s["seconds"])
        frames = max(MIN_BY_TYPE.get(s["type"], MIN_FRAMES), math.ceil(sec * FPS))
        if s["type"] not in ASSET_FIELDS and frames / FPS > MAX_SEC:
            die(f"scene {i}: {frames / FPS:.1f}s > {MAX_SEC:.0f}s, split it into two scenes (pace!)")
        if s["type"] == "footage":
            have = probe(os.path.join(project, s["src"]), "format=duration") - float(s.get("startFromSec", 0))
            if have < frames / FPS:
                die(f"scene {i}: footage has {have:.1f}s after startFromSec, scene needs {frames / FPS:.1f}s")
        sc = {k: v for k, v in s.items() if k not in ("narration", "seconds")}
        sc.update(frames=frames, words=x["words"] if x else [], **({"audio": x["file"]} if x else {}))
        out_scenes.append(sc)
        total += frames
    w, h = ASPECTS[meta.get("aspect", "9:16")]
    total -= (len(out_scenes) - 1) * TFRAMES  # transitions overlap scenes
    resolved = {"width": w, "height": h, "fps": FPS, "totalFrames": total, "transitionFrames": TFRAMES,
                "sfx": bool(meta.get("sfx", True)), "captions": bool(meta.get("captions", True)),
                "brand": brand, "scenes": out_scenes}
    gen = []
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import audio_assets
    style = meta.get("music", "tech")
    if spec.get("music"):
        resolved["music"] = {"src": spec["music"]["file"], "volume": float(spec["music"].get("volume", 0.1))}
    elif style != "none":
        resolved["music"] = {"src": "assets/music/bed.wav", "volume": float(meta.get("musicVolume", 0.12))}
        gen.append(f"music bed '{style}' (generated by scripts/audio_assets.py, own)")
    if "music" in resolved and not spec.get("music") or resolved["sfx"]:
        audio_assets.build(os.path.join(app, "public", "assets"), total / FPS + 3, style if style != "none" else "tech",
                           with_music="music" in resolved and not spec.get("music"))
    if resolved["sfx"]:
        gen.append("sfx whoosh/hit (generated by scripts/audio_assets.py, own)")
    if brand.get("logo"):
        dst = os.path.join(app, "public", brand["logo"])
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy(os.path.join(project, brand["logo"]), dst)
    json.dump(resolved, open(os.path.join(app, "src", "resolved.json"), "w"), ensure_ascii=False, indent=1)
    if subprocess.run(["npx", "tsc", "--noEmit"], cwd=app).returncode:
        die("typecheck failed")
    slug = re.sub(r"[^a-z0-9]+", "-", meta["title"].lower()).strip("-") or "video"
    mp4 = os.path.join(project, "out", f"{slug}-{w}x{h}.mp4")
    print(f"OK: {len(out_scenes)} scenes, {total / FPS:.1f}s, {w}x{h}")
    if not a.render:
        print(f"WAITING REVIEW. Preview: cd {app} && npm run dev\nRender:  re-run with --render -> {mp4}")
        return
    os.makedirs(os.path.dirname(mp4), exist_ok=True)
    run(["npx", "remotion", "render", "src/index.ts", "Video", mp4, f"--port={free_port()}"], cwd=app)
    qc(mp4, resolved, spec, spec_path, rights, project, w, h, gen)


def qc(mp4, resolved, spec, spec_path, rights, project, w, h, gen):
    problems, lines = [], []
    if not os.path.isfile(mp4) or os.path.getsize(mp4) == 0:
        die("render produced no file")
    size = run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=s=x:p=0", mp4],
               capture_output=True).stdout.strip()
    dur = probe(mp4, "format=duration")
    want = resolved["totalFrames"] / resolved["fps"]
    if size != f"{w}x{h}":
        problems.append(f"size {size} != {w}x{h}")
    if abs(dur - want) > 0.2:
        problems.append(f"duration {dur:.2f}s != {want:.2f}s")
    has_audio = bool(run(["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_name", "-of", "csv=p=0", mp4],
                         capture_output=True).stdout.strip())
    lufs = tp = None
    if has_audio:
        lufs, tp = measure_lufs(mp4)
        if not -19 <= lufs <= -13:
            problems.append(f"loudness {lufs:.1f} LUFS outside -19..-13")
        if tp > -0.9:
            problems.append(f"true peak {tp:.1f} dBTP > -1")
    elif any(s.get("audio") for s in resolved["scenes"]):
        problems.append("narration planned but MP4 has no audio stream")
    qcdir = os.path.join(project, "out", "qc")
    shutil.rmtree(qcdir, ignore_errors=True)
    os.makedirs(qcdir)
    t, T = 0.0, resolved["transitionFrames"]
    for i, s in enumerate(resolved["scenes"], 1):
        d = s["frames"] / resolved["fps"]
        for tag, k in (("a", 0.35), ("b", 0.8)):
            run(["ffmpeg", "-loglevel", "error", "-y", "-ss", f"{t + d * k:.2f}", "-i", mp4, "-frames:v", "1", os.path.join(qcdir, f"scene-{i:02d}{tag}.png")])
        t += (s["frames"] - T) / resolved["fps"]
    n = 2 * len(resolved["scenes"])
    cols = min(n, 4)
    run(["ffmpeg", "-loglevel", "error", "-y", "-pattern_type", "glob", "-i", os.path.join(qcdir, "scene-*.png"),
         "-vf", f"scale=270:-1,tile={cols}x{math.ceil(n / cols)}", "-frames:v", "1", os.path.join(qcdir, "contact-sheet.png")])
    rel = os.path.join(project, "out", "RELEASE.md")
    used = [r for r in spec.get("rights", [])]
    with open(rel, "w", encoding="utf-8") as f:
        f.write(f"# Release record\n\n- file: `{os.path.basename(mp4)}`\n- size/duration: {size}, {dur:.2f}s\n"
                f"- loudness: {lufs and round(lufs, 1)} LUFS, true peak {tp and round(tp, 1)} dBTP\n"
                f"- spec sha256: {hashlib.sha256(open(spec_path, 'rb').read()).hexdigest()[:16]}\n"
                f"- voice: {spec['meta']['lang']} (vi: Piper vi_VN-vais1000 CC BY 4.0, credit VAIS-1000; en: Kokoro Apache-2.0)\n\n"
                f"## Assets and rights\n" + ("".join(f"- {r['file']}: {r['license']} ({r['source']})\n" for r in used) or "- no external assets\n") +
                "".join(f"- {g}\n" for g in gen) +
                "- font Be Vietnam Pro (OFL-1.1, @fontsource); icons lucide-react (ISC); transitions @remotion/transitions\n" +
                f"\n## QC\n" + ("".join(f"- PROBLEM: {p}\n" for p in problems) or "- automatic checks PASS\n") +
                "- HUMAN CHECKS STILL REQUIRED: watch `out/qc/contact-sheet.png`, listen to full audio, fact-check every claim and number.\n")
    if problems:
        die("; ".join(problems) + f" (see {rel})")
    print(f"PASS: {mp4}\n  {size} {dur:.1f}s {lufs and round(lufs, 1)} LUFS\n  contact sheet: {qcdir}/contact-sheet.png\n  {rel}")


if __name__ == "__main__":
    main()
