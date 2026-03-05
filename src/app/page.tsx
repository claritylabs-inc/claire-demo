"use client";

import { useRouter } from "next/navigation";
import { OnboardingView } from "@/components/views/OnboardingView";
import { BackButton } from "@/components/layout/BackButton";
import { BookDemoButton } from "@/components/layout/BookDemoButton";
import { useChatOverlay } from "@/components/views/ChatOverlayContext";

export default function Home() {
  const router = useRouter();
  const { openChat } = useChatOverlay();

  return (
    <>
      <BackButton />
      <BookDemoButton onClick={openChat} />
      <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
        <OnboardingView
          onComplete={() => router.push("/use-cases")}
        />
      </div>
    </>
  );
}
