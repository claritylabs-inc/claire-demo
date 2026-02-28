"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CHAT_PROMPTS_BY_POLICY,
  CHAT_PROMPTS_RENEW_BY_POLICY,
  CHAT_PROMPTS_BY_CARD,
} from "@/data/demoData";

/* ---------- Types ---------- */

export type ChatMode =
  | "contact"
  | "renew"
  | "overview"
  | "premiums"
  | "renewal"
  | "integrations";
export type PolicyId = "gl" | "cp" | "wc" | "ca";

const policyLabels: Record<PolicyId, string> = {
  gl: "General Liability",
  cp: "Commercial Property",
  wc: "Workers' Compensation",
  ca: "Commercial Auto",
};

const renewGreetings: Record<PolicyId, string> = {
  gl: "Your General Liability policy is expiring soon. I've got renewal options ready — what would you like to know?",
  cp: "Your Commercial Property renewal is coming up. I've got your options — what can I help with?",
  wc: "Your Workers' Comp renewal is due. I've got the details — what would you like to know?",
  ca: "Your Commercial Auto policy is up for renewal. I've got quotes ready — what can I help with?",
};

const cardGreetings: Record<string, string> = {
  overview: "I've got your full policy summary. What would you like to know?",
  premiums: "I can help with premiums and payment questions. What's on your mind?",
  renewal: "I'm tracking your renewals. Your GL is up next — what can I help with?",
  integrations: "I'm connected to your lease, business profile, and QuickBooks. What would you like to know?",
};

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

function buildScript(mode: ChatMode, policyId: PolicyId | null): ScriptStep[] {
  const effectivePolicyId = policyId ?? "gl";
  const isCardMode = ["overview", "premiums", "renewal", "integrations"].includes(mode);
  const prompts = isCardMode
    ? CHAT_PROMPTS_BY_CARD[mode as keyof typeof CHAT_PROMPTS_BY_CARD]
    : mode === "renew"
      ? CHAT_PROMPTS_RENEW_BY_POLICY[effectivePolicyId]
      : policyId
        ? CHAT_PROMPTS_BY_POLICY[policyId]
        : CHAT_PROMPTS_BY_POLICY.gl;

  const steps: ScriptStep[] = [];
  let t = 0;
  let msgCount = 0;

  const greeting = isCardMode
    ? cardGreetings[mode]
    : mode === "renew"
      ? renewGreetings[effectivePolicyId]
      : policyId
        ? `I've got your ${policyLabels[policyId]} details. What can I help with?`
        : "Hi! I've analyzed your policies. What can I help with?";

  const FIRST_MSG_DELAY = 250;
  steps.push({
    action: "add",
    message: { type: "incoming", text: greeting, status: "ready" },
    delay: FIRST_MSG_DELAY,
    replace: true,
  });
  t = FIRST_MSG_DELAY;
  msgCount++;

  for (let pi = 0; pi < prompts.length; pi++) {
    const prompt = prompts[pi];
    t += DELAY_AFTER_USER_MSG;
    steps.push({
      action: "add",
      message: { type: "outgoing", text: prompt.question },
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
    const answer = prompt.answer;
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

/* ---------- Hook ---------- */

export function useChatScript(mode: ChatMode = "contact", policyId: PolicyId | null = null) {
  const script = useMemo(() => buildScript(mode, policyId), [mode, policyId]);
  const scriptDuration = script[script.length - 1].delay + SCRIPT_END_PAUSE;
  const firstMessage = script.find((s) => s.replace && s.message)!.message!;

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
          setMessages([firstMessage]);
          setIsFadingOut(false);
        }, FADE_OUT_DURATION)
      );
    }

    const delayOffset = isReset ? FADE_OUT_DURATION : 0;

    for (const step of script) {
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
      for (const step of script) {
        if (!step.replace || !step.message) continue;
        timers.push(
          setTimeout(() => setMessages([step.message!]), step.delay)
        );
        break;
      }
    }

    timers.push(setTimeout(() => setCycle((c) => c + 1), scriptDuration));

    return () => timers.forEach(clearTimeout);
  }, [cycle, mode, policyId]);

  return { messages, cycle, isFadingOut };
}
