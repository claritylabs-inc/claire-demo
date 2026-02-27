"use client";

import { FadeIn } from "@/components/FadeIn";
import { Header } from "@/components/Header";
import { SignOff } from "@/components/SignOff";

const brandFont = { fontFamily: "var(--font-instrument-serif)" };

function BrandName({ children }: { children: React.ReactNode }) {
  return <span style={brandFont} className="text-lg font-semibold tracking-wide">{children}</span>;
}

export default function Home() {
  return (
    <div
      className="min-h-screen text-[#1a1a1a]"
    >
      <Header logoSize="lg" />

      <main className="max-w-3xl border-x border-gray-200 mx-auto px-6 md:px-10 pt-40 md:pt-52 pb-40 md:pb-56">
        <div className="max-w-xl mx-auto">
        <FadeIn>
          <h1
            className="max-w-md text-[1.65rem] md:text-[2rem] font-normal leading-[1.35] tracking-[-0.01em] mb-20"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Insurance is broken for the people who need it most.
          </h1>
        </FadeIn>

        <div
          className="space-y-7 text-[15px] md:text-base leading-[1.75]"
          style={{ color: "#3d3d3d" }}
        >
          <FadeIn>
            <p>
              Most businesses don&apos;t go out of their way to buy insurance.
              Instead, it&apos;s something they have to do to win contracts with
              customers, sign leases with a landlord, or even to just do
              business in a state.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              That makes commercial insurance both critically important, and a
              pain in the ass.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              What&apos;s worse is that the process of buying insurance and
              managing it is terrible. Few, if any companies have an in-house
              insurance expert. Instead, the critical job of buying, managing,
              renewing, and handling claims falls on someone who never signed up
              for it: the contractor who&apos;s trying to win a city bid, the
              restaurant owner renewing a lease, the startup closing their first
              enterprise deal.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              These people aren&apos;t insurance experts, and they&apos;re not
              supposed to be. Buying an insurance policy feels like an
              inquisition, soaking up weeks of valuable time. Insurance policies
              are filled with language nobody understands. There&apos;s no single
              source of truth internally. The information isn&apos;t just
              disorganized&mdash;it&apos;s incomprehensible to the people who
              depend on it most.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="py-6">
              <div
                className="w-8 h-px"
                style={{ background: "rgba(0,0,0,0.15)" }}
              />
            </div>
          </FadeIn>

          <FadeIn>
            <p>
              This doesn&apos;t have to be the case anymore.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Our belief is that AI can make insurance simple and autonomous for
              businesses. To be the trust layer for society that it&apos;s
              supposed to be.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Our mission is to build tools that make it easy for businesses to
              manage their insurance, trust each other when completing
              transactions, and for insurance companies to better understand the
              businesses they serve.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="py-6">
              <div
                className="w-8 h-px"
                style={{ background: "rgba(0,0,0,0.15)" }}
              />
            </div>
          </FadeIn>

          <FadeIn>
            <p>
              Our first product is called <BrandName>Clair</BrandName>.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              <BrandName>Clair</BrandName> is a system of record for your
              insurance that understands not just where your policies are, but
              what they mean. What you&apos;re covered for, where you have gaps,
              when you need to act, and what it&apos;ll cost you if you
              don&apos;t.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              <BrandName>Clair</BrandName> lives in your email inbox and
              SMS&mdash;answering your customers&apos; due diligence questions,
              sending COIs to your landlord when you sign a new lease, and
              helping you file claims when things go wrong.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Since <BrandName>Clair</BrandName> has the full context of your
              business, your coverage, and your insurance needs, it can also
              proactively recommend changes, flag coverage gaps, and help you buy
              or renew policies completely autonomously.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="py-6">
              <div
                className="w-8 h-px"
                style={{ background: "rgba(0,0,0,0.15)" }}
              />
            </div>
          </FadeIn>

          <FadeIn>
            <p>
              We&apos;re partnering with brokers to bring{" "}
              <BrandName>Clair</BrandName> to businesses. Brokers are giving
              their clients a dedicated intelligence layer that understands their
              coverage, answers their questions, and acts on their
              behalf&mdash;all without any added work.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Every client on <BrandName>Clair</BrandName> is a client they can
              retain without adding headcount.
            </p>
          </FadeIn>

          <FadeIn>
            <p
              className="pt-8 text-[1.1rem] md:text-lg"
              style={{ color: "#1a1a1a", fontFamily: "var(--font-playfair)" }}
            >
              This is just the start.
            </p>
          </FadeIn>

          <FadeIn>
            <SignOff />
          </FadeIn>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div
          className="max-w-3xl mx-auto px-6 md:px-10 py-8 flex items-center justify-between text-[11px]"
          style={{ color: "#8a8578" }}
        >
          <span>&copy; {new Date().getFullYear()} Clarity Labs</span>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@claritylabs.inc"
              className="transition-all duration-300 hover:text-[#1a1a1a]"
              style={{ textShadow: "none" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textShadow = "0 0 12px rgba(160,210,250,0.6), 0 0 4px rgba(160,210,250,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textShadow = "none";
              }}
            >
              hello@claritylabs.inc
            </a>
            <span className="hidden md:inline" style={{ color: "#ccc" }}>·</span>
            <button
              className="hidden md:inline transition-opacity hover:opacity-70"
              style={{ color: "#bbb" }}
              onClick={() => {
                const e = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                window.dispatchEvent(e);
              }}
            >
              ⌘K
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
