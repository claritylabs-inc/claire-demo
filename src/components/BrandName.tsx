import Link from "next/link";

const brandFont = { fontFamily: "var(--font-instrument-serif)" };

export interface BrandNameProps {
  children: React.ReactNode;
  /** Optional additional class names */
  className?: string;
}

export function BrandName({ children, className = "" }: BrandNameProps) {
  return (
    <Link
      href="/"
      style={brandFont}
      className={`font-medium text-foreground-highlight ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
