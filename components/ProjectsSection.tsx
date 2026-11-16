"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { featuredIds, projectCards, type ProjectCard } from "@/data/project";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { posterFor } from "@/lib/poster";

const ease = [0.16, 1, 0.3, 1] as const;

/** The project's preview, framed like a small app window. */
function PreviewWindow({ project }: { project: ProjectCard }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#141416] ring-1 ring-black/10 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] dark:ring-white/10">
      <div className="flex items-center gap-3 border-b border-white/8 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="truncate font-mono text-[11px] text-white/55">{project.windowTitle}</span>
      </div>
      <div className="relative aspect-video bg-black">
        {project.mediaType === "video" ? (
          <video
            src={project.media}
            poster={posterFor(project.media)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img src={project.media} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  stars,
  open,
  onToggle,
  onHover,
  last,
}: {
  project: ProjectCard;
  stars?: number;
  open: boolean;
  onToggle: () => void;
  onHover: () => void;
  last: boolean;
}) {
  const playClick = usePortfolioSound("/sounds/click.mp3");
  const hasCaseStudy = project.href.startsWith("/projects/");

  return (
    <li onMouseEnter={onHover} className={`group/item ${last ? "" : "border-b border-zinc-500/20"}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full cursor-pointer flex-col gap-1 py-3 text-left transition-transform duration-300 ease-out hover:-translate-x-0.5 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="list-title flex items-baseline gap-2 text-sm sm:text-base">
          {project.title}
          {stars !== undefined && (
            <span className="list-meta text-xs tabular-nums" title={`${stars.toLocaleString()} GitHub stars`}>
              ★ {stars.toLocaleString()}
            </span>
          )}
        </span>
        <span className="list-meta flex items-center gap-2 text-sm">
          {project.category} · {project.year}
          <span
            aria-hidden
            className={`inline-block w-3 text-center transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1">
              <p className="mb-4 text-zinc-900 dark:text-zinc-100">{project.description}</p>
              <PreviewWindow project={project} />
              <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400 text-pretty">{project.about}</p>
              <p className="mt-3 font-mono text-xs leading-5 text-zinc-500">{project.stack.join("  ·  ")}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {hasCaseStudy && (
                  <NextLink
                    href={`${project.href}?from=home`}
                    onClick={() => playClick()}
                    className="w-fit rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                  >
                    Read more
                  </NextLink>
                )}
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClick()}
                    className="text-zinc-600 underline decoration-dotted decoration-zinc-400 underline-offset-[3px] transition-colors hover:text-blue hover:decoration-blue dark:text-zinc-300 dark:decoration-zinc-600"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);
  const stars = useGitHubStars();

  const shown = isExpanded ? projectCards : projectCards.filter((p) => featuredIds.includes(p.id));

  return (
    <div id="projects" className="pt-14 scroll-mt-20">
      <h2 className="font-sans text-zinc-500">Projects</h2>

      <ul className="group mt-4 flex flex-col">
        {shown.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            stars={project.repo ? stars[project.repo] : undefined}
            open={openId === project.id}
            last={i === shown.length - 1}
            onHover={() => playHover()}
            onToggle={() => {
              playClick();
              setOpenId(openId === project.id ? null : project.id);
            }}
          />
        ))}
      </ul>

      {projectCards.length > featuredIds.length && (
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              playClick();
            }}
            className="w-fit cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        </div>
      )}
    </div>
  );
}
