"use client";

import { BrandName } from "@/components/ui/BrandName";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { FadeIn } from "@/components/ui/FadeIn";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MeetClaireHeaderProps {
  /** Subtitle text below the main title */
  subtitle: string;
  /** Optional class name for the container */
  className?: string;
}

export function MeetClaireHeader({
  subtitle,
  className = "",
}: MeetClaireHeaderProps) {
  const isMobile = useIsMobile();
  const logoSize = isMobile ? 32 : 40;
  return (
    <div className={`text-center shrink-0 overflow-visible ${className}`}>
      <FadeIn when={true} staggerIndex={0} duration={0.5}>
        <h1
          className="text-foreground-highlight"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
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
