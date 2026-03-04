"use client";

import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";
import { CHAT_PROMPTS } from "@/data/demoData";
import { MeetClaireHeader } from "@/components/layout/MeetClaireHeader";
import { FixedActionFooter } from "@/components/layout/FixedActionFooter";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { GradientFade } from "@/components/ui/GradientFade";
import { PromptContextSources } from "@/components/views/ContextSources";
import type { ChatMode, PolicyId } from "@/components/chat";

const SUBTITLE =
  "Claire can send certificates, file claims, renew policies, and much more. Just ask via text or email.";

const ANIM_DURATION = 0.4;
const STAGGER_INTERVAL = 0.1;

interface CoverageOverviewProps {
  onOpenChat: (
    mode: ChatMode,
    policyId?: PolicyId,
    promptIndex?: number,
    userFirst?: boolean
  ) => void;
}

export function CoverageOverview({ onOpenChat }: CoverageOverviewProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Scroll container — header sticky inside so content scrolls behind for translucency */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide overscroll-none" style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        <div className="sticky top-0 z-10 shrink-0">
          <div className="relative pt-16 pb-8">
            {/* Progressive blur + color fade — covers bar + fade zone as one element */}
            <GradientFade direction="down" className="absolute inset-0 -bottom-12" />
            {/* Content sits above the blur */}
            <div className="relative">
              <MeetClaireHeader subtitle={SUBTITLE} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 md:gap-8 pt-12 pb-16 mx-4 md:mx-8">
            <FadeIn when={true} delay={0} duration={ANIM_DURATION} className="w-full max-w-sm text-center">
              <p className="text-body-sm text-muted/60">
                Tap any prompt to see how Claire handles it:
              </p>
            </FadeIn>
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
                    className="group w-full rounded-[18px] rounded-br-[4px] bg-primary/90 px-4 py-3 text-left transition-all duration-200 ease-out cursor-pointer hover:bg-primary active:scale-[0.98]"
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
              className="shrink-0 py-3 flex flex-col items-center gap-2"
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

        <Footer />
      </div>

      <FixedActionFooter
        label="Try Claire for Yourself"
        onClick={() => onOpenChat("prompt", undefined, 0, false)}
        animateIn
      />
    </div>
  );
}
