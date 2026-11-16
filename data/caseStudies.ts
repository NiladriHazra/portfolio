export type CaseStudySection = {
  id: string;
  title: string;
  body: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  demoVideo: string;
  year: string;
  category: string;
  liveUrl: string;
  liveLabel?: string;
  githubUrl?: string;
  telegramUrl?: string;
  /** Direct download, e.g. a signed .dmg. Shown as a "Download" link. */
  downloadUrl?: string;
  downloadLabel?: string;
  stack: string[];
  sections: CaseStudySection[];
  sectionMedia?: Record<string, string>;
  bordered?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "klipeo",
    title: "Klipeo",
    subtitle: "Edit product videos by asking. Every cut lands on a real timeline you can still touch.",
    demoVideo: "/img/klipeo.mp4",
    year: "2026",
    category: "Product",
    liveUrl: "https://klipeo.com",
    liveLabel: "klipeo.com",
    stack: ["Next.js 16", "React 19", "Remotion", "Bun", "Turborepo", "Drizzle", "PostgreSQL", "SwiftUI"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: [
          "An AI video editor for launch videos, demos and changelogs. You tell it what you want; it cuts, captions, scores and exports.",
          "Most AI video tools hand you a finished render and nothing else. Klipeo's agent edits the same multi-track timeline you do, so you can check and fix any cut by hand.",
        ],
      },
      {
        id: "how",
        title: "How it works",
        body: [
          "Vibe, the editor's agent, writes small patches to the project instead of re-rendering it. The timeline, canvas and properties panel all read from that same project, so changes show up instantly and can be undone.",
          "It runs on Klipeo's hosted models, or it can hand the work to the Claude Code, Codex or OpenCode already running on your machine.",
        ],
      },
      {
        id: "features",
        title: "What's in it",
        body: [
          "A full editor: video, audio, text, captions, keyframes, masks, transitions, retiming and screen recording. It exports in the browser or renders on the server.",
          "There's a web app plus a native macOS app with screen recording, signed and notarized. Android and iOS are on the way.",
        ],
      },
      {
        id: "tech",
        title: "Built with",
        body: ["A Bun and Turborepo monorepo. Next.js and React on the web, Remotion for rendering, Postgres with Drizzle, and Swift for the native apps."],
      },
    ],
  },
  {
    slug: "open-fiesta",
    title: "Open Fiesta",
    subtitle: "Ask every AI model at once. Free and open source.",
    demoVideo: "/img/openfiesta.png",
    year: "2025",
    category: "Open source",
    liveUrl: "https://openfiesta.app",
    liveLabel: "openfiesta.app",
    githubUrl: "https://github.com/NiladriHazra/Open-Fiesta",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenRouter", "Gemini", "Ollama", "Docker"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: [
          "Pick up to five models, send one prompt, and read their answers side by side as they stream in. No subscriptions, no tab juggling.",
        ],
      },
      {
        id: "how",
        title: "How it works",
        body: [
          "One chat box fans your message out to Gemini, OpenRouter models (DeepSeek, Llama, Qwen, Mistral and more) and local Ollama models, then lines up the replies.",
          "You can turn on web search per message, attach images, and share any conversation as a link. Bring your own keys, or self-host it with Docker.",
        ],
      },
      {
        id: "traction",
        title: "What happened",
        body: [
          "I built it because I wanted it. I posted it on X and it blew up: about 32,000 sign-ups, 958 GitHub stars and 186 forks, with strangers sending pull requests. Vercel sponsored it.",
          "Runable's founder DMed me about it. I finished their assignment that night and joined as their first tech intern.",
        ],
      },
      {
        id: "tech",
        title: "Built with",
        body: ["Next.js and TypeScript, Supabase for auth and chat history, and Docker for self-hosting."],
      },
    ],
  },
  {
    slug: "agent-manager",
    title: "agent-manager",
    subtitle: "Every coding agent you're running, in one menu bar icon.",
    demoVideo: "/img/agent-manager.mp4",
    year: "2026",
    category: "macOS app",
    liveUrl: "",
    githubUrl: "https://github.com/NiladriHazra/agent-manager",
    downloadUrl: "https://github.com/NiladriHazra/agent-manager/releases/latest/download/agent-manager.dmg",
    downloadLabel: "Download for macOS",
    stack: ["Swift", "SwiftUI", "AppKit", "SwiftPM"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: [
          "Claude in one terminal, three Codex sessions in others, OpenCode somewhere behind them. Two finished ten minutes ago and are waiting on you. One is about to hit its weekly limit.",
          "agent-manager shows all of that from the menu bar: what's working, what's waiting on you, and what each agent has used.",
        ],
      },
      {
        id: "how",
        title: "How it works",
        body: [
          "It reads the session files each agent already writes to disk. If a transcript changed in the last few minutes and the turn hasn't ended, the agent is working. If the turn ended, it's waiting on you.",
          "It also shows usage for today and the last 7 days, spend, and the model in use for each agent. Nothing leaves your machine.",
        ],
      },
      {
        id: "get",
        title: "Get it",
        body: ["Native Swift, about 3 MB, Apple Silicon and Intel. Signed and notarized, so it opens without warnings. Requires macOS 14 or later."],
      },
    ],
  },
  {
    slug: "whattobuild",
    title: "WhatToBuild",
    subtitle: "Find, understand and compare open-source projects with AI.",
    demoVideo: "/img/wtb.mp4",
    year: "2025",
    category: "Web app",
    liveUrl: "https://what-to-build.niladri.tech",
    liveLabel: "Live",
    githubUrl: "https://github.com/NiladriHazra/WhatToBuild",
    stack: ["Next.js 15", "React 19", "TypeScript", "Gemini", "GitHub API", "Recharts", "Mermaid"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: ["Describe an idea and it finds the repos that already do it, ranked by how close they are, plus a few ideas for what you could build instead."],
      },
      {
        id: "how",
        title: "What you can do",
        body: [
          "Point it at any repo for a breakdown of its structure, stack and dependencies, drawn as diagrams. Compare two developers side by side. Find good first issues and bounties in your language.",
          "It can also write a README for your repo, let you edit it with a live preview, and open the pull request for you.",
        ],
      },
      {
        id: "tech",
        title: "Built with",
        body: ["Next.js and React, Gemini for the analysis, and the GitHub API for the data. 74 stars on GitHub."],
      },
    ],
  },
  {
    slug: "filerepo",
    title: "filerepo",
    subtitle: "Grab any file or folder from GitHub without cloning.",
    demoVideo: "/img/filerepo.png",
    year: "2026",
    category: "CLI",
    liveUrl: "https://www.npmjs.com/package/@bytehumi/filerepo",
    liveLabel: "npm",
    githubUrl: "https://github.com/NiladriHazra/filerepo",
    stack: ["Go", "Bubble Tea", "GitHub API"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: ["A terminal app for browsing a GitHub repo and downloading just the files you need. Run it with npx @bytehumi/filerepo."],
      },
      {
        id: "how",
        title: "What you can do",
        body: [
          "Paste a link to a repo, branch, tag, commit or PR and browse it. Fuzzy-search with filters like ext:go, pick files, and save them as-is or as a zip.",
          "It remembers recent repos and favorites, caches trees so they reopen instantly, and can resume interrupted downloads.",
        ],
      },
      {
        id: "tech",
        title: "Built with",
        body: ["Written in Go and shipped through npm, so it runs anywhere Node does."],
      },
    ],
  },
  {
    slug: "maxmem",
    title: "MaxMEM",
    subtitle: "Hand off work between Claude Code, Codex and OpenCode without losing the thread.",
    demoVideo: "/img/maxmem.jpg",
    year: "2026",
    category: "Dev tool",
    liveUrl: "https://www.npmjs.com/package/@bytehumi/maxmem",
    liveLabel: "npm",
    githubUrl: "https://github.com/NiladriHazra/MaxMEM",
    stack: ["TypeScript", "Bun", "MCP"],
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: ["When you switch agents or start a fresh session, the next model normally needs a long recap. MaxMEM saves a short note of where things stand so the next agent can pick up from there."],
      },
      {
        id: "how",
        title: "How it works",
        body: [
          "At the end of a session it records the branch, changed files, decisions, blockers and next steps, but not the raw chat. The next agent reads that note when it starts.",
          "It plugs into Codex, Claude Code and OpenCode, and has been downloaded about 2,300 times on npm.",
        ],
      },
    ],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((item) => item.slug === slug);
