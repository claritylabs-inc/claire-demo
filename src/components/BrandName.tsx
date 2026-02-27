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
      className={`text-lg font-semibold tracking-wide ${className}`.trim()}
    >
      {children}
    </span>
  );
}
