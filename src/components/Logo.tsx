import Link from "next/link";
import { LogoIcon } from "@/components/LogoIcon";

const brandFont = { fontFamily: "var(--font-instrument-serif)" };

const sizeConfig = {
  sm: { text: "text-base", icon: 16, gap: "gap-[2px]" },
  md: { text: "text-lg", icon: 18, gap: "gap-[3px]" },
  lg: { text: "text-xl md:text-2xl", icon: 20, gap: "gap-[4px]" },
} as const;

export interface LogoProps {
  /** Size variant: sm, md, or lg. Default: md */
  size?: keyof typeof sizeConfig;
  /** Optional additional class names */
  className?: string;
  /** Render as span instead of link (e.g. for footer) */
  asSpan?: boolean;
}

export function Logo({
  size = "md",
  className = "",
  asSpan = false,
}: LogoProps) {
  const { text, icon, gap } = sizeConfig[size];
  const content = (
    <>
      <span>clarity</span>
      <LogoIcon size={icon} className="shrink-0" />
      <span>labs</span>
    </>
  );

  const sharedClasses = `inline-flex items-center ${gap} font-medium ${text} ${className}`.trim();

  if (asSpan) {
    return (
      <span className={sharedClasses} style={brandFont}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={sharedClasses}
      style={brandFont}
    >
      {content}
    </Link>
  );
}
