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
    subtitle: "An AI video editor for product videos. Tell the agent what you want, check every cut on a real timeline, and export.",
    demoVideo: "/img/klipeo.jpg",
    year: "2026",
    category: "Product · Building now",
    liveUrl: "https://klipeo.com",
    stack: ["Next.js 16", "React 19", "TypeScript", "Remotion", "Bun", "Turborepo", "Tailwind CSS 4", "Better Auth", "Drizzle", "PostgreSQL", "SwiftUI", "AppKit"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: [
          "Klipeo is an AI-assisted video editor for the web, macOS, Android and iOS. It's built for people who need to ship product videos (launches, demos, changelogs) but don't want to spend an afternoon in a traditional editor.",
          "The core idea: the AI and the human edit the same thing. Vibe, the conversational editor, writes atomic patches to the same composition model that the timeline, canvas and properties panels read from, so every change the agent makes is visible, reversible and editable by hand.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        body: [
          "Most AI video tools are one-shot generators. You type a prompt, get a render back, and if one cut is wrong you start over. Real editing tools give you control but expect you to do all the work yourself.",
          "I wanted the agent to do the boring 80% while every frame stays inspectable on a real timeline.",
        ],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "A multi-track editor covering video, image, audio, text, stickers, subtitles, effects, transitions, keyframes, masks, tracking, retiming, markers and groups, plus browser recording. Export runs in the browser or as a durable server render.",
          "Vibe runs as durable tasks with approvals, cancellation, recovery and checkpoints. It can use Klipeo's hosted Gemini path or hand the work to a developer's own local Claude Code, Codex, Gemini CLI or OpenCode through Klipeo Bridge.",
          "There's also a native macOS app (a hybrid SwiftUI/AppKit shell around a persistent WKWebView) that handles windowing, downloads, auth handoff and screen recording. It's Developer ID-signed and notarized.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: [
          "A Bun + Turborepo monorepo. The main product is a Next.js 16 / React 19 app rendering compositions with Remotion. Auth is Better Auth, data is Drizzle on PostgreSQL, media sits in S3-compatible object storage, and native shells are Swift.",
        ],
      },
      {
        id: "outcome",
        title: "Where It Is",
        body: [
          "Live at klipeo.com and free to start. I'm still building it actively: more media tools (trim, enhance, crop, denoise, extract audio, convert, compress), a marketplace for skills and connectors, and the mobile apps.",
        ],
      },
    ],
  },
  {
    slug: "open-fiesta",
    title: "Open Fiesta",
    subtitle: "An open-source multi-model AI chat playground. Pick up to five models, send one prompt, compare every answer side by side.",
    demoVideo: "/img/openfiesta.png",
    year: "2025",
    category: "Open source",
    liveUrl: "https://openfiesta.app",
    githubUrl: "https://github.com/NiladriHazra/Open-Fiesta",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenRouter", "Gemini", "Ollama", "Docker"],
    sectionMedia: { built: "/img/openfiesta.png" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: [
          "Open Fiesta is a free, open-source playground for talking to many AI models at once. Choose up to five models, ask one question, and watch the answers stream in next to each other.",
          "I built it because I wanted it to exist, not because I thought it would take off. It took off.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        body: [
          "Comparing models meant juggling five tabs, five subscriptions and five slightly different chat UIs. Most people never find out that a free open model answers their question as well as the paid one.",
        ],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "A Next.js App Router app with a normalized streaming layer over Gemini, OpenRouter (DeepSeek R1, Llama 3.3, Qwen, Mistral, Moonshot, Reka, Sarvam and more) and local Ollama models.",
          "Per-message web search, image attachments, shareable conversation links, Supabase auth and chat persistence, and Docker support for self-hosting. Users can bring their own keys at runtime from Settings.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: ["Next.js 14 with TypeScript and Tailwind on the front, API routes for provider calls, Supabase for auth and Postgres storage, and Docker for self-hosting."],
      },
      {
        id: "outcome",
        title: "Outcome",
        body: [
          "I posted it on X and it went viral: about 32,000 sign-ups, 958 GitHub stars, 186 forks, and strangers filing issues and sending pull requests. Vercel sponsored the project.",
          "It also changed my career. Runable's founder messaged me about it, I did their assignment the same night, and I joined as their first tech intern.",
        ],
      },
    ],
  },
  {
    slug: "agent-manager",
    title: "agent-manager",
    subtitle: "Every coding agent you're running, in one macOS menu bar icon: which are working, which are waiting on you, and what each has spent.",
    demoVideo: "/img/agent-manager.mp4",
    year: "2026",
    category: "macOS app",
    liveUrl: "",
    githubUrl: "https://github.com/NiladriHazra/agent-manager",
    downloadUrl: "https://github.com/NiladriHazra/agent-manager/releases/latest/download/agent-manager.dmg",
    downloadLabel: "Download for macOS",
    stack: ["Swift", "SwiftUI", "AppKit", "SwiftPM", "Developer ID", "Notarization"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: [
          "A small native menu bar app that answers one question at a glance: what are my coding agents doing right now?",
          "It's about 3 MB, has no Electron, reads only local files on your own machine, sends nothing anywhere, and calls no undocumented vendor APIs. It's a universal binary that's Developer ID-signed and notarized by Apple, so it opens without warnings.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        body: [
          "You have Claude in one terminal, three Codex sessions in three more, and OpenCode somewhere behind them. Two finished ten minutes ago and are sitting there waiting for your reply. One is about to hit its weekly limit mid-task.",
          "There was no way to see any of that without checking every window. And a live process isn't the same as a working one: on the machine this was built against, \"9 running\" was really 2 working.",
        ],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "Three tabs, each based on what agents actually wrote to disk. Working means a transcript was written in the last 3 minutes and its last record isn't an ended turn. Waiting means the last record is an ended turn: task_complete for Codex, stop_reason end_turn for Claude, a completed assistant message for OpenCode. Open means the process is alive but neither.",
          "For each agent you get quota or usage for today and the last 7 days, spend where the vendor publishes prices, the model in use, and a model selector. Multiple terminals of the same tool stack into one row that expands sideways.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: ["Pure SwiftPM, no Xcode project. A build script assembles the .app bundle, signs it with hardened runtime, notarizes and staples it, and packages a DMG for release."],
      },
      {
        id: "outcome",
        title: "Get It",
        body: ["Download the signed DMG, drag it to Applications, and look for the mark in your menu bar. Turn on Launch at login in Settings so it survives a reboot. Requires macOS 14 or later."],
      },
    ],
  },
  {
    slug: "whattobuild",
    title: "WhatToBuild",
    subtitle: "Discover, analyze and understand open-source projects, compare developers, and generate a great README in one click.",
    demoVideo: "/img/wtb.png",
    year: "2025",
    category: "Developer tool",
    liveUrl: "https://what-to-build.niladri.tech",
    githubUrl: "https://github.com/NiladriHazra/WhatToBuild",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Gemini", "GitHub API", "Recharts", "Mermaid", "React Three Fiber"],
    sectionMedia: { built: "/img/wtb.png" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: [
          "WhatToBuild helps developers go from \"I want to build something\" to a clear picture of what already exists, how it's built, and where they could contribute.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        body: [
          "GitHub search is keyword matching. It won't tell you which of fifty similar repos is relevant, how a codebase is laid out, or whether a project is beginner-friendly.",
        ],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "Smart search that ranks repositories by relevance to an idea and suggests AI-generated project ideas with tech stacks.",
          "Deep repo analysis covering structure, stack detection, dependency maps, file summaries and contributor insights, rendered as Mermaid architecture diagrams and charts.",
          "Side-by-side developer comparison, good-first-issue and bounty discovery by language, and a README generator with live preview, AI refinement and one-click PR creation.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: ["Next.js 15 and React 19 in TypeScript (98% of the codebase), Gemini for analysis and summaries, the GitHub API for data, and Recharts, Mermaid and React Three Fiber for visuals."],
      },
      {
        id: "outcome",
        title: "Outcome",
        body: ["74 stars and 11 forks on GitHub, and live for anyone to use."],
      },
    ],
  },
  {
    slug: "filerepo",
    title: "filerepo",
    subtitle: "Get any file or folder from GitHub. No clones, just what you need.",
    demoVideo: "/img/filerepo.png",
    year: "2026",
    category: "CLI · TUI",
    liveUrl: "https://www.npmjs.com/package/@bytehumi/filerepo",
    liveLabel: "npm",
    githubUrl: "https://github.com/NiladriHazra/filerepo",
    stack: ["Go", "Bubble Tea", "GitHub API", "npm"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: [
          "A terminal UI for browsing any GitHub repository and downloading exactly the files you want. Run it with npx @bytehumi/filerepo, nothing to install.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        body: ["To grab one config file or one example folder from a repo, you normally clone the whole thing or click through raw URLs one file at a time."],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "Paste a repo, branch, tag, commit, compare or PR URL and browse it. Switch branches and tags in the TUI, download release assets, and read metadata, README and rate-limit status in-app.",
          "Fuzzy search with filters like ext:go and type:dir. Save selections as files, .zip or .tar.gz, with skip / overwrite / rename / resume conflict handling and a download manifest. It also supports named token profiles (importable from gh), recent repos, pinned favorites and cached trees.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: ["Written in Go, distributed through npm so it runs anywhere Node does."],
      },
    ],
  },
  {
    slug: "maxmem",
    title: "MaxMEM",
    subtitle: "Local-first handoff memory for Codex, Claude Code and OpenCode.",
    demoVideo: "/img/maxmem.jpg",
    year: "2026",
    category: "Dev tool",
    liveUrl: "https://www.npmjs.com/package/@bytehumi/maxmem",
    liveLabel: "npm",
    githubUrl: "https://github.com/NiladriHazra/MaxMEM",
    stack: ["TypeScript", "Bun", "MCP", "Codex hooks", "Claude slash commands", "OpenCode plugin"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: ["MaxMEM turns messy agent session endings into compact, private continuation capsules that the next agent can pick up from, without importing a whole chat transcript."],
      },
      {
        id: "problem",
        title: "The Problem",
        body: ["AI coding agents are strong inside one session and weak at handoffs. Switch from Codex to Claude Code, restart a terminal or compact context, and the next model needs a long recap."],
      },
      {
        id: "built",
        title: "What Was Built",
        body: [
          "Capsules contain only the work state that matters: repo, branch, head, changed files, recent commits, commands, decisions, blockers, next actions and verification steps. Raw chat is off by default.",
          "Durable project memory for decisions and notes, a read history that shows whether context was actually injected, and integrations for Codex hooks, a Codex skill + MCP server, Claude slash commands and an OpenCode plugin.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        body: ["TypeScript on Bun, published to npm as @bytehumi/maxmem. About 2,300 downloads in its first year."],
      },
    ],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((item) => item.slug === slug);
