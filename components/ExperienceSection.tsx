"use client";

import { experience, type Role } from "@/data/experience";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={28}
      height={28}
      className="size-7 shrink-0 rounded-md border border-zinc-200 bg-white object-contain dark:border-zinc-800"
    />
  );
}

function OrgName({ role }: { role: Role }) {
  const playClick = usePortfolioSound("/sounds/click.mp3");
  if (!role.href) return <span>{role.org}</span>;
  return (
    <a
      href={role.href}
      target="_blank"
      rel="noreferrer"
      onClick={() => playClick()}
      className="underline decoration-dotted decoration-zinc-400 underline-offset-[3px] transition-colors hover:text-blue hover:decoration-blue dark:decoration-zinc-600"
    >
      {role.org}
    </a>
  );
}

export default function ExperienceSection() {
  return (
    <div id="experience" className="pt-14 scroll-mt-20">
      <h2 className="font-sans text-zinc-500">Experience</h2>

      <ul className="mt-5 flex flex-col gap-8">
        {experience.map((role) => (
          <li key={role.org}>
            <div className="flex items-start gap-3">
              <Logo src={role.logo} alt={role.org} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <p className="text-zinc-900 dark:text-zinc-100">
                    {role.title} <span className="text-zinc-400">at</span> <OrgName role={role} />
                  </p>
                  <p className="shrink-0 text-sm tabular-nums text-zinc-500">
                    {role.start} – {role.end}
                  </p>
                </div>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-pretty">{role.summary}</p>
              </div>
            </div>

            {role.highlights && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:pl-10">
                {role.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{h.title}</p>
                      <p className="text-xs tabular-nums text-zinc-500">{h.stat}</p>
                    </div>
                    <p className="mt-1.5 text-sm leading-5 text-zinc-600 dark:text-zinc-400">{h.body}</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
