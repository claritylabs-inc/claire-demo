"use client";

import { motion } from "framer-motion";
import { CTA_PHONE, CTA_PHONE_HREF, CTA_EMAIL, CTA_EMAIL_HREF } from "@/data/demoData";

const BUBBLE_TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] } as const;

/** iMessage tapback reaction badge */
function TapbackReaction({ emoji, side }: { emoji: string; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={`absolute -top-2.5 ${side === "left" ? "-right-1" : "-left-1"} w-[22px] h-[22px] rounded-full bg-white shadow-sm border border-black/8 flex items-center justify-center z-10`}
    >
      <span className="text-[11px] leading-none">{emoji}</span>
    </motion.div>
  );
}

/** Incoming (gray) bubble — Claire's messages, left-aligned */
export function IncomingBubble({
  children,
  reaction,
}: {
  children: React.ReactNode;
  reaction?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={BUBBLE_TRANSITION}
      className="flex justify-start"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-bl-[4px] bg-[#e9e9eb] px-3 py-[7px]">
        <div className="text-[13px] leading-[17px] text-black whitespace-pre-line">
          {children}
        </div>
        {reaction && <TapbackReaction emoji={reaction} side="left" />}
      </div>
    </motion.div>
  );
}

/** Outgoing (blue) bubble — user's messages, right-aligned */
export function OutgoingBubble({ text, reaction }: { text: string; reaction?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={BUBBLE_TRANSITION}
      className="flex justify-end"
    >
      <div className="relative max-w-[82%] rounded-[18px] rounded-br-[4px] bg-[#007AFF] px-3 py-[7px]">
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
          className="inline-flex items-center gap-1 text-[12px] text-[#007AFF]"
        >
          {CTA_PHONE}
        </a>
        <a
          href={CTA_EMAIL_HREF}
          className="inline-flex items-center gap-1 text-[12px] text-[#007AFF]"
        >
          {CTA_EMAIL}
        </a>
      </div>
    </IncomingBubble>
  );
}
