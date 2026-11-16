export interface Role {
  org: string;
  href: string;
  title: string;
  note?: string;
  start: string;
  end: string;
  points: string[];
}

export const experience: Role[] = [
  {
    org: "Runable",
    href: "https://runable.com",
    title: "GTM Engineer",
    note: "Joined as the first tech intern",
    start: "Sep 2025",
    end: "Present",
    points: [
      "Built image and video generation, which shipped as the carousel feature.",
      "Led the tech side of an AI UGC pipeline: built it, broke it, rebuilt it. About 80M views across YouTube, TikTok and Instagram in two months.",
      "Ran the company X account and started Runclub, a builder community whose weekly hackathons got 2,500 submissions in two weeks.",
      "Wrote the product docs. Now leading the technical side of scaling the affiliate program.",
    ],
  },
  {
    org: "Long Term Collab (Groimon)",
    href: "https://www.groimon.com",
    title: "Software Developer Intern",
    start: "May 2025",
    end: "Sep 2025",
    points: [
      "Built Instagram DM, comment and story automation with keyword triggers and conditional logic (Next.js, Node.js, AWS).",
      "Cut creators' manual moderation time by 60% and raised DAU engagement by 35% (Redis, Next.js, Node.js).",
      "Shipped an IPL-style gamification system with leaderboards and tasks.",
    ],
  },
  {
    org: "Eastern Coalfields Limited",
    href: "https://www.easterncoal.nic.in/",
    title: "Software Developer Intern",
    start: "Dec 2024",
    end: "Apr 2025",
    points: [
      "Built a hospital appointment system that improved access to appointments by 40% (Next.js, Express, Node.js, AWS).",
      "Led the real-time scheduling work, cutting booking time by 50%.",
    ],
  },
];

export const education = {
  school: "Techno Main Salt Lake",
  href: "https://www.ticollege.ac.in/",
  degree: "B.Tech, Computer Science (AI & ML)",
  start: "2022",
  end: "2026",
  note: "GPA 8.45 / 10",
};

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Swift", "Go", "Python", "SQL"],
  Product: ["Next.js", "React", "Node.js", "Tailwind CSS", "SwiftUI", "Remotion", "FastAPI"],
  AI: ["LLM apps", "Agents & tool use", "Gemini", "OpenRouter", "Content pipelines"],
  Infra: ["Cloudflare", "Vercel", "AWS", "PostgreSQL", "Supabase", "Redis", "Docker"],
};
