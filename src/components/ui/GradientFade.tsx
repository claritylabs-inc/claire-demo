"use client";

/**
 * Progressive blur + gradient fade overlay.
 *
 * Covers the full bar area AND the fade-out zone as one continuous element.
 * This eliminates the seam between a backdrop-blur bar and a separate gradient.
 *
 * The blur is strongest at the "solid" end (where the bar content is) and
 * decays smoothly to zero at the trailing edge. An SVG noise texture dithers
 * the color gradient to prevent 8-bit banding.
 *
 * Usage: position this absolutely over the full sticky header or fixed footer,
 * spanning from the top of the bar to the end of the fade zone. The bar
 * element itself should NOT have backdrop-blur — this component replaces it.
 */

interface GradientFadeProps {
  /** "down" = header (solid at top, fades down); "up" = footer (solid at bottom, fades up) */
  direction: "down" | "up";
  /** Tailwind classes for sizing + positioning */
  className?: string;
}

/** Inline SVG noise — dithers gradient to prevent color banding */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

/**
 * Progressive blur layers.
 * Each layer blurs the full area but is masked so it only shows in its region.
 * The percentages are from the "solid" edge (0%) to the "transparent" edge (100%).
 */
const BLUR_LAYERS = [
  { blur: 1,  solidEnd: 100 },
  { blur: 2,  solidEnd: 88 },
  { blur: 4,  solidEnd: 76 },
  { blur: 8,  solidEnd: 68 },
  { blur: 12, solidEnd: 60 },
];

export function GradientFade({ direction, className = "" }: GradientFadeProps) {
  const dir = direction === "down" ? "to bottom" : "to top";

  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Progressive blur layers — no seam since this is one continuous element */}
      {BLUR_LAYERS.map(({ blur, solidEnd }) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(${dir}, black 0%, black ${solidEnd - 20}%, transparent ${solidEnd}%)`,
            WebkitMaskImage: `linear-gradient(${dir}, black 0%, black ${solidEnd - 20}%, transparent ${solidEnd}%)`,
          }}
        />
      ))}
      {/* Color gradient + noise dither — solid in the bar region, fading out */}
      <div
        className="absolute inset-0"
        style={{
          background: `${NOISE_SVG}, linear-gradient(${dir}, rgb(var(--background-rgb) / 0.92) 0%, rgb(var(--background-rgb) / 0.92) 55%, rgb(var(--background-rgb) / 0.78) 68%, rgb(var(--background-rgb) / 0.48) 80%, rgb(var(--background-rgb) / 0.18) 92%, transparent 100%)`,
        }}
      />
    </div>
  );
}
