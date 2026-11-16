"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Link from "@/components/Link";
import ProjectsSection from "@/components/ProjectsSection";
import ThemeToggle from "@/components/ThemeToggle";
import NextLink from "next/link";
import { site } from "@/data/site";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";
import { useGitHubStars } from "@/hooks/useGitHubStars";

const fadeUp = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Home() {
  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);
  const stars = useGitHubStars();

  return (
    <div className="min-h-screen">
      <Container>
        {/* Header — name + toggle */}
        <motion.div
          className="pt-20"
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-lg">
              {site.name} <span className="text-zinc-400">(Humi)</span>
            </h1>
            <div className="flex items-center gap-3">
              <NextLink
                href="/resume"
                onClick={() => playClick()}
                className="w-fit rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Resume
              </NextLink>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-md text-zinc-500">{site.role}</p>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="home-bio pt-10 flex flex-col gap-2 text-wrap"
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <p>
            I&apos;m Niladri, Humi on the internet. I like making things that people end up
            actually using.
          </p>
          <p>
            Last year I posted a side project called{" "}
            <Link href="/projects/open-fiesta">Open Fiesta</Link> on X. It picked up{" "}
            <Link href="https://github.com/NiladriHazra/Open-Fiesta" external>{(stars["Open-Fiesta"] ?? 958).toLocaleString()} GitHub stars</Link> and 32,000
            users, and a DM that made me Runable&apos;s first tech intern.
          </p>
          <p>
            Now I&apos;m a GTM engineer there, and I&apos;m building{" "}
            <Link href="/projects/klipeo">Klipeo</Link>, a video editor you can just talk to.
          </p>
          <p>
            Everything I make lives on <Link href="https://github.com/NiladriHazra" external>GitHub</Link>. I think
            out loud on <Link href="https://x.com/byteHumi" external>X</Link>, keep it formal on{" "}
            <Link href="https://www.linkedin.com/in/niladri-hazra-b573282a7/" external>LinkedIn</Link>, and read every{" "}
            <Link href={site.cta.href} external>email</Link>.
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <ExperienceSection />
        </motion.div>

        {/* Projects */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <ProjectsSection />
        </motion.div>

        {/* Elsewhere */}
        <motion.div
          className="pt-20"
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <p className="text-zinc-500">Elsewhere</p>
          <p className="mt-1 mb-4">Where to find me online</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            {site.socials.map((social, index) => (
              <div key={social.label} className="flex items-center gap-4">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick()}
                  className="text-zinc-600 dark:text-zinc-300 transition-colors hover:text-blue underline decoration-dotted underline-offset-[3px] decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-blue"
                >
                  {social.label}
                </a>
                {index !== site.socials.length - 1 && (
                  <span className="text-zinc-300 dark:text-zinc-800">·</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <Footer />
        </motion.div>
      </Container>
    </div>
  );
}
