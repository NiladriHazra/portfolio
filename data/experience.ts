export interface Highlight {
  title: string;
  stat: string;
  body: string;
}

export interface Role {
  org: string;
  /** Omit to render the company name as plain text. */
  href?: string;
  logo: string;
  title: string;
  start: string;
  end: string;
  summary: string;
  highlights?: Highlight[];
}

export const experience: Role[] = [
  {
    org: "Runable",
    logo: "/logos/runable.png",
    title: "GTM Engineer",
    start: "Sep 2025",
    end: "Present",
    summary:
      "Joined as the first tech intern after Open Fiesta. Now I build product and lead the tech side of the affiliate program.",
    highlights: [
      { title: "Carousels", stat: "shipped", body: "Image and video generation, which became the carousel feature." },
      { title: "AI UGC", stat: "80M views", body: "A content pipeline posting to YouTube, TikTok and Instagram. 80M views in two months." },
      { title: "Runclub", stat: "2.5K entries", body: "A builder community I started. Weekly hackathons, 2,500 submissions in two weeks." },
    ],
  },
  {
    org: "Long Term Collab",
    logo: "/logos/groimon.svg",
    title: "Software Developer Intern",
    start: "May 2025",
    end: "Sep 2025",
    summary: "Instagram DM and comment automation for creators. Cut manual moderation by 60% and lifted DAU engagement by 35%.",
  },
  {
    org: "Eastern Coalfields Limited",
    logo: "/logos/ecl.png",
    title: "Software Developer Intern",
    start: "Dec 2024",
    end: "Apr 2025",
    summary: "A hospital appointment system with real-time scheduling. Booking time down 50%.",
  },
];
