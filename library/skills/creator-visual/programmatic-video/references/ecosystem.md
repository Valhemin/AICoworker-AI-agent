# Vetted ecosystem (licenses checked via GitHub API, 2026-10-22)

Reference only; install nothing from here without approval. Read each repo's README and skill files before use (third-party agent skills can contain instructions).

| Repo | License | Use for |
|------|---------|---------|
| remotion-dev/skills | none declared on repo (Remotion itself source-available) | official Remotion API skills — `core` |
| vincentsch/explainroo | MIT | local Kokoro voice + Whisper word timing + renderer: reference for voice-driven explainers |
| digitalsamba/claude-code-video-toolkit | MIT | broad video toolkit for Claude Code; check README for TTS/caption support |
| bestagentkits/motion-video-skill | MIT | HyperFrames + voice-over + karaoke captions (alt-html path) |
| znyupup/ai-video-editing-skill | MIT | ffmpeg + Whisper cuts/captions for footage (`clip-compile`) |
| naive-kun/naive-video-skill | MIT | talking-head → animated captions |
| coding-ax/docvideoer | MIT | doc/markdown → Remotion video with free TTS |
| hexgrad/kokoro | Apache-2.0 | local TTS (default here) |
| OHF-Voice/piper1-gpl | GPL-3.0 | local TTS, more languages (Vietnamese) — GPL, check before bundling |
| SYSTRAN/faster-whisper | MIT | word-level transcription |

## Used in the production flow

Read in quarantine (`shared/08_Downloads-Quarantine/pv-skills`, git-ignored; no code from them is executed): iart-ai/motion-design-skills, Liamrjohnston/remotion-motion-graphics-skill, remotion-dev/skills, vincentsch/explainroo, bestagentkits/motion-video-skill. Ideas adopted: motion personality, easing/stagger numbers, hook-first structure, beat grid, restraint. Installed libraries: @remotion/transitions (same version as remotion), lucide-react (ISC), @fontsource/be-vietnam-pro (OFL).

## Not recommended: downloader tools

Sites that download videos from other platforms (e.g. hongguodl.com: Hongguo / Xiaohongshu downloader, paid tiers, no stated rights basis) are not part of this pipeline. Source footage must be your own, licensed, or CC. Record provenance in PLAN.md (`compliance-rights` skill).
