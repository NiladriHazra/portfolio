"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";

const button =
  "inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800";

export default function ResumeBar() {
  const playClick = usePortfolioSound("/sounds/click.mp3");
  return (
    <div className="resume-bar sticky top-0 z-10 border-b border-zinc-200 bg-zinc-100/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-[816px] items-center justify-between gap-3 px-4 py-3">
        <Link href="/" onClick={() => playClick()} className={button}>
          <span>↩</span>
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <a href="/resume.pdf" download="Niladri-Hazra-Resume.pdf" onClick={() => playClick()} className={button}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Download PDF</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
