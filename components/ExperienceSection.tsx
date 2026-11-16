"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, type Role } from "@/data/experience";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";
import { Chevron, LogoTile } from "@/components/RowBits";

const ease = [0.16, 1, 0.3, 1] as const;

function OrgName({ role }: { role: Role }) {
  if (!role.href) return <span>{role.org}</span>;
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

  return (
    <div id="experience" className="pt-14 scroll-mt-20">
      <h2 className="font-sans text-zinc-500">Experience</h2>

      <ul className="mt-3 flex flex-col">
        {experience.map((role, i) => {
          const open = openOrg === role.org;
          return (
            <li key={role.org} className={i < experience.length - 1 ? "border-b border-zinc-200 dark:border-zinc-800" : ""}>
              <div
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={() => {
                  playClick();
                  setOpenOrg(open ? null : role.org);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    playClick();
                    setOpenOrg(open ? null : role.org);
                  }
                }}
                className="group/row flex w-full cursor-pointer items-center gap-3 py-3.5"
              >
                <LogoTile src={role.logo} alt={role.org} />
                <span className="min-w-0 flex-1">
                  <span className="block text-zinc-900 dark:text-zinc-100">
                    <OrgName role={role} />
                  </span>
                  <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                    {role.title} · <span className="tabular-nums">{role.start} – {role.end}</span>
                  </span>
                </span>
                <Chevron open={open} />
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-10 text-zinc-600 dark:text-zinc-400">
                      <p className="leading-7 text-pretty">{role.summary}</p>
                      {role.highlights && (
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {role.highlights.map((h) => (
                            <li key={h.title} className="flex gap-3 leading-6">
                              <span className="w-24 shrink-0 font-mono text-xs leading-6 tabular-nums text-zinc-400">{h.stat}</span>
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
