/**
 * Scene-based video, driven by resolved.json (written by scripts/make_video.py).
 * Scene types: hook, kinetic, title, bullets, ui, counter, features, steps, pricing,
 * screenshot, chart, quote, footage, image, cta.
 * Add a type: component below + SCENES entry + required fields in make_video.py TYPES.
 * Motion language (one personality): entrances ease-out expo / springs, 40-80ms stagger, one transition family.
 */
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import * as Lucide from "lucide-react";
import type { Brand, Resolved, Scene } from "./types";

const FONT = '"BeVN", ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif';
const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const OUT = Easing.bezier(0.16, 1, 0.3, 1);

// ---------- fonts (Be Vietnam Pro, OFL, copied to public/fonts by make_video.py) ----------
const RANGE = {
  latin: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  vietnamese: "U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB",
};
let fontsPromise: Promise<unknown> | null = null;
const loadFonts = () => {
  if (!fontsPromise) {
    const jobs: Promise<unknown>[] = [];
    [500, 700, 800, 900].forEach((w) =>
      (["latin", "vietnamese"] as const).forEach((sub) => {
        const f = new FontFace("BeVN", `url(${staticFile(`fonts/be-vietnam-pro-${sub}-${w}-normal.woff2`)})`, {
          weight: String(w),
          unicodeRange: RANGE[sub],
        });
        jobs.push(f.load().then(() => document.fonts.add(f)));
      }),
    );
    fontsPromise = Promise.all(jobs);
  }
  return fontsPromise;
};
const useFonts = () => {
  const [handle] = useState(() => delayRender("Loading Be Vietnam Pro"));
  useEffect(() => {
    loadFonts().then(() => continueRender(handle)).catch((e) => cancelRender(e));
  }, [handle]);
};

// ---------- helpers ----------
type P = { s: Scene; b: Brand; v: boolean };

const useSc = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps };
};
const enter = (frame: number, at: number, dur = 16) =>
  interpolate(frame, [at, at + dur], [0, 1], { ...CLAMP, easing: OUT });

const Icon: React.FC<{ name: string; size: number; color: string }> = ({ name, size, color }) => {
  const C = (Lucide as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>>)[name] ?? Lucide.Sparkles;
  return <C size={size} color={color} strokeWidth={2.4} />;
};

const Center: React.FC<{ children: React.ReactNode; v: boolean; pad?: number }> = ({ children, v, pad }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: pad ?? (v ? 64 : 120), fontFamily: FONT }}>
    {children}
  </div>
);

const parseMarked = (t: string) => {
  const out: { w: string; hi: boolean }[] = [];
  t.split(/(\*\*.+?\*\*)/).forEach((seg) => {
    const hi = seg.startsWith("**");
    (hi ? seg.slice(2, -2) : seg).split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, hi }));
  });
  return out;
};

const speakWindow = (s: Scene, fps: number) => ({
  t0: s.words.length ? (s.words[0].startMs / 1000) * fps : 6,
  t1: s.words.length ? (s.words[s.words.length - 1].endMs / 1000) * fps : s.frames * 0.6,
});

// ---------- kinetic words synced to the narration ----------
const Words: React.FC<{ s: Scene; b: Brand; size: number }> = ({ s, b, size }) => {
  const { frame, fps } = useSc();
  const toks = parseMarked(s.text);
  const { t0, t1 } = speakWindow(s, fps);
  const span = Math.max(12, (t1 - t0) * 0.85);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: `${size * 0.1}px ${size * 0.26}px`, fontSize: size, fontWeight: 900, lineHeight: 1.04, textAlign: "center", color: b.text }}>
      {toks.map((t, i) => {
        const at = t0 + (i / Math.max(1, toks.length)) * span;
        const p = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 180, mass: 0.6 } });
        return (
          <span key={i} style={{ display: "inline-block", opacity: interpolate(frame, [at, at + 4], [0, 1], CLAMP), transform: `translateY(${(1 - p) * 44}px) scale(${0.7 + 0.3 * p})`, color: t.hi ? b.accent : b.text, textShadow: t.hi ? `0 0 48px ${b.accent}77` : "none" }}>
            {t.w}
          </span>
        );
      })}
    </div>
  );
};

