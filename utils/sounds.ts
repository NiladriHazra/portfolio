import { getAudioContext as getEngineAudioContext } from "@/lib/sound-engine";

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  try {
    return getEngineAudioContext();
  } catch {
    return null;
  }
};

export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gainNode.gain.setValueAtTime(0.03, now);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.04);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Silent fail if audio is blocked or unsupported
  }
};

export const playHoverTick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.type = "sine";
    osc.frequency.setValueAtTime(2500, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.012);

    gainNode.gain.setValueAtTime(0.008, now);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.012);

    osc.start(now);
    osc.stop(now + 0.012);
  } catch {
    // Silent fail if audio is blocked or unsupported
  }
};

export const playBatuHoverSound = (volume = 0.06) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const startPlayback = () => {
      const now = ctx.currentTime;

      // Overall gain node
      const output = ctx.createGain();
      output.gain.setValueAtTime(0.0001, now);
      // Multiply target gain by volume scale (increased by 2.2x to make it clearly audible)
      const boostedVolume = volume * 2.2;
      output.gain.exponentialRampToValueAtTime(0.1 * (boostedVolume / 0.1), now + 0.006);
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
      output.connect(ctx.destination);

      // Layer 1: sine wave (1040Hz -> 860Hz, gain 0.55)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1040, now);
      osc1.frequency.exponentialRampToValueAtTime(860, now + 0.045);
      gain1.gain.setValueAtTime(0.55, now);
      osc1.connect(gain1);
      gain1.connect(output);

      // Layer 2: triangle wave (520Hz -> 480Hz, gain 0.18)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(520, now);
      osc2.frequency.exponentialRampToValueAtTime(480, now + 0.045);
      gain2.gain.setValueAtTime(0.18, now);
      osc2.connect(gain2);
      gain2.connect(output);

      osc1.start(now);
      osc1.stop(now + 0.045 + 0.01);
      osc2.start(now);
      osc2.stop(now + 0.045 + 0.01);
    };

    if (ctx.state === "suspended") {
      ctx.resume().then(startPlayback).catch(console.error);
    } else {
      startPlayback();
    }
  } catch (e) {
    // Fail silently
  }
};

