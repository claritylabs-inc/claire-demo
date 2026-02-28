"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";
import { CHAT_PROMPTS } from "@/data/demoData";
import { MeetClaireHeader } from "./MeetClaireHeader";
import { FixedActionFooter } from "./FixedActionFooter";
import { FadeIn } from "@/components/FadeIn";
import { PromptContextSources } from "./ContextSources";
import type { ChatMode, PolicyId } from "./chat";

const SUBTITLE =
  "Claire understands your business context and your policies. Just send a text.";

const ANIM_DURATION = 0.4;
const STAGGER_INTERVAL = 0.1;

interface CoverageStepMobileProps {
  onOpenChat: (
    mode: ChatMode,
    policyId?: PolicyId,
    promptIndex?: number,
    userFirst?: boolean
  ) => void;
  onBookDemo?: () => void;
}

export function CoverageStepMobile({ onOpenChat }: CoverageStepMobileProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bottomGradient = (
    <div
      className="fixed left-0 right-0 bottom-0 h-24 z-30 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, transparent, var(--background))`,
      }}
    />
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Single scroll container — header sticky inside so content scrolls behind for translucency */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide overscroll-none" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        <div className="sticky top-0 z-10 pt-16 pb-8 bg-background/85 backdrop-blur-md shrink-0">
          <MeetClaireHeader subtitle={SUBTITLE} logoSize={32} />
          {/* Gradient softens the bottom edge of the header — multiple stops reduce banding */}
          <div
            className="absolute left-0 right-0 -bottom-12 h-12 pointer-events-none backdrop-blur-md"
            style={{
              background: `linear-gradient(to bottom, rgb(var(--background-rgb) / 0.85) 0%, rgb(var(--background-rgb) / 0.55) 35%, rgb(var(--background-rgb) / 0.25) 65%, rgb(var(--background-rgb) / 0) 100%)`,
            }}
          />     
        </div>
        <div className="flex flex-col items-center gap-4 pt-8 pb-32 mx-4 md:mx-8">
            {CHAT_PROMPTS.map((prompt, i) => (
              <FadeIn
                key={i}
                when={true}
                delay={i * STAGGER_INTERVAL}
                duration={ANIM_DURATION}
                direction="up"
                className="w-full max-w-sm"
              >
                <div className="flex flex-col gap-2 overflow-visible">
                  {/* Heading + context sources outside bubble */}
                  <div className="flex items-center justify-between gap-2 px-1 overflow-visible">
                    {prompt.heading ? (
                      <p className="text-label font-medium text-foreground/60">
                        {prompt.heading}
                      </p>
                    ) : (
                      <span />
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-label font-medium text-foreground/40">
                        Sources:
                      </span>
                      <PromptContextSources sources={prompt.sources} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenChat("prompt", undefined, i, true)}
                    className="group w-full rounded-[18px] rounded-br-[4px] bg-primary/90 px-4 py-3 text-left transition-all cursor-pointer hover:bg-primary/14 hover:border-primary/25 hover:shadow-md active:shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex-1 min-w-0 text-body-sm font-medium text-white leading-snug">
                        {prompt.question}
                      </p>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-all">
                        <FaPaperPlane className="w-3 h-3 -ml-0.5" aria-hidden />
                      </span>
                    </div>
                  </button>
                </div>
              </FadeIn>
            ))}
            <FadeIn
              when={true}
              delay={CHAT_PROMPTS.length * STAGGER_INTERVAL}
              duration={ANIM_DURATION}
              className="shrink-0 py-3 text-center"
            >
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 text-body-sm text-muted hover:text-foreground transition-colors font-medium"
              >
                  <span>And much more</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeIn>
        </div>
      </div>

      {/* Bottom gradient — fixed to viewport via portal, content fades before CTA bar */}
      {mounted && createPortal(bottomGradient, document.body)}

      <FixedActionFooter
        label="Try Claire for Yourself"
        onClick={() => onOpenChat("prompt", undefined, 0, false)}
        animateIn
      />
    </div>
  );
}
