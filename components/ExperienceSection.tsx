"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, type Role } from "@/data/experience";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";

const ease = [0.16, 1, 0.3, 1] as const;

function OrgName({ role }: { role: Role }) {
  if (!role.href) return <>{role.org}</>;
  return (
    <a
      href={role.href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="underline decoration-dotted decoration-zinc-400 underline-offset-[3px] transition-colors hover:text-blue hover:decoration-blue dark:decoration-zinc-600"
    >
      {role.org}
    </a>
  );
}

export default function ExperienceSection() {
  const [openOrg, setOpenOrg] = useState<string | null>(experience[0]?.org ?? null);
  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);

  return (
    <div id="experience" className="pt-14 scroll-mt-20">
      <h2 className="font-sans text-zinc-500">Experience</h2>

      <ul className="group mt-4 flex flex-col">
        {experience.map((role, i) => {
          const open = openOrg === role.org;
          const toggle = () => {
            playClick();
            setOpenOrg(open ? null : role.org);
          };
          return (
            <li
              key={role.org}
              onMouseEnter={() => playHover()}
              className={`group/item ${i < experience.length - 1 ? "border-b border-zinc-500/20" : ""}`}
            >
              <div
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={toggle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                  }
                }}
                className="flex cursor-pointer flex-col gap-1 py-3 transition-transform duration-300 ease-out hover:-translate-x-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <span className="list-title flex items-center gap-2.5 text-sm sm:text-base">
                  <img
                    src={role.logo}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 shrink-0 rounded-[5px] object-contain"
                  />
                  <span>
                    {role.title} <span className="list-meta">at</span> <OrgName role={role} />
                  </span>
                </span>
                <span className="list-meta flex shrink-0 items-center gap-2 whitespace-nowrap pl-7.5 text-sm tabular-nums sm:pl-0">
                  {role.start} – {role.end}
                  <span
                    aria-hidden
                    className={`inline-block w-3 text-center transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </span>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                    exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-7.5 text-zinc-600 dark:text-zinc-400">
                      <p className="leading-7 text-pretty">{role.summary}</p>
                      {role.highlights && (
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {role.highlights.map((h) => (
                            <li key={h.title} className="flex gap-2 leading-7">
                              <span className="select-none text-zinc-400">–</span>
                              <span>
                                <span className="text-zinc-900 dark:text-zinc-100">{h.title}.</span> {h.body}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
