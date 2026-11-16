"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const widths = [32, 48, 24, 40, 56, 28, 44, 36, 52, 30];

interface ScrollIndicatorItem {
  id: string;
  label: string;
  href?: string;
}

interface ScrollIndicatorProps {
  items: ScrollIndicatorItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export default function ScrollIndicator({ items, activeId: externalActiveId, onItemClick }: ScrollIndicatorProps) {
  const router = useRouter();
  const [scrollActiveId, setScrollActiveId] = useState(items[0]?.id || "");

  // derive - external wins if provided, else use scroll-tracked one
  const activeId = externalActiveId ?? scrollActiveId;

  useEffect(() => {
    if (externalActiveId !== undefined) return; // detail page handles its own

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const index = Math.min(Math.floor(progress * items.length), items.length - 1);
      setScrollActiveId(items[index]?.id || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, externalActiveId]);

  const handleClick = (item: ScrollIndicatorItem) => {
    if (item.href) router.push(item.href);
    else onItemClick?.(item.id);
  };

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
      {items.map((item, i) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          title={item.label}
          className="flex items-center justify-end cursor-pointer"
        >
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: activeId === item.id ? widths[i % widths.length] : widths[i % widths.length] * 0.6,
              height: activeId === item.id ? 2.5 : 1.5,
              backgroundColor: activeId === item.id ? "#09090b" : "#a1a1aa",
              opacity: activeId === item.id ? 1 : 0.35,
            }}
          />
        </button>
      ))}
    </div>
  );
}
