/**
 * Project rows on the home page. Rows whose href starts with /projects/ open
 * a case study from data/caseStudies.ts (slug must match the id); anything
 * else opens externally.
 */

export interface ProjectCard {
  id: string;
  title: string;
  /** One line, shown in the list. */
  description: string;
  /** Square logo. Omit to show the first letter. */
  logo?: string;
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
    description: "Edit product videos by asking. Every cut lands on a real timeline.",
    logo: "/logos/klipeo.png",
    media: "/img/klipeo.mp4",
    mediaType: "video",
    href: "/projects/klipeo",
    category: "Product",
    year: "2026",
  },
  {
    id: "open-fiesta",
    title: "Open Fiesta",
    description: "Ask every AI model at once, free and open source. 32K users.",
    logo: "/logos/openfiesta.png",
    media: "/img/openfiesta.png",
    mediaType: "image",
    href: "/projects/open-fiesta",
    category: "Open source",
    year: "2025",
  },
  {
    id: "agent-manager",
    title: "agent-manager",
    description: "See which coding agents are working and which are waiting on you.",
    logo: "/logos/agent-manager.png",
    media: "/img/agent-manager.mp4",
    mediaType: "video",
    href: "/projects/agent-manager",
    category: "macOS app",
    year: "2026",
  },
  {
    id: "whattobuild",
    title: "WhatToBuild",
    description: "Find, understand and compare open-source projects with AI.",
    media: "/img/wtb.mp4",
    mediaType: "video",
    href: "/projects/whattobuild",
    category: "Web app",
    year: "2025",
  },
  {
    id: "filerepo",
    title: "filerepo",
    description: "Grab any file or folder from GitHub without cloning.",
    media: "/img/filerepo.png",
    mediaType: "image",
    href: "/projects/filerepo",
    category: "CLI",
    year: "2026",
  },
  {
    id: "maxmem",
    title: "MaxMEM",
    description: "Hand off work between Claude Code, Codex and OpenCode.",
    media: "/img/maxmem.jpg",
    mediaType: "image",
    href: "/projects/maxmem",
    category: "Dev tool",
    year: "2026",
  },
  {
    id: "humistack",
    title: "humiStack",
    description: "The agent skills I use every day.",
    media: "/img/humistack.png",
    mediaType: "image",
    href: "https://github.com/NiladriHazra/humiStack",
    category: "Agent skills",
    year: "2026",
  },
  {
    id: "slop-detect",
    title: "Slop-Detect",
    description: "Flags copied and AI-slop tweets on your timeline.",
    media: "/img/slop-detect.png",
    mediaType: "image",
    href: "https://github.com/NiladriHazra/Slop-Detect",
    category: "Extension",
    year: "2026",
  },
  {
    id: "clean-image",
    title: "clean-image",
    description: "Strip AI and camera metadata from an image before posting.",
    media: "/img/clean-image.png",
    mediaType: "image",
    href: "https://clean.niladri.in",
    category: "Tool",
    year: "2026",
  },
  {
    id: "codepixel",
    title: "CodePixel",
    description: "Competitive programming and interview prep with an AI assistant.",
    media: "/img/codepixel.png",
    mediaType: "image",
    href: "https://codepixel.niladri.tech",
    category: "Web app",
    year: "2025",
  },
];
