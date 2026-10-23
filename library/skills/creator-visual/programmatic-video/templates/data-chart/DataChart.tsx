/**
 * Phase 3 starter — animated horizontal bars from props.series.
 * Register: id "DataChart", fps 30, durationInFrames >= 60 + series.length * 8 + 60 (hold) — e.g. 240 (8s).
 * For dataset-batch: loop renderMedia() over CSV rows (see Remotion dataset-render docs).
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

export type DataPoint = { label: string; value: number };

export type DataChartProps = {
  title: string;
  unit: string;
  series: DataPoint[];
  accent: string;
  background: string;
  text: string;
  /** Bar track color; pick one that contrasts with `background`. */
  track: string;
  /** Optional: voice-over and music, files under public/ (e.g. "assets/voice.wav"). */
  audioSrc?: string;
  musicSrc?: string;
  musicVolume?: number;
};

export const DataChart: React.FC<DataChartProps> = ({
  title,
  unit,
  series,
  accent,
  background,
  text,
  track,
  audioSrc,
  musicSrc,
  musicVolume,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...series.map((s) => s.value), 1);
  const titleIn = spring({ frame, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill
      style={{
        background,
        color: text,
        padding: 72,
        fontFamily:
          'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          opacity: titleIn,
        }}
      >
        {title}
      </div>
      <div style={{ marginTop: 8, opacity: 0.7, fontSize: 22 }}>{unit}</div>

      <div
        style={{
          marginTop: 48,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {series.map((point, i) => {
          const local = spring({
            frame: frame - (18 + i * 8),
            fps,
            config: { damping: 14 },
          });
          const widthPct =
            interpolate(local, [0, 1], [0, (point.value / max) * 100]);
          return (
            <div key={point.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                <span>{point.label}</span>
                <span>
                  {point.value} {unit}
                </span>
              </div>
              <div
                style={{
                  height: 18,
                  borderRadius: 99,
                  background: track,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${widthPct}%`,
                    height: "100%",
                    background: accent,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <AudioTracks audioSrc={audioSrc} musicSrc={musicSrc} musicVolume={musicVolume} />
    </AbsoluteFill>
  );
};
