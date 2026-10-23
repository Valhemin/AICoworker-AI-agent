/**
 * Phase 1 — product ad (copy into a Remotion project).
 * Register: id "ProductAd", fps 30, durationInFrames 900 (30s), 1080x1920 or 1920x1080.
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

export type ProductAdProps = {
  productName: string;
  tagline: string;
  features: string[];
  cta: string;
  accent: string;
  background: string;
  text: string;
  logoText: string;
  /** CTA button label color; must contrast with `accent`. */
  ctaText: string;
  /** Optional: voice-over and music, files under public/ (e.g. "assets/voice.wav"). */
  audioSrc?: string;
  musicSrc?: string;
  musicVolume?: number;
};

export const ProductAd: React.FC<ProductAdProps> = ({
  productName,
  tagline,
  features,
  cta,
  accent,
  background,
  text,
  logoText,
  ctaText,
  audioSrc,
  musicSrc,
  musicVolume,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoIn = spring({ frame, fps, config: { damping: 18 } });
  const titleIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16 },
  });
  const tagIn = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16 },
  });

  const featureStart = 50;
  const ctaStart = 50 + features.length * 28 + 20;

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background,
        color: text,
        fontFamily:
          'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
        padding: isVertical ? 72 : 96,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: logoIn,
          transform: `translateY(${(1 - logoIn) * 24}px)`,
          fontSize: 28,
          letterSpacing: 6,
          fontWeight: 700,
          color: accent,
          marginBottom: 28,
        }}
      >
        {logoText}
      </div>

      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 36}px)`,
          fontSize: isVertical ? 64 : 72,
          fontWeight: 800,
          lineHeight: 1.05,
          maxWidth: 900,
        }}
      >
        {productName}
      </div>

      <div
        style={{
          opacity: Math.min(tagIn, 0.92),
          transform: `translateY(${(1 - tagIn) * 20}px)`,
          marginTop: 20,
          fontSize: isVertical ? 28 : 32,
          maxWidth: 820,
          lineHeight: 1.35,
        }}
      >
        {tagline}
      </div>

      <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 18 }}>
        {features.map((feature, i) => {
          const local = spring({
            frame: frame - (featureStart + i * 28),
            fps,
            config: { damping: 14 },
          });
          return (
            <div
              key={feature}
              style={{
                opacity: local,
                transform: `translateX(${(1 - local) * 40}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: isVertical ? 26 : 30,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: accent,
                  flexShrink: 0,
                }}
              />
              {feature}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 64,
          opacity: ctaOpacity,
          alignSelf: "flex-start",
          background: accent,
          color: ctaText,
          padding: "18px 28px",
          borderRadius: 14,
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        {cta}
      </div>
      <AudioTracks audioSrc={audioSrc} musicSrc={musicSrc} musicVolume={musicVolume} />
    </AbsoluteFill>
  );
};
