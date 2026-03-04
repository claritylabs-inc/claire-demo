"use client";

import { useRouter } from "next/navigation";
import { OnboardingView } from "@/components/views/OnboardingView";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";

export default function Home() {
  const router = useRouter();
  const { openChat } = useChatOverlay();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <OnboardingView
        onComplete={() => router.push("/use-cases")}
        onBookDemo={openChat}
      />
    </div>
  );
}
