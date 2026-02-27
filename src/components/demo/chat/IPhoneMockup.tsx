"use client";

export function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[320px] h-[400px] sm:h-[520px] rounded-2xl border border-foreground/8 bg-background overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden relative min-h-0 p-4">{children}</div>
    </div>
  );
}
