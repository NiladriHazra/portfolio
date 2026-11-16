"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/Card";
import { featuredIds, projectCards } from "@/data/project";
import NextLink from "next/link";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";
import { posterFor } from "@/lib/poster";


const ListIcon = ({ active }: { active: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={`transition-colors ${active ? "text-foreground" : "text-zinc-400"}`}
  >
    <rect x="0" y="2" width="16" height="1.5" rx="0.75" fill="currentColor" />
    <rect x="0" y="7.25" width="16" height="1.5" rx="0.75" fill="currentColor" />
    <rect x="0" y="12.5" width="16" height="1.5" rx="0.75" fill="currentColor" />
  </svg>
);

const GridIcon = ({ active }: { active: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={`transition-colors ${active ? "text-foreground" : "text-zinc-400"}`}
  >
    <rect x="0" y="0" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="9" y="0" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="0" y="9" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="9" y="9" width="7" height="7" rx="1.5" fill="currentColor" />
  </svg>
);

export default function ProjectsSection() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverDisabled, setHoverDisabled] = useState(false);

  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);

  const disableHoverTemporarily = () => {
    setHoverDisabled(true);
    setTimeout(() => setHoverDisabled(false), 500);
  };

  const displayedProjects = isExpanded
    ? projectCards.map((p) => ({ ...p, href: p.href.startsWith("/") ? `${p.href}?from=home` : p.href }))
    : projectCards
        .filter((p) => featuredIds.includes(p.id))
        .map((p) => ({ ...p, href: p.href.startsWith("/") ? `${p.href}?from=home` : p.href }));

  return (
    <div id="projects" className="pt-10 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-zinc-500">Projects</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setView("list");
              playClick();
              disableHoverTemporarily();
            }}
            aria-label="List view"
            className="p-1.5 rounded-md cursor-pointer"
          >
            <ListIcon active={view === "list"} />
          </button>
          <button
            onClick={() => {
              setView("grid");
              playClick();
              disableHoverTemporarily();
            }}
            aria-label="Grid view"
            className="p-1.5 rounded-md cursor-pointer"
          >
            <GridIcon active={view === "grid"} />
          </button>
        </div>
      </div>

      {view === "grid" && (
        <motion.div layout className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {view === "list" && (
        <ul className="group mt-3 flex flex-col">
          <AnimatePresence initial={false}>
            {displayedProjects.map((project, i) => {
              const isNew = !featuredIds.includes(project.id);
              const isExternal = project.href.startsWith("http");
              return (
                <motion.li
                  key={project.id}
                  initial={isNew ? { opacity: 0, height: 0 } : false}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => {
                    if (!hoverDisabled) playHover();
                  }}
                  className={`group/item overflow-hidden ${
                    i < displayedProjects.length - 1 ? "border-b border-zinc-200 dark:border-zinc-800" : ""
                  }`}
                >
                  <NextLink
                    href={project.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => playClick()}
                    className="flex items-center gap-3 py-3.5"
                  >
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="size-7 shrink-0 rounded-md border border-zinc-200 bg-white object-contain dark:border-zinc-800"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="grid size-7 shrink-0 place-items-center rounded-md border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {project.title[0].toUpperCase()}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="list-title block">{project.title}</span>
                      <span className="list-meta block text-sm text-pretty">{project.description}</span>
                    </span>
                    <span
                      aria-hidden
                      className="list-meta shrink-0 text-sm transition-transform duration-200 group-hover/item:translate-x-0.5"
                    >
                      {isExternal ? "↗" : "→"}
                    </span>
                  </NextLink>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      {projectCards.length > featuredIds.length && (
        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              playClick();
              disableHoverTemporarily();
            }}
            className="px-3 text-sm py-1 bg-zinc-50 border border-zinc-200 w-fit rounded-lg text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        </div>
      )}

      {/* Preload posters for non-featured projects so they appear instantly when expanded */}
      <div className="hidden" aria-hidden="true">
        {projectCards
          .filter((p) => !featuredIds.includes(p.id) && p.mediaType === "video")
          .map((p) => (
            <img key={`preload-${p.id}`} src={posterFor(p.media)} alt="" />
          ))}
      </div>
    </div>
  );
}
