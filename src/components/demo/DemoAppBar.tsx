"use client";

import { Logo } from "@/components/Logo";

export type DemoStep = "upload" | "coverage" | "chat";

const STEPS: { key: DemoStep; label: string }[] = [
  { key: "upload", label: "Upload" },
  { key: "coverage", label: "Coverage" },
  { key: "chat", label: "Chat" },
];

function stepIndex(step: DemoStep): number {
  return STEPS.findIndex((s) => s.key === step);
}

interface DemoAppBarProps {
  currentStep: DemoStep;
}

export function DemoAppBar({ currentStep }: DemoAppBarProps) {
  const activeIdx = stepIndex(currentStep);

  return (
    <header className="h-14 shrink-0 flex items-center bg-white/60 backdrop-blur-md border-b border-foreground/6 z-header">
      <div className="max-w-5xl w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo size="sm" />

        {/* Center: Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.key} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= activeIdx
                    ? "bg-[#A0D2FA] scale-110"
                    : "bg-foreground/15"
                }`}
              />
              {i < STEPS.length - 1 && (
                <div
                  className={`w-6 h-px transition-colors duration-300 ${
                    i < activeIdx ? "bg-[#A0D2FA]" : "bg-foreground/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right: Business name */}
        <span className="text-xs text-muted hidden sm:block">
          Rosario&apos;s Italian Kitchen
        </span>
      </div>
    </header>
  );
}
