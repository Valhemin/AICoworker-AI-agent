export type Brand = {
  accent: string;
  accent2: string;
  background: string;
  text: string;
  track: string;
  ctaText: string;
  logo?: string;
};
export type Word = { text: string; startMs: number; endMs: number };
export type SceneType =
  | "hook" | "kinetic" | "title" | "bullets" | "ui" | "counter" | "features" | "steps"
  | "pricing" | "screenshot" | "chart" | "quote" | "footage" | "image" | "cta";
export type Scene = {
  type: SceneType;
  frames: number;
  audio?: string;
  words: Word[];
  transition?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
};
export type Resolved = {
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  transitionFrames: number;
  sfx: boolean;
  captions: boolean;
  brand: Brand;
  music?: { src: string; volume: number };
  scenes: Scene[];
};
