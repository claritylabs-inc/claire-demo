"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MeetClaireHeader } from "@/components/demo/MeetClaireHeader";
import { BackToClarityButton } from "@/components/demo/BackToClarityButton";
import { BookDemoButton } from "@/components/demo/BookDemoButton";
import { FadeIn } from "@/components/FadeIn";
import { USE_CASES } from "@/data/demoData";
import { BrandName } from "@/components/BrandName";

const SUBTITLE =
  "All the ways you can use Claire. Just send a text and get things done.";

const ANIM_DURATION = 0.4;
const STAGGER_INTERVAL = 0.1;

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
    <div className="flex flex-col min-h-screen overflow-hidden relative bg-background text-foreground">
      <BackToClarityButton href="/" />
      <BookDemoButton onClick={() => router.push("/")} />

      {/* Fixed translucent header — no border, gradient softens bottom edge */}
      <header className="fixed top-0 left-0 right-0 z-40 pt-14 pb-6 px-4 bg-background/75 backdrop-blur-md">
        <div className="text-center">
          <MeetClaireHeader subtitle={SUBTITLE} logoSize={32} />
        </div>
        {/* Top gradient — softens header bottom edge into content */}
        <div
          className="absolute left-0 right-0 -bottom-12 h-12 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgb(var(--background-rgb) / 0.75) 0%, rgb(var(--background-rgb) / 0.4) 50%, transparent 100%)`,
          }}
        />
      </header>

      {/* Scrollable content — padding-top accounts for fixed header */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide overscroll-none pt-56"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="flex flex-col items-center gap-4 pb-32 mx-4 md:mx-8">
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
      </div>

      {/* Bottom gradient — fixed to viewport via portal */}
      {mounted && createPortal(bottomGradient, document.body)}
    </div>
  );
}
