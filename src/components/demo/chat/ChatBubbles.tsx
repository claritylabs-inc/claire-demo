"use client";

import { motion } from "framer-motion";
import { CTA_PHONE, CTA_PHONE_HREF, CTA_EMAIL, CTA_EMAIL_HREF } from "@/data/demoData";

const BUBBLE_BLUE = "#2A97FF";

/** iMessage-style tapback reaction badge — translucent, with second-bubble effect and bouncy animation */
function TapbackReaction({ emoji, side }: { emoji: string; side: "left" | "right" }) {
  const isLeft = side === "left";
  const springBounce = { type: "spring" as const, stiffness: 380, damping: 11 };
  const springBubble2 = { type: "spring" as const, stiffness: 360, damping: 13, delay: 0.05 };
  const springBubble3 = { type: "spring" as const, stiffness: 340, damping: 15, delay: 0.1 };

  return (
    <div
      className={`absolute -top-3 z-10 ${isLeft ? "-right-1" : "-left-1"}`}
    >
      <div className={`relative flex items-end ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        {/* Main reaction bubble — translucent blue, speech-bubble shape */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springBounce}
          className={`
            flex items-center justify-center
            min-w-[28px] min-h-[28px] px-2 py-1.5
            rounded-[14px] shadow-sm backdrop-blur-sm
            ${isLeft ? "rounded-br-[5px]" : "rounded-bl-[5px]"}
          `}
          style={{ backgroundColor: `${BUBBLE_BLUE}` }}
        >
          <span className="text-[13px] leading-none select-none">{emoji}</span>
        </motion.div>

        {/* Second-bubble dots — iOS thought-bubble style */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springBubble2}
          className={`absolute w-2 h-2 rounded-full ${isLeft ? "right-[-2px] bottom-[-2px]" : "left-[-6px] bottom-[-2px]"}`}
          style={{ backgroundColor: `${BUBBLE_BLUE}` }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springBubble3}
          className={`absolute w-1.5 h-1.5 rounded-full ${isLeft ? "right-[-5px] bottom-[-5px]" : "left-[-10px] bottom-[-4px]"}`}
          style={{ backgroundColor: `${BUBBLE_BLUE}` }}
        />
      </div>
    </div>
  );
}

const BUBBLE_ENTER = {
  initial: { opacity: 0, scale: 0.96, y: 4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
} as const;

/** Incoming (gray) bubble — Claire's messages, left-aligned. Handles typing state for smooth content transition. */
export function IncomingBubble({
  children,
  reaction,
  status = "ready",
}: {
  children: React.ReactNode;
  reaction?: string;
  status?: "typing" | "ready";
}) {
  const isTyping = status === "typing";

  return (
    <motion.div
      initial={BUBBLE_ENTER.initial}
      animate={{
        ...BUBBLE_ENTER.animate,
        marginTop: reaction ? 14 : 0,
      }}
      transition={{
        ...BUBBLE_ENTER.transition,
        marginTop: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      className="flex justify-start"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-[7px] min-h-[30px]">
        {isTyping ? (
          <div className="flex items-center gap-[3px] py-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] leading-[17px] text-black whitespace-pre-line"
          >
            {children}
          </motion.div>
        )}
        {reaction && !isTyping && <TapbackReaction emoji={reaction} side="left" />}
      </div>
    </motion.div>
  );
}

/** Outgoing (blue) bubble — user's messages, right-aligned */
export function OutgoingBubble({ text, reaction }: { text: string; reaction?: string }) {
  return (
    <motion.div
      initial={BUBBLE_ENTER.initial}
      animate={{
        ...BUBBLE_ENTER.animate,
        marginTop: reaction ? 14 : 0,
      }}
      transition={{
        ...BUBBLE_ENTER.transition,
        marginTop: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      className="flex justify-end"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-br-[4px] px-3 py-[7px]" style={{ backgroundColor: BUBBLE_BLUE }}>
        <p className="text-[13px] leading-[17px] text-white whitespace-pre-line">{text}</p>
        {reaction && <TapbackReaction emoji={reaction} side="right" />}
      </div>
    </motion.div>
  );
}

/** Typing indicator — three bouncing dots in a gray bubble */
export function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex justify-start"
    >
      <div className="rounded-[18px] rounded-bl-[4px] bg-[#e9e9eb] px-4 py-[10px]">
        <div className="flex items-center gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[7px] h-[7px] rounded-full bg-[#8e8e93]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** CTA bubble — looks like a normal incoming message with contact links */
export function CTAIncoming() {
  return (
    <IncomingBubble>
      <span>Text or email me anytime — I&apos;m here 24/7.</span>
      <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-black/8">
        <a
          href={CTA_PHONE_HREF}
          className="inline-flex items-center gap-1 text-[12px] text-[#2A97FF]"
        >
          {CTA_PHONE}
        </a>
        <a
          href={CTA_EMAIL_HREF}
          className="inline-flex items-center gap-1 text-[12px] text-[#2A97FF]"
        >
          {CTA_EMAIL}
        </a>
      </div>
    </IncomingBubble>
  );
}
