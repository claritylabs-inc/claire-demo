"use client";

import { Logo } from "@/components/Logo";

export type DemoStep = "upload" | "coverage" | "chat";

interface DemoAppBarProps {
  currentStep: DemoStep;
}

export function DemoAppBar({ currentStep: _currentStep }: DemoAppBarProps) {
  return (
    <header className="h-14 shrink-0 flex items-center bg-white/60 backdrop-blur-md border-b border-foreground/6 z-header">
      <div className="max-w-5xl w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo size="sm" />

        {/* Right: Business name */}
        <span className="text-label text-muted hidden sm:block">
          Rosario&apos;s Italian Kitchen
        </span>
      </div>
    </header>
  );
}
