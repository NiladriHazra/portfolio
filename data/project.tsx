/**
 * Project cards on the home page. Cards whose href starts with /projects/
 * open a case study from data/caseStudies.ts (slug must match the id);
 * anything else opens externally.
 */

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  media: string;
  mediaType: "image" | "video";
  href: string;
  bgImage?: string;
  bgColor?: string;
  contentSize?: string;
  category: string;
  year: string;
}

/** Shown before "See more". */
export const featuredIds = ["klipeo", "open-fiesta", "agent-manager", "whattobuild", "filerepo", "maxmem"];

export const projectCards: ProjectCard[] = [
  {
    id: "klipeo",
    title: "Klipeo",
    description: "An AI video editor for product videos. Tell the agent what you want, check every cut on a real timeline.",
    media: "/img/klipeo.jpg",
    mediaType: "image",
    href: "/projects/klipeo",
    category: "Product",
    year: "2026",
  },
  {
    id: "open-fiesta",
    title: "Open Fiesta",
    description: "Open-source multi-model AI chat. 958★, about 32K users, sponsored by Vercel.",
    media: "/img/openfiesta.png",
    mediaType: "image",
    href: "/projects/open-fiesta",
    category: "Open source",
    year: "2025",
  },
  {
    id: "agent-manager",
    title: "agent-manager",
    description: "Every coding agent you're running, in one macOS menu bar icon. Signed and notarized.",
    media: "/img/agent-manager.mp4",
    mediaType: "video",
    href: "/projects/agent-manager",
    category: "macOS app",
    year: "2026",
  },
  {
    id: "whattobuild",
    title: "WhatToBuild",
    description: "Discover, analyze and compare open-source projects and developers with AI.",
    media: "/img/wtb.png",
    mediaType: "image",
    href: "/projects/whattobuild",
    category: "Developer tool",
    year: "2025",
  },
  {
    id: "filerepo",
    title: "filerepo",
    description: "A terminal UI to grab any file or folder from GitHub without cloning.",
    media: "/img/filerepo.png",
    mediaType: "image",
    href: "/projects/filerepo",
    category: "CLI",
    year: "2026",
  },
  {
    id: "maxmem",
    title: "MaxMEM",
    description: "Local-first handoff memory for Codex, Claude Code and OpenCode. 2.3K npm downloads.",
    media: "/img/maxmem.jpg",
    mediaType: "image",
    href: "/projects/maxmem",
    category: "Dev tool",
    year: "2026",
  },
  {
    id: "humistack",
    title: "humiStack",
    description: "The agent skills I use every day, cleaned up so anyone can install them.",
    media: "/img/humistack.png",
    mediaType: "image",
    href: "https://github.com/NiladriHazra/humiStack",
    category: "Agent skills",
    year: "2026",
  },
  {
    id: "slop-detect",
    title: "Slop-Detect",
    description: "A browser extension that flags copied or AI-slop tweets on your timeline.",
    media: "/img/slop-detect.png",
    mediaType: "image",
    href: "https://github.com/NiladriHazra/Slop-Detect",
    category: "Extension",
    year: "2026",
  },
  {
    id: "clean-image",
    title: "clean-image",
    description: "Strip AI-generation and camera metadata from an image before you post it.",
    media: "/img/clean-image.png",
    mediaType: "image",
    href: "https://clean.niladri.in",
    category: "Tool",
    year: "2026",
  },
  {
    id: "codepixel",
    title: "CodePixel",
    description: "Competitive programming, interview prep and code sharing with an AI assistant.",
    media: "/img/codepixel.png",
    mediaType: "image",
    href: "https://codepixel.niladri.tech",
    category: "Web app",
    year: "2025",
  },
];
