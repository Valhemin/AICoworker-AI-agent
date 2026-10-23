/**
 * Phase 1 — vertical quote / tip. Suggested: 1080x1920, durationInFrames 450 (15s) @ 30fps.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AudioTracks } from "../AudioTracks";

export type QuoteShortProps = {
  quote: string;
  attribution: string;
  accent: string;
  background: string;
  text: string;
  /** Optional: voice-over and music, files under public/ (e.g. "assets/voice.wav"). */
  audioSrc?: string;
  musicSrc?: string;
  musicVolume?: number;
};

export const QuoteShort: React.FC<QuoteShortProps> = ({
  quote,
  attribution,
  accent,
  background,
  text,
  audioSrc,
  musicSrc,
  musicVolume,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const inSpring = spring({ frame, fps, config: { damping: 16 } });
  const outOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bar = spring({ frame: frame - 8, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background,
        color: text,
        justifyContent: "center",
        padding: 72,
        fontFamily:
          'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
        opacity: outOpacity,
      }}
    >
      <div
        style={{
          width: 72,
          height: 6,
          background: accent,
          borderRadius: 99,
          marginBottom: 28,
          transform: `scaleX(${bar})`,
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          lineHeight: 1.2,
          opacity: inSpring,
          transform: `translateY(${(1 - inSpring) * 28}px)`,
        }}
      >
        {quote}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 24,
          opacity: interpolate(frame, [25, 40], [0, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {attribution}
      </div>
      <AudioTracks audioSrc={audioSrc} musicSrc={musicSrc} musicVolume={musicVolume} />
    </AbsoluteFill>
  );
};
