"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export default function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!itemIds.length) return;

    const sections = itemIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [itemIds]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <aside className={`hidden w-56 lg:block xl:w-64 ${className}`}>
      <p className="mb-3 flex items-center gap-2 text-zinc-500">
        <span className="text-sm">☰</span>
        <span className="text-base leading-none">On this page</span>
      </p>

      <ul className="space-y-1.5">
        {items.map((item, i) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`group flex w-full items-center gap-3 text-left transition-colors duration-300 ${
                  isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <span className="relative h-px w-5 overflow-hidden bg-zinc-300 dark:bg-zinc-700">
                  <span
                    className={`absolute inset-0 bg-zinc-900 dark:bg-zinc-100 transition-transform duration-300 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
                <span className="text-sm leading-none">{item.label}</span>
              </button>

              {i < items.length - 1 && (
                <div aria-hidden className="mt-1 flex flex-col gap-1.5">
                  <span className="h-px w-3.5 bg-zinc-300 dark:bg-zinc-700" />
                  <span className="h-px w-3.5 bg-zinc-300 dark:bg-zinc-700" />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
