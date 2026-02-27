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
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{
        background: "rgba(250, 248, 244, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-3xl border-x border-gray-200 mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center ">
        <div className="max-w-xl mx-auto w-full">
        <Logo size={logoSize} />
        </div>
      </div>
    </header>
  );
}
