/**
 * Project rows on the home page. Each row expands in place to show a preview,
 * what the project is, its stack and links. Rows with a case study in
 * data/caseStudies.ts (matching id) also link to the full write-up.
 */

export type ProjectIcon =
  | "compass"
  | "folder-down"
  | "brain"
  | "layers"
  | "scan-search"
  | "eraser"
  | "code";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  /** One line, shown in the collapsed row. */
  description: string;
  /** Two or three sentences, shown when the row is open. */
  about: string;
  /** Square image logo. */
  logo?: string;
  /** Icon tile used when there is no image logo. */
  icon?: ProjectIcon;
  /** Preview shown when the row is open (mp4 or image). */
  media: string;
  mediaType: "image" | "video";
  /** Label in the preview window's title bar. */
  windowTitle: string;
  stack: string[];
  links: ProjectLink[];
  /** Public GitHub repo name under NiladriHazra. Its live star count shows next to the title. */
  repo?: string;
  href: string;
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
    about:
      "An AI video editor for launch films, demos and changelogs. An agent crew films your product, cuts the slow parts, captions and scores it, while every edit stays on a timeline you can still touch.",
    logo: "/logos/klipeo.png",
    media: "/img/klipeo.mp4",
    mediaType: "video",
    windowTitle: "klipeo-launch · Editing",
    stack: ["Next.js", "React", "Remotion", "Bun", "PostgreSQL", "SwiftUI"],
    links: [{ label: "klipeo.com", href: "https://klipeo.com" }],
    href: "/projects/klipeo",
    category: "Product",
    year: "2026",
  },
  {
    id: "open-fiesta",
    repo: "Open-Fiesta",
    title: "Open Fiesta",
    description: "Ask every AI model at once. Free and open source.",
    about:
      "Pick up to five models, send one prompt, and read their answers side by side. I posted it on X and it hit 32,000 users and close to a thousand stars. Vercel sponsored it.",
    logo: "/logos/openfiesta.png",
    media: "/img/openfiesta.png",
    mediaType: "image",
    windowTitle: "openfiesta.app",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenRouter", "Gemini", "Docker"],
    links: [
      { label: "openfiesta.app", href: "https://openfiesta.app" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/Open-Fiesta" },
    ],
    href: "/projects/open-fiesta",
    category: "Open source",
    year: "2025",
  },
  {
    id: "agent-manager",
    repo: "agent-manager",
    title: "agent-manager",
    description: "Which coding agents are working, and which are waiting on you.",
    about:
      "A native menu bar app for anyone running Claude Code, Codex and OpenCode at once. It reads the files agents already write to disk, so it knows who is busy, who is done, and what each has spent.",
    logo: "/logos/agent-manager.png",
    media: "/img/agent-manager.mp4",
    mediaType: "video",
    windowTitle: "agent-manager · menu bar",
    stack: ["Swift", "SwiftUI", "AppKit"],
    links: [
      { label: "Download for macOS", href: "https://github.com/NiladriHazra/agent-manager/releases/latest/download/agent-manager.dmg" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/agent-manager" },
    ],
    href: "/projects/agent-manager",
    category: "macOS app",
    year: "2026",
  },
  {
    id: "whattobuild",
    repo: "WhatToBuild",
    title: "WhatToBuild",
    description: "Find, understand and compare open-source projects.",
    about:
      "Describe an idea and get the repos that already do it, ranked. Open any repo for a map of its structure and stack, compare two developers, or have it write your README and open the PR.",
    icon: "compass",
    media: "/img/wtb.mp4",
    mediaType: "video",
    windowTitle: "what-to-build.niladri.tech",
    stack: ["Next.js", "React", "Gemini", "GitHub API", "Mermaid"],
    links: [
      { label: "Live", href: "https://what-to-build.niladri.tech" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/WhatToBuild" },
    ],
    href: "/projects/whattobuild",
    category: "Web app",
    year: "2025",
  },
  {
    id: "filerepo",
    repo: "filerepo",
    title: "filerepo",
    description: "Grab any file or folder from GitHub without cloning.",
    about:
      "A terminal app for browsing a repo and pulling out only what you need. Paste a link to a branch, tag or PR, fuzzy-search, pick files, save them or zip them.",
    icon: "folder-down",
    media: "/img/filerepo.png",
    mediaType: "image",
    windowTitle: "npx @bytehumi/filerepo",
    stack: ["Go", "Bubble Tea", "GitHub API"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/@bytehumi/filerepo" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/filerepo" },
    ],
    href: "/projects/filerepo",
    category: "CLI",
    year: "2026",
  },
  {
    id: "maxmem",
    repo: "MaxMEM",
    title: "MaxMEM",
    description: "Hand work between Claude Code, Codex and OpenCode.",
    about:
      "When you switch agents, the next one starts from zero. MaxMEM leaves it a short note: branch, changed files, decisions, blockers and next steps. About 2,300 installs on npm.",
    icon: "brain",
    media: "/img/maxmem.jpg",
    mediaType: "image",
    windowTitle: "maxmem · handoff",
    stack: ["TypeScript", "Bun", "MCP"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/@bytehumi/maxmem" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/MaxMEM" },
    ],
    href: "/projects/maxmem",
    category: "Dev tool",
    year: "2026",
  },
  {
    id: "humistack",
    repo: "humiStack",
    title: "humiStack",
    description: "The agent skills I use every day.",
    about: "Skills for Claude Code, Codex and OpenCode: slimming down bloated repos, refactoring prompts, orchestrating workers and handing off tasks.",
    icon: "layers",
    media: "/img/humistack.png",
    mediaType: "image",
    windowTitle: "npx skills add NiladriHazra/humiStack",
    stack: ["Agent skills", "Markdown"],
    links: [{ label: "GitHub", href: "https://github.com/NiladriHazra/humiStack" }],
    href: "https://github.com/NiladriHazra/humiStack",
    category: "Agent skills",
    year: "2026",
  },
  {
    id: "slop-detect",
    repo: "Slop-Detect",
    title: "Slop-Detect",
    description: "Flags copied and AI-slop tweets on your timeline.",
    about: "A browser extension that marks tweets that look copied or machine-written, right in your timeline.",
    icon: "scan-search",
    media: "/img/slop-detect.png",
    mediaType: "image",
    windowTitle: "x.com · Slop-Detect",
    stack: ["JavaScript", "Chrome extension"],
    links: [{ label: "GitHub", href: "https://github.com/NiladriHazra/Slop-Detect" }],
    href: "https://github.com/NiladriHazra/Slop-Detect",
    category: "Extension",
    year: "2026",
  },
  {
    id: "clean-image",
    repo: "clean-image",
    title: "clean-image",
    description: "Strip AI and camera metadata before you post.",
    about: "Drop in an image and download a copy with its AI-generation and camera metadata removed.",
    icon: "eraser",
    media: "/img/clean-image.png",
    mediaType: "image",
    windowTitle: "clean.niladri.in",
    stack: ["TypeScript", "Next.js"],
    links: [
      { label: "clean.niladri.in", href: "https://clean.niladri.in" },
      { label: "GitHub", href: "https://github.com/NiladriHazra/clean-image" },
    ],
    href: "https://clean.niladri.in",
    category: "Tool",
    year: "2026",
  },
  {
    id: "codepixel",
    repo: "CodePixel_Public",
    title: "CodePixel",
    description: "Competitive programming and interview prep with AI.",
    about: "Practice problems, interview prep and code sharing, with an AI assistant that helps when you're stuck.",
    icon: "code",
    media: "/img/codepixel.png",
    mediaType: "image",
    windowTitle: "codepixel.niladri.tech",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    links: [{ label: "Live", href: "https://codepixel.niladri.tech" }],
    href: "https://codepixel.niladri.tech",
    category: "Web app",
    year: "2025",
  },
];
