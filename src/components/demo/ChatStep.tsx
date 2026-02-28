"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useChatScript,
  IPhoneMockup,
  ChatStepCTA,
  MessageRenderer,
  TryClaireHeading,
  type ChatMode,
  type PolicyId,
} from "./chat";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ChatStepProps {
  mode?: ChatMode;
  policyId?: PolicyId | null;
}

export function ChatStep({ mode = "contact", policyId = null }: ChatStepProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const { messages, cycle, isFadingOut } = useChatScript(mode, policyId);

  useEffect(() => {
    const scrollToBottom = () => {
      const el = scrollRef.current;
      const anchor = bottomAnchorRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
      anchor?.scrollIntoView({ behavior: "auto", block: "end" });
    };
    scrollToBottom();
    setShowTopFade(false);
    const raf = requestAnimationFrame(() => scrollToBottom());
    const t = setTimeout(scrollToBottom, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowTopFade(el.scrollTop > 4);
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-1 flex items-start md:items-center justify-center px-4 md:px-8 py-4 sm:pb-8 overflow-y-auto min-h-0">
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-12 lg:gap-16 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {/* Mobile: heading above phone mockup */}
        <div className="order-first block md:hidden w-full shrink-0 text-center pb-2">
          <TryClaireHeading />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <IPhoneMockup>
            <div className="relative min-h-0 flex-1 flex flex-col">
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2.5 pt-1 pb-2 flex flex-col gap-[12px] scrollbar-hide overscroll-none"
              >
                <MessageRenderer messages={messages} cycle={cycle} isFadingOut={isFadingOut} />
                <div ref={bottomAnchorRef} className="shrink-0 h-px" aria-hidden />
              </div>
              {/* Top fade — only visible when scrolled up */}
              <div
                className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-10 transition-opacity duration-200"
                style={{
                  opacity: showTopFade ? 1 : 0,
                  background:
                    "linear-gradient(to bottom, rgb(var(--background-rgb) / 0.98) 0%, rgb(var(--background-rgb) / 0.5) 70%, transparent 100%)",
                }}
                aria-hidden
              />
            </div>
          </IPhoneMockup>
        </motion.div>

        <ChatStepCTA />
      </div>
    </div>
  );
}
