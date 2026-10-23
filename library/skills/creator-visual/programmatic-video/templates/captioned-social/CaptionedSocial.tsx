/**
 * Phase 2 — footage + karaoke captions. Register: id "CaptionedSocial", fps 30, 1080x1920,
 * durationInFrames = round(videoSeconds * 30). Set via calculateMetadata or measure with ffprobe.
 * Video: <remotion-app>/public/<videoSrc>. Captions: JSON array of {text,startMs,endMs}
 * (word level) — make it with scripts/whisper_to_captions.py, import it and pass as props.captions.
 */
import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type CaptionWord = { text: string; startMs: number; endMs: number };

export type CaptionedSocialProps = {
  videoSrc: string;
  captions: CaptionWord[];
  accent: string;
  text: string;
  /** Words shown per caption page. */
  wordsPerPage: number;
  /** Keep captions clear of TikTok/Reels UI (px from bottom). */
  safeBottom: number;
};

export const CaptionedSocial: React.FC<CaptionedSocialProps> = ({
  videoSrc,
  captions,
  accent,
  text,
  wordsPerPage,
  safeBottom,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;

  const size = Math.max(1, wordsPerPage);
  // Page = group of `size` words; show the page holding the current (or last spoken) word.
  let idx = captions.findIndex((w) => nowMs >= w.startMs && nowMs < w.endMs);
  if (idx === -1) {
    idx = captions.findIndex((w) => w.startMs > nowMs) - 1;
    if (idx < 0 && captions.length && nowMs >= captions[captions.length - 1].endMs) {
      idx = captions.length - 1;
    }
  }
  const pageStart = idx < 0 ? -1 : Math.floor(idx / size) * size;
  const page = pageStart < 0 ? [] : captions.slice(pageStart, pageStart + size);
  // Hide page if the gap after its last word is long (silence).
  const last = page[page.length - 1];
  const visible = page.length > 0 && nowMs < last.endMs + 600;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile(videoSrc)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {visible && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: safeBottom,
            paddingLeft: 64,
            paddingRight: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px 16px",
              fontFamily: 'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
              fontSize: 64,
              fontWeight: 900,
              textAlign: "center",
              textShadow: "0 4px 16px rgba(0,0,0,.85)",
            }}
          >
            {page.map((w, i) => {
              const active = nowMs >= w.startMs && nowMs < w.endMs;
              return (
                <span
                  key={`${pageStart + i}-${w.startMs}`}
                  style={{
                    color: active ? accent : text,
                    transform: `scale(${active ? 1.12 : 1})`,
                  }}
                >
                  {w.text}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
