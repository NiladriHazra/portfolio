import { useSound } from "./use-soundcn";
import { useSoundContext } from "@/context/SoundContext";
import { click001Sound } from "@/sounds/click";
import { click002Sound } from "@/sounds/toggle";
import type { SoundAsset } from "@/lib/sound-types";
import { playBatuHoverSound } from "@/utils/sounds";

const soundMap: Record<string, SoundAsset> = {
  "/sounds/hover.mp3": click002Sound,
  "/sounds/toggle.mp3": click002Sound,
  "/sounds/click.mp3": click001Sound,
  "/sounds/shuffle.mp3": click002Sound,
};

export function usePortfolioSound(src: string, volume = 0.15) {
  const { muted } = useSoundContext();
  
  // Resolve the sound asset based on the legacy path, fallback to click001
  const soundAsset = soundMap[src] || click001Sound;

  const [play] = useSound(soundAsset, {
    volume,
    soundEnabled: !muted,
  });
  
  if (src === "/sounds/hover.mp3") {
    return () => {
      if (!muted) {
        playBatuHoverSound(volume);
      }
    };
  }
  
  return play;
}
