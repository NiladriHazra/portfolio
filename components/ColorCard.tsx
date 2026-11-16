"use client";

import { useMemo, useState } from "react";

export type ColorSwatch = {
  role: string;
  hex: string;
};

type ColorCardProps = {
  colors: ColorSwatch[];
  className?: string;
};
const SWATCH_COUNT = 5;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeHex = (value: string) => {
  const cleaned = value.trim().replace(/^#/, "");
  if (!cleaned) return "#000000";

  if (cleaned.length === 3) {
    return `#${cleaned
      .split("")
      .map((char) => `${char}${char}`)
      .join("")
      .toUpperCase()}`;
  }

  return `#${cleaned.slice(0, 6).padEnd(6, "0").toUpperCase()}`;
};

const hexToRgb = (hex: string) => {
  const normalized = normalizeHex(hex).slice(1);
  const int = Number.parseInt(normalized, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const srgbToLinear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const toOklch = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);

  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  const oklabL = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const oklabA = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const oklabB = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

  const c = Math.sqrt(oklabA ** 2 + oklabB ** 2);
  let h = (Math.atan2(oklabB, oklabA) * 180) / Math.PI;
  if (h < 0) h += 360;

  const lPercent = clamp(oklabL * 100, 0, 100);
  return `oklch(${lPercent.toFixed(2)}% ${c.toFixed(4)} ${h.toFixed(1)})`;
};

export default function ColorCard({ colors, className = "" }: ColorCardProps) {
  const initial = useMemo(
    () => {
      const fallback = [
        { role: "Primary", hex: "#1447E6" },
        { role: "Background", hex: "#EAEAEA" },
        { role: "Secondary", hex: "#BFCBDB" },
        { role: "Muted", hex: "#A1A1AA" },
        { role: "Text", hex: "#18181B" },
      ];

      const source = colors.length ? colors.slice(0, SWATCH_COUNT) : fallback;
      const padded = [...source];
      while (padded.length < SWATCH_COUNT) {
        padded.push(fallback[padded.length]);
      }

      return padded.map((color) => ({ ...color, hex: normalizeHex(color.hex) }));
    },
    [colors]
  );

  const [swatches, setSwatches] = useState(initial);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = swatches[activeIndex] ?? swatches[0];
  const activeOklch = toOklch(active.hex);

  const updateActiveHex = (hex: string) => {
    const normalized = normalizeHex(hex);
    setSwatches((prev) => prev.map((item, i) => (i === activeIndex ? { ...item, hex: normalized } : item)));
  };

  return (
    <div className={`w-full rounded-lg pb-2 ${className}`}>
      <div className="case-token-card relative flex h-72 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 p-5 sm:h-72">
        <div className="flex mt-16 items-start gap-4">
          <button
            type="button"
            onClick={() => document.getElementById(`color-picker-${activeIndex}`)?.click()}
            className="h-10 w-10 shrink-0 rounded-md border border-zinc-200"
            style={{ backgroundColor: active.hex }}
            aria-label={`Change ${active.role} color`}
          />
          <div className="space-y-1 text-xs text-zinc-500">
            <p>{activeOklch}</p>
            <p>{active.hex}</p>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-center gap-2">
          {swatches.map((swatch, index) => (
            <button
              key={`${swatch.role}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-5 w-5 rounded-full border transition-transform ${
                index === activeIndex ? "scale-110 border-zinc-500" : "border-zinc-200"
              }`}
              style={{ backgroundColor: swatch.hex }}
              aria-label={`Select ${swatch.role}`}
            />
          ))}
        </div>

        <input
          id={`color-picker-${activeIndex}`}
          type="color"
          value={active.hex}
          onChange={(event) => updateActiveHex(event.target.value)}
          className="sr-only"
          aria-label="Choose color"
        />
      </div>
    </div>
  );
}
