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
      className={`fixed top-0 left-0 right-0 z-header bg-background/75 backdrop-blur-sm border-b border-foreground/6 ${className}`}
    >
      <div className="max-w-3xl border-x border-gray-200 mx-auto px-6 md:px-10 h-16 md:h-18 flex items-center ">
        <div className="max-w-xl mx-auto w-full">
        <Logo size={logoSize} />
        </div>
      </div>
    </header>
  );
}
