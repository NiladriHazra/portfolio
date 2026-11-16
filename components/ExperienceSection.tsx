"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { education, experience } from "@/data/experience";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";

export default function ExperienceSection() {
  const [open, setOpen] = useState<string | null>(experience[0]?.org ?? null);
  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);

  return (
    <div id="experience" className="pt-20 scroll-mt-20">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-zinc-500">Experience</h2>
        <a
          href="/resume.pdf"
          target="_blank"
          onClick={() => playClick()}
          className="px-3 text-sm py-1 bg-zinc-50 border border-zinc-200 w-fit rounded-lg text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Resume ↗
        </a>
      </div>

      <ul className="mt-4 flex flex-col">
        {experience.map((role, i) => {
          const isOpen = open === role.org;
          return (
            <li
              key={role.org}
              className={i < experience.length - 1 ? "border-b border-zinc-500/20" : ""}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onMouseEnter={() => playHover()}
                onClick={() => {
                  playClick();
                  setOpen(isOpen ? null : role.org);
                }}
                className="group/item w-full cursor-pointer py-3 text-left transition-transform duration-300 ease-out hover:-translate-x-0.5"
              >
                <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="list-title text-sm sm:text-base">
                    {role.title} <span className="text-zinc-500">at</span>{" "}
                    <span className="transition-colors group-hover/item:text-blue">{role.org}</span>
                  </span>
                  <span className="list-meta text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {role.start} – {role.end}
                  </span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                    exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4">
                      {role.note && <p className="mb-2 text-sm text-zinc-500">{role.note}</p>}
                      <ul className="flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
                        {role.points.map((p) => (
                          <li key={p} className="flex gap-2 leading-6">
                            <span className="select-none text-zinc-400">–</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-zinc-500">Education</p>
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="list-title text-sm sm:text-base">
          {education.degree} <span className="text-zinc-500">·</span>{" "}
          <a href={education.href} target="_blank" rel="noreferrer" className="hover:text-blue transition-colors">
            {education.school}
          </a>
        </span>
        <span className="list-meta text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
          {education.start} – {education.end} · {education.note}
        </span>
      </div>
    </div>
  );
}
