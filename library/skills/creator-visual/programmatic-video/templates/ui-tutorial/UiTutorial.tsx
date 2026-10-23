/**
 * Phase 1 — UI tutorial. durationInFrames ≈ intro(45) + steps * secondsPerStep * fps.
 * Register: id "UiTutorial", fps 30, e.g. 3 steps x 4s => 45 + 3*4*30 = 405 frames.
 * Screenshots: props path "assets/step-1.png" resolves via staticFile to <remotion-app>/public/assets/step-1.png.
 */
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AudioTracks } from "../AudioTracks";

export type TutorialStep = {
  title: string;
  body: string;
  screenshot: string;
};

export type UiTutorialProps = {
  title: string;
  steps: TutorialStep[];
  accent: string;
  background: string;
  text: string;
  secondsPerStep: number;
  /** Optional: voice-over and music, files under public/ (e.g. "assets/voice.wav"). */
  audioSrc?: string;
  musicSrc?: string;
  musicVolume?: number;
};

const resolveSrc = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleaned = path
    .replace(/^\.?\/?public\//, "")
    .replace(/^\.\//, "");
  return staticFile(cleaned);
};

export const UiTutorial: React.FC<UiTutorialProps> = ({
  title,
  steps,
  accent,
  background,
  text,
  secondsPerStep,
  audioSrc,
  musicSrc,
  musicVolume,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;
  const introFrames = 45;
  const stepFrames = Math.max(1, Math.round(secondsPerStep * fps));

  const intro = spring({ frame, fps, config: { damping: 16 } });

  if (steps.length === 0) {
    throw new Error("UiTutorial: props.steps must have at least one step");
  }

  if (frame < introFrames) {
    return (
      <AbsoluteFill
        style={{
          background,
          color: text,
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            opacity: intro,
            transform: `scale(${0.94 + intro * 0.06})`,
            fontSize: isVertical ? 48 : 56,
            fontWeight: 800,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <AudioTracks audioSrc={audioSrc} musicSrc={musicSrc} musicVolume={musicVolume} />
      </AbsoluteFill>
    );
  }

  const localFrame = frame - introFrames;
  const index = Math.min(steps.length - 1, Math.floor(localFrame / stepFrames));
  const within = localFrame % stepFrames;
  const step = steps[index];
  const appear = spring({ frame: within, fps, config: { damping: 14 } });
  const progress = interpolate(within, [0, stepFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background,
        color: text,
        fontFamily:
          'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
        padding: isVertical ? 48 : 64,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>
        Step {index + 1} / {steps.length}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: isVertical ? 40 : 44,
          fontWeight: 800,
          opacity: appear,
        }}
      >
        {step.title}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          lineHeight: 1.4,
          maxWidth: 720,
          opacity: appear * 0.9,
        }}
      >
        {step.body}
      </div>

      <div
        style={{
          marginTop: 28,
          flex: 1,
          borderRadius: 20,
          overflow: "hidden",
          border: `2px solid ${accent}33`,
          background: "#0F172A0D",
          opacity: appear,
          transform: `translateY(${(1 - appear) * 24}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={resolveSrc(step.screenshot)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 18,
          height: 6,
          borderRadius: 99,
          background: "#CBD5E1",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: accent,
          }}
        />
      </div>
      <AudioTracks audioSrc={audioSrc} musicSrc={musicSrc} musicVolume={musicVolume} />
    </AbsoluteFill>
  );
};
