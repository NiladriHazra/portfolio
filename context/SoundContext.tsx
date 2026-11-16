"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAudioContext } from "@/lib/sound-engine";

type SoundContextType = {
  muted: boolean;
  toggleMuted: () => void;
};

const SoundContext = createContext<SoundContextType>({
  muted: false,
  toggleMuted: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false); // default ON

  // Unlock the Web Audio context as early as possible so hover sounds play
  // without the visitor having to explicitly click a "sound on" button.
  useEffect(() => {
    let unlocked = false;

    // Browsers only allow resuming an AudioContext during a genuine user
    // activation. `click`, `pointerdown`, `mousedown`, `touchstart` and
    // `keydown` all qualify. `wheel`/`scroll`/`mousemove` do NOT count as
    // activation in Chrome, but attempting resume() on them is harmless and
    // succeeds on browsers/sessions where it is allowed, so we listen broadly
    // and simply keep retrying until the context is actually running.
    const events = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "keydown",
      "click",
      "wheel",
      "scroll",
      "pointermove",
      "mousemove",
    ] as const;

    const teardown = () => {
      events.forEach((event) => window.removeEventListener(event, tryUnlock));
    };

    const tryUnlock = () => {
      if (unlocked) return;
      try {
        const ctx = getAudioContext();
        if (ctx.state === "running") {
          unlocked = true;
          teardown();
          return;
        }
        // Only tear down once resume() has genuinely flipped the context to
        // "running" — otherwise a no-op resume (e.g. from a scroll) would
        // wrongly remove the listeners that could still unlock audio later.
        ctx
          .resume()
          .then(() => {
            if (ctx.state === "running") {
              unlocked = true;
              teardown();
            }
          })
          .catch(() => {});
      } catch {
        // AudioContext not available in this environment
      }
    };

    events.forEach((event) =>
      window.addEventListener(event, tryUnlock, { passive: true })
    );

    return teardown;
  }, []);

  const toggleMuted = () => setMuted((prev) => !prev);

  return (
    <SoundContext.Provider value={{ muted, toggleMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSoundContext = () => useContext(SoundContext);
