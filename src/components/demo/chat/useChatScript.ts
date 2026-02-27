"use client";

import { useState, useEffect } from "react";
import { CHAT_PROMPTS } from "@/data/demoData";

/* ---------- Types ---------- */

export type Message =
  | { type: "incoming"; text: string; reaction?: string }
  | { type: "outgoing"; text: string; reaction?: string }
  | { type: "typing" };

interface ScriptStep {
  action: "add" | "replace-typing" | "react";
  message?: Message;
  delay: number;
  reactIndex?: number;
  reactEmoji?: string;
}

/* ---------- Script timing constants ---------- */

const DELAY_AFTER_USER_MSG = 2200;
const TYPING_DURATION = 500;
const RESPONSE_DELAY = 2000;
const REACTION_DELAY = 800;
const SCRIPT_END_PAUSE = 3000;

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

  // Opening Claire greeting (short for demo)
  steps.push({
    action: "add",
    message: {
      type: "incoming",
      text: "Hi! I've analyzed your policies. What can I help with?",
    },
    delay: t,
  });
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
    steps.push({ action: "add", message: { type: "typing" }, delay: t });

    t += RESPONSE_DELAY;
    const responseIdx = msgCount;
    const answer = DEMO_ANSWERS[pi] ?? prompt.answer;
    steps.push({
      action: "replace-typing",
      message: { type: "incoming", text: answer },
      delay: t,
    });
    msgCount++;

    t += REACTION_DELAY;
    const emoji = pi === 0 ? "\u2764\uFE0F" : "\uD83D\uDC4D";
    steps.push({ action: "react", delay: t, reactIndex: responseIdx, reactEmoji: emoji });
  }

  return steps;
}

const SCRIPT = buildScript();
export const SCRIPT_DURATION = SCRIPT[SCRIPT.length - 1].delay + SCRIPT_END_PAUSE;

/* ---------- Hook ---------- */

export function useChatScript() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setMessages([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const step of SCRIPT) {
      timers.push(
        setTimeout(() => {
          if (step.action === "react" && step.reactIndex !== undefined && step.reactEmoji) {
            setMessages((prev) =>
              prev.map((m, i) =>
                i === step.reactIndex && m.type !== "typing"
                  ? { ...m, reaction: step.reactEmoji }
                  : m
              )
            );
          } else if (step.action === "replace-typing" && step.message) {
            setMessages((prev) => {
              const withoutTyping = prev.filter((m) => m.type !== "typing");
              return [...withoutTyping, step.message!];
            });
          } else if (step.message) {
            setMessages((prev) => [...prev, step.message!]);
          }
        }, step.delay)
      );
    }

    timers.push(setTimeout(() => setCycle((c) => c + 1), SCRIPT_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return { messages, cycle };
}
