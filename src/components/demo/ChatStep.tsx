"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useChatScript,
  IPhoneMockup,
  ChatStepCTA,
  MessageRenderer,
  TryClaireHeading,
} from "./chat";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ChatStep() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, cycle, isFadingOut } = useChatScript();

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

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
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto overflow-x-hidden px-2.5 py-1 flex flex-col gap-[12px] scrollbar-hide"
            >
              <MessageRenderer messages={messages} cycle={cycle} isFadingOut={isFadingOut} />
            </div>
          </IPhoneMockup>
        </motion.div>

        <ChatStepCTA />
      </div>
    </div>
  );
}
