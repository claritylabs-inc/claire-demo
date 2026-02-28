"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Message } from "./useChatScript";
import { IncomingBubble, OutgoingBubble } from "./ChatBubbles";

interface MessageRendererProps {
  messages: Message[];
  cycle: number;
  isFadingOut?: boolean;
}

export function MessageRenderer({ messages, cycle, isFadingOut = false }: MessageRendererProps) {
  return (
    <motion.div
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-[12px]"
    >
      <AnimatePresence mode="popLayout">
      {messages.map((msg, i) => {
        if (msg.type === "incoming") {
          return (
            <IncomingBubble
              key={`${cycle}-in-${i}`}
              reaction={msg.reaction}
              status={msg.status}
            >
              {msg.text}
            </IncomingBubble>
          );
        }
        if (msg.type === "outgoing") {
          return (
            <OutgoingBubble
              key={`${cycle}-out-${i}`}
              text={msg.text}
              reaction={msg.reaction}
            />
          );
        }
        return null;
      })}
      </AnimatePresence>
    </motion.div>
  );
}
