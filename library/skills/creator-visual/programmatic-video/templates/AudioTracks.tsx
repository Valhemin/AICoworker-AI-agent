/** Voice-over + background music. Files under <remotion-app>/public/. Put inside the root composition. */
import React from "react";
import { Audio, staticFile } from "remotion";

export const AudioTracks: React.FC<{
  audioSrc?: string;
  musicSrc?: string;
  /** Keep 0.08-0.15 so music stays under the voice. */
  musicVolume?: number;
}> = ({ audioSrc, musicSrc, musicVolume = 0.1 }) => (
  <>
    {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
    {musicSrc ? <Audio src={staticFile(musicSrc)} volume={musicVolume} loop /> : null}
  </>
);
