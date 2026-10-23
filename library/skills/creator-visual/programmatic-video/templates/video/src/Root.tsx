import { Composition } from "remotion";
import { Video } from "./Video";
import resolved from "./resolved.json";
import type { Resolved } from "./types";

// resolved.json is written by scripts/make_video.py (durations come from the voice-over).
export const RemotionRoot = () => (
  <Composition
    id="Video"
    component={Video}
    defaultProps={resolved as unknown as Resolved}
    durationInFrames={resolved.totalFrames}
    fps={resolved.fps}
    width={resolved.width}
    height={resolved.height}
    calculateMetadata={({ props }) => ({
      durationInFrames: props.totalFrames,
      fps: props.fps,
      width: props.width,
      height: props.height,
    })}
  />
);
