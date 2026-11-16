"use client";

import { Brain, Code2, Compass, Eraser, FolderDown, Layers, ScanSearch } from "lucide-react";
import type { ProjectIcon } from "@/data/project";

const ICONS = {
  compass: Compass,
  "folder-down": FolderDown,
  brain: Brain,
  layers: Layers,
  "scan-search": ScanSearch,
  eraser: Eraser,
  code: Code2,
} satisfies Record<ProjectIcon, unknown>;

/** 28px square logo: an image when there is one, otherwise an icon tile. */
export function LogoTile({ src, icon, alt = "" }: { src?: string; icon?: ProjectIcon; alt?: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={28}
        height={28}
        className="size-7 shrink-0 rounded-[7px] border border-zinc-200 bg-white object-contain dark:border-zinc-800"
      />
    );
  }
  const Icon = icon ? ICONS[icon] : Code2;
  return (
    <span
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-[7px] bg-zinc-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:bg-zinc-100 dark:text-zinc-900"
    >
      <Icon size={15} strokeWidth={2} />
    </span>
  );
}

/** A small chevron that turns when its row opens. */
export function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid size-6 shrink-0 place-items-center rounded-full text-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:bg-zinc-100 group-hover/row:text-zinc-900 dark:group-hover/row:bg-zinc-800 dark:group-hover/row:text-zinc-100 ${
        open ? "rotate-90 bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : ""
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