const Hook: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const flash = interpolate(frame, [0, 9], [0.85, 0], CLAMP);
  const punch = interpolate(frame, [0, 20], [1.14, 1], { ...CLAMP, easing: OUT });
  return (
    <Center v={v}>
      <div style={{ transform: `scale(${punch})` }}>
        <Words s={s} b={b} size={v ? 136 : 124} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: b.accent, opacity: flash * 0.55, pointerEvents: "none" }} />
    </Center>
  );
};

const Kinetic: React.FC<P> = ({ s, b, v }) => (
  <Center v={v}>
    <Words s={s} b={b} size={v ? 104 : 96} />
  </Center>
);

const Logo: React.FC<{ b: Brand; size: number; delay?: number }> = ({ b, size, delay = 0 }) => {
  const { frame, fps } = useSc();
  if (!b.logo) return null;
  const a = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  return <Img src={staticFile(b.logo)} style={{ width: size, height: size, opacity: a, transform: `scale(${0.6 + 0.4 * a}) rotate(${(1 - a) * -12}deg)`, filter: `drop-shadow(0 0 ${size / 4}px ${b.accent}66)` }} />;
};

const Title: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const a = enter(frame, 0, 22);
  const c = enter(frame, 10, 22);
  return (
    <Center v={v}>
      <Logo b={b} size={v ? 180 : 200} />
      <div style={{ marginTop: b.logo ? 36 : 0, opacity: a, transform: `translateY(${(1 - a) * 40}px)`, fontSize: v ? 96 : 100, fontWeight: 900, lineHeight: 1.05, color: b.text, textAlign: "center", maxWidth: v ? 940 : 1500 }}>{s.title}</div>
      {s.subtitle ? <div style={{ opacity: c, marginTop: 24, fontSize: v ? 40 : 44, fontWeight: 500, color: b.accent, textAlign: "center", maxWidth: v ? 900 : 1500 }}>{s.subtitle}</div> : null}
    </Center>
  );
};

const Bullets: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const items: string[] = s.items;
  const stagger = Math.max(8, Math.floor((s.frames * 0.5) / items.length));
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1500 }}>
        <div style={{ fontSize: v ? 68 : 68, fontWeight: 900, color: b.text, marginBottom: 48, opacity: enter(frame, 0) }}>{s.heading}</div>
        {items.map((it, i) => {
          const a = spring({ frame: frame - (12 + i * stagger), fps, config: { damping: 14 } });
          return (
            <div key={i} style={{ opacity: a, transform: `translateX(${(1 - a) * 50}px)`, display: "flex", gap: 24, alignItems: "flex-start", fontSize: v ? 46 : 46, fontWeight: 700, color: b.text, marginBottom: 30, lineHeight: 1.25 }}>
              <span style={{ width: 18, height: 18, borderRadius: 99, background: b.accent, flexShrink: 0, marginTop: 18, boxShadow: `0 0 20px ${b.accent}` }} />
              {it}
            </div>
          );
        })}
      </div>
    </Center>
  );
};

