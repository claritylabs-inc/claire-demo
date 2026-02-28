"use client";

import { useState, useEffect } from "react";
import { CHAT_PROMPTS } from "@/data/demoData";

/* ---------- Types ---------- */

export type Message =
  | { type: "incoming"; text: string; reaction?: string; status?: "typing" | "ready" }
  | { type: "outgoing"; text: string; reaction?: string };

interface ScriptStep {
  action: "add" | "update-incoming" | "react";
  message?: Message;
  delay: number;
  updateIndex?: number;
  reactIndex?: number;
  reactEmoji?: string;
  /** When true, replace all messages (used for loop reset to avoid empty-state layout shift) */
  replace?: boolean;
}

/* ---------- Script timing constants ---------- */

const DELAY_AFTER_USER_MSG = 1800;
const TYPING_DURATION = 400;
const RESPONSE_DELAY = 1100;
const REACTION_DELAY = 1200;
const SCRIPT_END_PAUSE = 5500;
const FADE_OUT_DURATION = 450;

/* ---------- Script builder ---------- */

/* Shorter demo content for compact chat UI */
const DEMO_QUESTIONS = [
  "Can you get proof of insurance for our lease renewal?",
  "Do we have food liability coverage for Dell?",
];
const DEMO_ANSWERS = [
  "Your Hartford CGL meets Greystar's $1M requirement. I've sent the COI — you're all set.",
  "Yes — Hartford CGL covers Products/Completed Ops ($2M) and Liquor Liability ($1M). I can send Dell a COI.",
];

function buildScript(prompts = CHAT_PROMPTS.slice(0, 2)): ScriptStep[] {
  const steps: ScriptStep[] = [];
  let t = 0;
  let msgCount = 0;

  // Opening Claire greeting — small delay so it animates in after chat is ready
  const FIRST_MSG_DELAY = 250;
  steps.push({
    action: "add",
    message: {
      type: "incoming",
      text: "Hi! I've analyzed your policies. What can I help with?",
      status: "ready",
    },
    delay: FIRST_MSG_DELAY,
    replace: true,
  });
  t = FIRST_MSG_DELAY;
  msgCount++;

  for (let pi = 0; pi < prompts.length; pi++) {
    const prompt = prompts[pi];

    t += DELAY_AFTER_USER_MSG;
    const question = DEMO_QUESTIONS[pi] ?? prompt.question;
    steps.push({
      action: "add",
      message: { type: "outgoing", text: question },
      delay: t,
    });
    msgCount++;

    t += TYPING_DURATION;
    const responseIdx = msgCount;
    steps.push({
      action: "add",
      message: { type: "incoming", text: "", status: "typing" },
      delay: t,
    });
    msgCount++;

    t += RESPONSE_DELAY;
    const answer = DEMO_ANSWERS[pi] ?? prompt.answer;
    steps.push({
      action: "update-incoming",
      message: { type: "incoming", text: answer, status: "ready" },
      delay: t,
      updateIndex: responseIdx,
    });

    t += REACTION_DELAY;
    const emoji = pi === 0 ? "\u2764\uFE0F" : "\uD83D\uDC4D";
    steps.push({ action: "react", delay: t, reactIndex: responseIdx, reactEmoji: emoji });
  }

  return steps;
}

const SCRIPT = buildScript();
export const SCRIPT_DURATION = SCRIPT[SCRIPT.length - 1].delay + SCRIPT_END_PAUSE;

/* ---------- Hook ---------- */

const FIRST_MESSAGE = SCRIPT.find((s) => s.replace && s.message)!.message!;

export function useChatScript() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cycle, setCycle] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const isReset = cycle > 0;

    if (isReset && messages.length > 0) {
      setIsFadingOut(true);
      timers.push(
        setTimeout(() => {
          setMessages([FIRST_MESSAGE]);
          setIsFadingOut(false);
        }, FADE_OUT_DURATION)
      );
    }

    const delayOffset = isReset ? FADE_OUT_DURATION : 0;

    for (const step of SCRIPT) {
      if (step.replace) continue;
      const delay = step.delay + delayOffset;

      timers.push(
        setTimeout(() => {
          if (step.action === "react" && step.reactIndex !== undefined && step.reactEmoji) {
            setMessages((prev) =>
              prev.map((m, i) =>
                i === step.reactIndex && m.type === "incoming"
                  ? { ...m, reaction: step.reactEmoji }
                  : m
              )
            );
          } else if (step.action === "update-incoming" && step.message && step.updateIndex !== undefined) {
            setMessages((prev) =>
              prev.map((m, i) =>
                i === step.updateIndex && m.type === "incoming"
                  ? step.message!
                  : m
              )
            );
          } else if (step.message) {
            setMessages((prev) => [...prev, step.message!]);
          }
        }, delay)
      );
    }

    if (!isReset) {
      for (const step of SCRIPT) {
        if (!step.replace || !step.message) continue;
        timers.push(
          setTimeout(() => setMessages([step.message!]), step.delay)
        );
        break;
      }
    }

    timers.push(setTimeout(() => setCycle((c) => c + 1), SCRIPT_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return { messages, cycle, isFadingOut };
}
