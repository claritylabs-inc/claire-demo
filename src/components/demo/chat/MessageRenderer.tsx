"use client";

import { AnimatePresence } from "framer-motion";
import type { Message } from "./useChatScript";
import {
  IncomingBubble,
  OutgoingBubble,
  TypingBubble,
} from "./ChatBubbles";

interface MessageRendererProps {
  messages: Message[];
  cycle: number;
}

export function MessageRenderer({ messages, cycle }: MessageRendererProps) {
  return (
    <AnimatePresence mode="popLayout">
      {messages.map((msg, i) => {
        if (msg.type === "incoming") {
          return (
            <IncomingBubble key={`${cycle}-in-${i}`} reaction={msg.reaction}>
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
        if (msg.type === "typing") {
          return <TypingBubble key={`${cycle}-typing`} />;
        }
        return null;
      })}
    </AnimatePresence>
  );
}
