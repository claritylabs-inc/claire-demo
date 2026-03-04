"use client";

import { motion } from "framer-motion";
import { MeetClaireHeader } from "@/components/layout/MeetClaireHeader";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { USE_CASES } from "@/data/demoData";
import { BrandName } from "@/components/ui/BrandName";
import { Footer } from "@/components/layout/Footer";

const SUBTITLE =
  "All the ways you can use Claire. Just send a text and get things done.";

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
        <div className="sticky top-0 z-10 pt-14 pb-6 bg-background/75 backdrop-blur-md shrink-0">
          <div className="text-center">
            <MeetClaireHeader subtitle={SUBTITLE} logoSize={32} />
          </div>
          {/* Gradient softens the bottom edge of the header */}
          <div
            className="absolute left-0 right-0 -bottom-12 h-12 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, rgb(var(--background-rgb) / 0.75) 0%, rgb(var(--background-rgb) / 0.4) 50%, transparent 100%)`,
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 pb-16 mx-4 md:mx-8">
          {USE_CASES.map((item, i) => (
            <FadeIn
              key={item.heading}
              when={true}
              delay={i * STAGGER_INTERVAL}
              duration={ANIM_DURATION}
              direction="up"
              className="w-full max-w-sm"
            >
              <motion.div
                className="group rounded-xl border border-foreground/6 bg-white/60 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/80 hover:border-foreground/10 hover:shadow-md cursor-default"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="leading-relaxed text-foreground">
                  <BrandName>{item.heading}</BrandName>
                </h3>
                <p className="text-label text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <Footer />
      </div>

    </div>
  );
}
