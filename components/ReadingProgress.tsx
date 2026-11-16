"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const next = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, next)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200/70 bg-zinc-50/95 backdrop-blur md:hidden">
      <div className="h-1 bg-zinc-100">
        <div className="h-full bg-zinc-700 transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
