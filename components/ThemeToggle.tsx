"use client";

import { useTheme } from "next-themes";
import { useSoundContext } from "@/context/SoundContext";
import { useSound } from "@/hooks/use-soundcn";
import { click002Sound } from "@/sounds/toggle";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/utility/utility";

type TogglesProps = {
  className?: string;
};

export default function ThemeToggle({ className }: TogglesProps) {
  const { muted, toggleMuted } = useSoundContext();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [playToggle] = useSound(click002Sound, {
    volume: 0.2,
    soundEnabled: !muted,
  });

  const handleSoundToggle = () => {
    toggleMuted();
    if (muted) {
      playToggle();
    }
  };

  const handleThemeToggle = () => {
    playToggle();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <div className={cn("flex items-center gap-2", className)} aria-hidden="true" />;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Sound toggle */}
      <motion.button
        onClick={handleSoundToggle}
        className="inline-flex size-7 items-center justify-center text-zinc-400 transition-all duration-300 hover:text-zinc-500 dark:hover:text-zinc-300 active:scale-95 cursor-pointer"
        aria-label={muted ? "Enable sound" : "Disable sound"}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={muted ? "muted" : "unmuted"}
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Theme toggle */}
      <motion.button
        onClick={handleThemeToggle}
        className="inline-flex size-7 items-center justify-center text-zinc-400 transition-all duration-300 hover:text-zinc-500 dark:hover:text-zinc-300 active:scale-95 cursor-pointer"
        aria-label="Toggle theme"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme === "dark" ? "dark" : "light"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
