const brandFont = { fontFamily: "var(--font-instrument-serif)" };

export interface BrandNameProps {
  children: React.ReactNode;
  /** Optional additional class names */
  className?: string;
}

export function BrandName({ children, className = "" }: BrandNameProps) {
  return (
    <span
      style={brandFont}
      className={`text-lg font-medium text-foreground-highlight ${className}`.trim()}
    >
      {children}
    </span>
  );
}
