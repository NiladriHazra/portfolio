export interface SocialLink {
  label: string;
  href: string;
  display: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  url: string;
  metaDescription: string;
  keywords: string[];
  bio: string[];
  cta: {
    label: string;
    href: string;
  };
  socials: SocialLink[];
  lastUpdated: string;
  gaId?: string;
}

export const site: SiteConfig = {
  name: "Niladri Hazra",
  role: "GTM Engineer at Runable",
  location: "Kolkata, India",
  url: "https://niladri.in",
  metaDescription:
    "Niladri Hazra (Humi): engineer who ships products people use. GTM Engineer at Runable, building Klipeo, creator of Open Fiesta.",
  keywords: [
    "Niladri Hazra",
    "Humi",
    "byteHumi",
    "Open Fiesta",
    "Klipeo",
    "Runable",
    "GTM Engineer",
    "full-stack engineer",
    "AI engineer",
    "portfolio",
  ],
  bio: [
    "Hi, I'm Niladri, Humi on the internet. I build products and ship them where people can actually use them.",
    "I built Open Fiesta, an open-source multi-model AI playground. One tweet took it to about 32K users and close to a thousand GitHub stars, and it's how I became Runable's first tech intern.",
    "At Runable I've shipped image and video generation, built an AI UGC pipeline that did about 80M views in two months, and started Runclub, whose hackathons got 2,500 submissions in two weeks. I'm now a GTM Engineer there, and I'm building Klipeo, an AI video editor, on the side.",
  ],
  cta: {
    label: "send me an email",
    href: "mailto:niladrivit@gmail.com",
  },
  socials: [
    { label: "Email", href: "mailto:niladrivit@gmail.com", display: "niladrivit@gmail.com" },
    { label: "X", href: "https://x.com/byteHumi", display: "@byteHumi" },
    { label: "GitHub", href: "https://github.com/NiladriHazra", display: "NiladriHazra" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/niladri-hazra-b573282a7/", display: "Niladri Hazra" },
    { label: "Resume", href: "/resume", display: "resume" },
  ],
  lastUpdated: "November 2026",
};
