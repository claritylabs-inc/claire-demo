"use client";

import { BrandName } from "@/components/BrandName";
import { LogoIcon } from "@/components/LogoIcon";
import { FadeIn } from "@/components/FadeIn";

interface MeetClaireHeaderProps {
  /** Subtitle text below the main title */
  subtitle: string;
  /** Optional class name for the container */
  className?: string;
  /** Logo size (default 32 on mobile, 40 on desktop) */
  logoSize?: number;
}

export function MeetClaireHeader({
  subtitle,
  className = "",
  logoSize = 32,
}: MeetClaireHeaderProps) {
  return (
    <div className={`text-center shrink-0 overflow-visible ${className}`}>
      <FadeIn when={true} staggerIndex={0} duration={0.5}>
        <h1
          className="text-foreground-highlight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <BrandName className="inline-flex items-center gap-2 text-4xl md:text-5xl">
            Meet <LogoIcon size={logoSize} className="shrink-0 ml-2" spinOnHover /> Claire
          </BrandName>
        </h1>
      </FadeIn>
      <FadeIn when={true} staggerIndex={1} duration={0.5}>
        <p className="text-muted max-w-xs md:max-w-md mx-auto -mt-12">
          {subtitle}
        </p>
      </FadeIn>
    </div>
  );
}
