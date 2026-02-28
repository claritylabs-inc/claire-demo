import { Logo } from "@/components/Logo";

export interface HeaderProps {
  /** Logo size variant. Default: lg for prominent header */
  logoSize?: "sm" | "md" | "lg";
  /** Optional additional class names for the nav */
  className?: string;
}

export function Header({ logoSize = "lg", className = "" }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header bg-background/75 backdrop-blur-sm border-b border-foreground/6 isolate ${className}`}
    >
      <div className="max-w-3xl border-x border-foreground/6 mx-auto px-6 md:px-10 h-16 md:h-18 flex items-center ">
        <div className="max-w-xl mx-auto w-full flex items-center justify-between">
          <Logo size={logoSize} />
          <a
            href="https://claire.claritylabs.inc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-muted border border-foreground/15 rounded-full px-4 py-1.5 hover:text-foreground-highlight hover:border-foreground/30 transition-colors"
          >
            Demo
          </a>
        </div>
      </div>
    </header>
  );
}
