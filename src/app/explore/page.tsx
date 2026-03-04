"use client";

import { MeetClaireHeader } from "@/components/layout/MeetClaireHeader";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { USE_CASES } from "@/data/demoData";
import { GradientFade } from "@/components/ui/GradientFade";
import { Footer } from "@/components/layout/Footer";

const SUBTITLE =
  "Explore how Claire can help manage your insurance. Tap an example to see it in action.";

const ANIM_DURATION = 0.4;
const STAGGER_INTERVAL = 0.1;

export default function ExplorePage() {
  const { openChat } = useChatOverlay();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <BackButton href="/" />
      <BookDemoButton onClick={openChat} />

      {/* Single scroll container — header sticky inside so content scrolls behind for translucency */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide overscroll-none"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="sticky top-0 z-10 shrink-0">
          <div className="relative pt-14 pb-6">
            <GradientFade direction="down" className="absolute inset-0 -bottom-12" />
            <div className="relative text-center">
              <MeetClaireHeader subtitle={SUBTITLE} logoSize={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-8 pb-16 max-w-xl mx-auto px-5">
          {USE_CASES.map((item, i) => (
            <FadeIn
              key={item.heading}
              when={true}
              delay={i * STAGGER_INTERVAL}
              duration={ANIM_DURATION}
              direction="up"
              className="w-full"
            >
              {i > 0 && (
                <div className="border-t border-divider/60 my-4" />
              )}
              <div className="py-6">
                <p className="text-brand text-2xl text-foreground-highlight mb-2.5">
                  {item.heading}
                </p>
                <p className="text-body-sm text-muted leading-relaxed">
                  {item.description}
                </p>
                {item.examples.length > 0 && (
                  <div className="mt-6">
                    <p className="text-caption uppercase tracking-wider text-accent/60 font-medium mb-2.5">
                      Examples
                    </p>
                    <div className="relative -mx-4">
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-4">
                        {item.examples.map((example) => (
                          <button
                            key={example.question}
                            type="button"
                            onClick={() =>
                              openChat(
                                example.mode,
                                example.policyId,
                                example.promptIndex,
                                true
                              )
                            }
                            className="rounded-full bg-primary/8 text-primary px-3 py-1.5 text-body-sm whitespace-nowrap shrink-0 max-w-[80vw] overflow-hidden text-ellipsis cursor-pointer hover:bg-primary/15 active:scale-[0.97] transition-all duration-150"
                          >
                            "{example.question}"
                          </button>
                        ))}
                      </div>
                      {/* Edge fade overlays */}
                      <div
                        className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none"
                        style={{
                          background: `linear-gradient(to right, var(--background), transparent)`,
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
                        style={{
                          background: `linear-gradient(to left, var(--background), transparent)`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <Footer />
      </div>

    </div>
  );
}
