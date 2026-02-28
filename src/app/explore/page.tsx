"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MeetClaireHeader } from "@/components/demo/MeetClaireHeader";
import { USE_CASES } from "@/data/demoData";

const SUBTITLE =
  "All the ways you can use Claire. Just send a text and get things done.";

export default function ExplorePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col bg-background text-foreground"
    >
      {/* Fixed header — glassy */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-14 pb-6 px-4 bg-background/70 backdrop-blur-xl border-b border-foreground/5">
        <Link
          href="/"
          className="absolute top-5 left-4 flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to demo</span>
        </Link>
        <motion.div style={{ opacity: headerOpacity }} className="text-center">
          <MeetClaireHeader subtitle={SUBTITLE} logoSize={28} />
        </motion.div>
      </div>

      {/* Scrollable content — fades in as you scroll */}
      <div className="flex-1 pt-48 pb-20 px-4">
        <motion.div
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0.02, 0.12, 0.75, 0.92],
              [0.4, 1, 1, 0.35]
            ),
          }}
          className="max-w-md mx-auto space-y-4"
        >
          {USE_CASES.map((item, i) => (
            <motion.div
              key={item.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-xl border border-foreground/6 bg-white/50 backdrop-blur-md px-4 py-3.5 shadow-sm"
            >
              <h3 className="text-body-sm font-semibold text-foreground mb-1">
                {item.heading}
              </h3>
              <p className="text-label text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade overlay — glassy */}
      <div
        className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-30"
        style={{
          background:
            "linear-gradient(to top, rgb(var(--background-rgb) / 0.95) 0%, rgb(var(--background-rgb) / 0.4) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
