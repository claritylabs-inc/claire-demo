const brandFont = { fontFamily: "var(--font-instrument-serif)" };

export interface BrandNameProps {
  children: React.ReactNode;
  /** Optional additional class names */
  className?: string;
}

export function BrandName({ children, className = "" }: BrandNameProps) {
  return (
    <a
      href="https://claire.claritylabs.inc/"
      target="_blank"
      rel="noopener noreferrer"
      style={brandFont}
      className={`font-medium text-foreground-highlight ${className}`.trim()}
    >
      {children}
    </a>
  );
}