// ---------- simulated app UI (labelled as illustration) ----------
const Ui: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const url: string = s.url;
  const items: { name: string; meta?: string }[] = s.items;
  const win = spring({ frame, fps, config: { damping: 16 } });
  const t0 = 16;
  const t1 = t0 + Math.min(70, url.length * 1.5);
  const chars = Math.floor(interpolate(frame, [t0, t1], [0, url.length], CLAMP));
  const press = Math.round(t1 + 12);
  const btn = interpolate(frame, [press, press + 4, press + 10], [1, 0.92, 1], CLAMP);
  const rowAt = press + 8;
  const span = Math.max(30, s.frames - rowAt - 40);
  const done = interpolate(frame, [rowAt + span, rowAt + span + 10], [0, 1], CLAMP);
  const W = v ? 984 : 1300;
  return (
    <Center v={v}>
      <div style={{ width: W, opacity: win, transform: `translateY(${(1 - win) * 50}px) scale(${0.96 + 0.04 * win})`, background: b.track, border: `2px solid ${b.accent}44`, borderRadius: 32, boxShadow: `0 40px 120px ${b.accent2}44`, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "22px 28px", background: `${b.background}99` }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 18, height: 18, borderRadius: 99, background: c }} />)}
          <span style={{ marginLeft: 16, fontSize: 28, fontWeight: 700, color: b.text, opacity: 0.7 }}>{s.app ?? ""}</span>
        </div>
        <div style={{ padding: 44 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, background: b.background, border: `2px solid ${b.accent}77`, borderRadius: 20, padding: "22px 26px", marginBottom: 22 }}>
            <Lucide.Link size={36} color={b.accent} strokeWidth={2.4} />
            <span style={{ fontSize: 36, fontWeight: 500, color: b.text, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', whiteSpace: "nowrap", overflow: "hidden" }}>
              {url.slice(0, chars)}
              {frame < press && Math.floor(frame / 8) % 2 === 0 ? "▍" : ""}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, background: b.accent, color: b.ctaText, borderRadius: 20, padding: "30px 0", fontSize: 48, fontWeight: 800, transform: `scale(${btn})`, boxShadow: `0 0 ${interpolate(frame, [press, press + 6, press + 20], [0, 50, 0], CLAMP)}px ${b.accent}` }}>
            <Lucide.Download size={40} strokeWidth={2.8} />
            {s.button}
          </div>
          <div style={{ marginTop: 30 }}>
            {items.map((it, i) => {
              const a = enter(frame, rowAt + i * 6, 10);
              const st = rowAt + i * span * 0.16;
              const p = interpolate(frame, [st, st + span * 0.75], [0, 1], { ...CLAMP, easing: Easing.out(Easing.quad) });
              return (
                <div key={i} style={{ opacity: a, transform: `translateY(${(1 - a) * 20}px)`, marginBottom: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 38, fontWeight: 700, color: b.text, marginBottom: 12 }}>
                    <span>{it.name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.85 }}>
                      {it.meta ? <span style={{ fontSize: 26, fontWeight: 500, opacity: 0.7 }}>{it.meta}</span> : null}
                      {p >= 1 ? <Lucide.Check size={34} color={b.accent} strokeWidth={3.2} /> : `${Math.round(p * 100)}%`}
                    </span>
                  </div>
                  <div style={{ height: 18, borderRadius: 99, background: b.background, overflow: "hidden" }}>
                    <div style={{ width: `${p * 100}%`, height: "100%", background: `linear-gradient(90deg, ${b.accent2}, ${b.accent})` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {s.doneLabel ? <div style={{ marginTop: 8, opacity: done, fontSize: 42, fontWeight: 800, color: b.accent, textAlign: "center" }}>✓ {s.doneLabel}</div> : null}
        </div>
      </div>
      <div style={{ marginTop: 26, fontSize: 24, fontWeight: 500, color: b.text, opacity: 0.5 }}>Minh họa giao diện</div>
    </Center>
  );
};

const Counter: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const dec = s.decimals ?? 0;
  const val = interpolate(frame, [8, 55], [0, s.value], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  const a = enter(frame, 0, 14);
  const bar = enter(frame, 40, 24);
  const text = `${s.prefix ?? ""}${val.toLocaleString("vi-VN", { minimumFractionDigits: dec, maximumFractionDigits: dec })}${s.suffix ?? ""}`;
  return (
    <Center v={v}>
      <div style={{ opacity: a, fontSize: v ? 230 : 210, fontWeight: 900, lineHeight: 1, color: b.accent, fontVariantNumeric: "tabular-nums", textShadow: `0 0 80px ${b.accent}66`, textAlign: "center", transform: `scale(${0.9 + 0.1 * a})` }}>{text}</div>
      <div style={{ width: 220 * bar, height: 8, borderRadius: 99, background: `linear-gradient(90deg, ${b.accent2}, ${b.accent})`, margin: "36px 0" }} />
      <div style={{ opacity: enter(frame, 30), fontSize: v ? 56 : 54, fontWeight: 800, color: b.text, textAlign: "center", maxWidth: v ? 900 : 1400, lineHeight: 1.2 }}>{s.label}</div>
    </Center>
  );
};

const Features: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const items: { icon: string; title: string; desc: string }[] = s.items;
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1500 }}>
        <div style={{ fontSize: 66, fontWeight: 900, color: b.text, marginBottom: 40, opacity: enter(frame, 0) }}>{s.heading}</div>
        <div style={{ display: "grid", gridTemplateColumns: v ? "1fr" : "1fr 1fr", gap: 26 }}>
          {items.map((it, i) => {
            const a = spring({ frame: frame - (8 + i * 7), fps, config: { damping: 13 } });
            return (
              <div key={i} style={{ opacity: a, transform: `translateY(${(1 - a) * 40 + Math.sin((frame + i * 14) / 22) * 4}px) scale(${0.94 + 0.06 * a})`, display: "flex", alignItems: "center", gap: 30, background: b.track, border: `2px solid ${b.accent}33`, borderRadius: 34, padding: "38px 40px" }}>
                <div style={{ width: 116, height: 116, borderRadius: 30, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${b.accent}, ${b.accent2})` }}>
                  <Icon name={it.icon} size={62} color={b.ctaText} />
                </div>
                <div>
                  <div style={{ fontSize: 52, fontWeight: 800, color: b.text, lineHeight: 1.15 }}>{it.title}</div>
                  <div style={{ fontSize: 34, fontWeight: 500, color: b.text, opacity: 0.75, marginTop: 6, lineHeight: 1.25 }}>{it.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Center>
  );
};

const Steps: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const items: { title: string; desc?: string }[] = s.items;
  const { t0, t1 } = speakWindow(s, fps);
  const gap = Math.max(10, (t1 - t0) / items.length);
  const at = (i: number) => t0 + i * gap * 0.9 - 6;
  const line = interpolate(frame, [at(0), at(items.length - 1) + 10], [0, 1], CLAMP);
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1500 }}>
        <div style={{ fontSize: 66, fontWeight: 900, color: b.text, marginBottom: 50, opacity: enter(frame, 0) }}>{s.heading}</div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 52, top: 55, width: 6, height: `calc(${line * 100}% - 110px)`, background: `linear-gradient(${b.accent}, ${b.accent2})`, borderRadius: 99 }} />
          {items.map((it, i) => {
            const a = spring({ frame: frame - at(i), fps, config: { damping: 13 } });
            const active = frame >= at(i) && (i === items.length - 1 || frame < at(i + 1));
            return (
              <div key={i} style={{ position: "relative", display: "flex", gap: 36, alignItems: "flex-start", marginBottom: 64, transform: `translateX(${(1 - a) * 60}px)` }}>
                <div style={{ width: 110, height: 110, borderRadius: 99, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, fontWeight: 900, background: active ? b.accent : b.background, color: active ? b.ctaText : b.text, border: `4px solid ${b.accent}`, boxShadow: active ? `0 0 44px ${b.accent}88` : "none", opacity: a, transform: `scale(${0.7 + 0.3 * a})` }}>{i + 1}</div>
                <div style={{ paddingTop: 8, opacity: a * (active ? 1 : 0.7) }}>
                  <div style={{ fontSize: 58, fontWeight: 800, color: b.text, lineHeight: 1.15 }}>{it.title}</div>
                  {it.desc ? <div style={{ fontSize: 36, fontWeight: 500, color: b.text, opacity: 0.75, marginTop: 8, lineHeight: 1.25 }}>{it.desc}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Center>
  );
};

const Pricing: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const items: { name: string; price: string; note?: string; highlight?: boolean; badge?: string }[] = s.items;
  const { t0 } = speakWindow(s, fps);
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1500 }}>
        <div style={{ fontSize: 66, fontWeight: 900, color: b.text, marginBottom: 34, opacity: enter(frame, 0) }}>{s.heading}</div>
        {items.map((it, i) => {
          const a = spring({ frame: frame - (t0 + i * 14), fps, config: { damping: 14 } });
          return (
            <div key={i} style={{ position: "relative", opacity: a, transform: `translateX(${(1 - a) * 70}px)`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, background: it.highlight ? `linear-gradient(135deg, ${b.track}, ${b.accent2}55)` : b.track, border: `${it.highlight ? 4 : 2}px solid ${it.highlight ? b.accent : `${b.accent}33`}`, boxShadow: it.highlight ? `0 0 60px ${b.accent}44` : "none", borderRadius: 30, padding: "34px 38px", marginBottom: 26 }}>
              {it.badge ? <span style={{ position: "absolute", top: -18, right: 28, background: b.accent, color: b.ctaText, fontSize: 24, fontWeight: 800, padding: "4px 18px", borderRadius: 99 }}>{it.badge}</span> : null}
              <div>
                <div style={{ fontSize: 50, fontWeight: 800, color: b.text }}>{it.name}</div>
                {it.note ? <div style={{ fontSize: 31, fontWeight: 500, color: b.text, opacity: 0.75, marginTop: 4 }}>{it.note}</div> : null}
              </div>
              <div style={{ fontSize: 68, fontWeight: 900, color: it.highlight ? b.accent : b.text, whiteSpace: "nowrap" }}>{it.price}</div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};

const Chart: React.FC<P> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const series: { label: string; value: number }[] = s.series;
  const max = Math.max(...series.map((x) => x.value), 1);
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1500 }}>
        <div style={{ fontSize: 62, fontWeight: 900, color: b.text }}>{s.heading}</div>
        <div style={{ fontSize: 30, color: b.text, opacity: 0.7, margin: "8px 0 40px" }}>{s.unit}</div>
        {series.map((p, i) => {
          const a = spring({ frame: frame - (14 + i * 8), fps, config: { damping: 14 } });
          return (
            <div key={p.label} style={{ marginBottom: 26 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 36, fontWeight: 700, color: b.text, marginBottom: 8 }}>
                <span>{p.label}</span>
                <span>{p.value} {s.unit}</span>
              </div>
              <div style={{ height: 22, borderRadius: 99, background: b.track, overflow: "hidden" }}>
                <div style={{ width: `${a * (p.value / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${b.accent2}, ${b.accent})` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};

const Quote: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const a = enter(frame, 0, 22);
  const bar = enter(frame, 8, 20);
  return (
    <Center v={v}>
      <div style={{ alignSelf: "stretch", maxWidth: 1400 }}>
        <div style={{ width: 110, height: 8, borderRadius: 99, background: b.accent, marginBottom: 40, transform: `scaleX(${bar})`, transformOrigin: "left" }} />
        <div style={{ fontSize: v ? 72 : 70, fontWeight: 900, lineHeight: 1.15, color: b.text, opacity: a, transform: `translateY(${(1 - a) * 30}px)` }}>{s.quote}</div>
        {s.attribution ? <div style={{ marginTop: 34, fontSize: 34, fontWeight: 500, color: b.accent }}>{s.attribution}</div> : null}
      </div>
    </Center>
  );
};

const Screenshot: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const a = enter(frame, 0, 20);
  const zoom = interpolate(frame, [0, s.frames], [1, 1.05], CLAMP);
  return (
    <Center v={v}>
      {s.heading ? <div style={{ alignSelf: "stretch", fontSize: 58, fontWeight: 900, color: b.text, marginBottom: 32, opacity: a }}>{s.heading}</div> : null}
      <div style={{ flex: 1, alignSelf: "stretch", minHeight: 0, borderRadius: 28, overflow: "hidden", border: `3px solid ${b.accent}66`, boxShadow: `0 30px 90px ${b.accent2}44`, background: "#0003", opacity: a }}>
        <Img src={staticFile(s.image)} style={{ width: "100%", height: "100%", objectFit: "contain", transform: `scale(${zoom})` }} />
      </div>
    </Center>
  );
};

const Heading: React.FC<{ s: Scene; v: boolean }> = ({ s, v }) =>
  s.heading ? (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: v ? "96px 72px 140px" : "72px 120px 140px", background: "linear-gradient(#000b,#0000)", fontFamily: FONT, fontSize: v ? 68 : 66, fontWeight: 900, color: "#fff" }}>{s.heading}</div>
  ) : null;

const Footage: React.FC<P> = ({ s, v }) => {
  const { fps } = useSc();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(s.src)} muted startFrom={Math.round((s.startFromSec ?? 0) * fps)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <Heading s={s} v={v} />
    </AbsoluteFill>
  );
};

const Image: React.FC<P> = ({ s, v }) => {
  const { frame } = useSc();
  const zoom = interpolate(frame, [0, s.frames], [1, 1.1], CLAMP);
  return (
    <AbsoluteFill>
      <Img src={staticFile(s.src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
      <Heading s={s} v={v} />
    </AbsoluteFill>
  );
};

const Cta: React.FC<P> = ({ s, b, v }) => {
  const { frame } = useSc();
  const a = enter(frame, 0, 20);
  const c = enter(frame, 14, 20);
  const pulse = 1 + 0.03 * Math.sin(frame / 5) * c;
  return (
    <Center v={v}>
      <Logo b={b} size={v ? 150 : 170} />
      <div style={{ marginTop: b.logo ? 34 : 0, opacity: a, transform: `translateY(${(1 - a) * 36}px)`, fontSize: v ? 88 : 90, fontWeight: 900, color: b.text, textAlign: "center", lineHeight: 1.08, maxWidth: v ? 940 : 1500 }}>{s.heading}</div>
      <div style={{ opacity: c, transform: `scale(${(0.9 + c * 0.1) * pulse})`, marginTop: 56, background: `linear-gradient(135deg, ${b.accent}, ${b.accent})`, color: b.ctaText, padding: "28px 56px", borderRadius: 24, fontSize: 48, fontWeight: 800, boxShadow: `0 0 ${50 * c}px ${b.accent}88` }}>{s.button}</div>
      {s.url ? <div style={{ marginTop: 32, fontSize: 38, fontWeight: 700, color: b.text, opacity: c * 0.85 }}>{s.url}</div> : null}
    </Center>
  );
};

const SCENES: Record<Scene["type"], React.FC<P>> = {
  hook: Hook, kinetic: Kinetic, title: Title, bullets: Bullets, ui: Ui, counter: Counter,
  features: Features, steps: Steps, pricing: Pricing, screenshot: Screenshot, chart: Chart,
  quote: Quote, footage: Footage, image: Image, cta: Cta,
};
const FULL_BLEED = new Set(["footage", "image"]);
const NO_CAPTIONS = new Set(["hook", "kinetic"]);

const Captions: React.FC<{ s: Scene; b: Brand; v: boolean }> = ({ s, b, v }) => {
  const { frame, fps } = useSc();
  const words = s.words;
  if (!words.length) return null;
  const now = (frame / fps) * 1000;
  let idx = words.findIndex((w) => now < w.endMs);
  if (idx < 0) idx = words.length - 1;
  const size = 5;
  const start = Math.floor(idx / size) * size;
  const page = words.slice(start, start + size);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: v ? 260 : 80, display: "flex", justifyContent: "center", padding: "0 64px", fontFamily: FONT }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", fontSize: v ? 58 : 54, fontWeight: 900, textAlign: "center", background: "#000a", padding: "12px 30px", borderRadius: 20 }}>
        {page.map((w, i) => (
          <span key={i} style={{ color: now >= w.startMs && now < w.endMs ? b.accent : "#fff" }}>{w.text}</span>
        ))}
      </div>
    </div>
  );
};

const SceneFrame: React.FC<{ s: Scene; p: Resolved }> = ({ s, p }) => {
  const frame = useCurrentFrame();
  const v = p.height > p.width;
  const kb = interpolate(frame, [0, s.frames], [1, 1.035], CLAMP);
  const Body = SCENES[s.type];
  const showCaps = p.captions && s.captions !== false && !NO_CAPTIONS.has(s.type) && s.words.length > 0;
  const reserve = showCaps && !FULL_BLEED.has(s.type) ? (v ? 380 : 200) : 0;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, bottom: reserve, transform: `scale(${kb})` }}>
        <Body s={s} b={p.brand} v={v} />
      </div>
      {showCaps ? <Captions s={s} b={p.brand} v={v} /> : null}
      {s.source ? (
        <div style={{ position: "absolute", left: 48, right: 48, bottom: v ? 150 : 28, fontFamily: FONT, fontSize: 24, fontWeight: 500, color: p.brand.text, opacity: 0.55 }}>Nguồn: {s.source}</div>
      ) : null}
      {s.audio ? <Audio src={staticFile(s.audio)} /> : null}
    </AbsoluteFill>
  );
};

// ---------- global background, transitions, sound ----------
const Bg: React.FC<{ b: Brand }> = ({ b }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: b.background }}>
      <AbsoluteFill style={{ background: `radial-gradient(60% 38% at ${50 + 24 * Math.sin(f / 70)}% ${26 + 10 * Math.cos(f / 90)}%, ${b.accent2}66, transparent 70%), radial-gradient(55% 38% at ${50 + 26 * Math.cos(f / 80)}% ${78 + 8 * Math.sin(f / 60)}%, ${b.accent}33, transparent 70%)` }} />
      <AbsoluteFill style={{ backgroundImage: `linear-gradient(${b.text}10 1px, transparent 1px), linear-gradient(90deg, ${b.text}10 1px, transparent 1px)`, backgroundSize: "96px 96px", backgroundPosition: `${f * 0.5}px ${f * 0.5}px`, WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, #000 20%, transparent 85%)", maskImage: "radial-gradient(70% 60% at 50% 45%, #000 20%, transparent 85%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, #0008 100%)" }} />
    </AbsoluteFill>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presentation = (name: string | undefined, i: number): any => {
  const n = name ?? ["slide-up", "fade", "slide-left", "wipe"][i % 4];
  if (n === "fade") return fade();
  if (n === "wipe") return wipe({ direction: "from-left" });
  if (n === "slide-left") return slide({ direction: "from-right" });
  return slide({ direction: "from-bottom" });
};

const HIT_TYPES = new Set(["hook", "counter", "cta"]);

export const Video: React.FC<Resolved> = (p) => {
  useFonts();
  const T = p.transitionFrames;
  const starts = p.scenes.map((_, i) => p.scenes.slice(0, i).reduce((a, s) => a + s.frames, 0) - i * T);
  const windows: [number, number][] = [];
  p.scenes.forEach((s, i) => {
    if (s.words.length) {
      windows.push([starts[i] + (s.words[0].startMs / 1000) * p.fps - 4, starts[i] + (s.words[s.words.length - 1].endMs / 1000) * p.fps + 4]);
    }
  });
  const musicVol = (f: number) => {
    const dist = windows.reduce((m, [a, z]) => Math.min(m, f < a ? a - f : f > z ? f - z : 0), 9999);
    const up = interpolate(dist, [0, 20], [1, 2], CLAMP);
    const fadeIO = interpolate(f, [0, 30, p.totalFrames - 60, p.totalFrames], [0, 1, 1, 0], CLAMP);
    return Math.min(1, p.music!.volume * up * fadeIO);
  };
  const kids: React.ReactElement[] = [];
  p.scenes.forEach((s, i) => {
    if (i > 0) {
      kids.push(
        <TransitionSeries.Transition key={`t${i}`} presentation={presentation(s.transition, i)} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />,
      );
    }
    kids.push(
      <TransitionSeries.Sequence key={`s${i}`} durationInFrames={s.frames}>
        <SceneFrame s={s} p={p} />
      </TransitionSeries.Sequence>,
    );
  });
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Bg b={p.brand} />
      <TransitionSeries>{kids}</TransitionSeries>
      {p.sfx
        ? p.scenes.map((s, i) => (
            <React.Fragment key={`x${i}`}>
              {i > 0 ? (
                <Sequence from={Math.max(0, starts[i] - 3)} durationInFrames={40}>
                  <Audio src={staticFile("assets/sfx/whoosh.wav")} volume={0.35} />
                </Sequence>
              ) : null}
              {HIT_TYPES.has(s.type) ? (
                <Sequence from={starts[i] + (s.type === "hook" ? 0 : 8)} durationInFrames={30}>
                  <Audio src={staticFile("assets/sfx/hit.wav")} volume={0.45} />
                </Sequence>
              ) : null}
            </React.Fragment>
          ))
        : null}
      {p.music ? <Audio src={staticFile(p.music.src)} loop volume={musicVol} /> : null}
    </AbsoluteFill>
  );
};
