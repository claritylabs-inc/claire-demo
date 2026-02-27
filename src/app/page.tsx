"use client";

import { BrandName } from "@/components/BrandName";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignOff } from "@/components/SignOff";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Header logoSize="lg" />

      <main className="max-w-3xl border-x border-foreground/6 mx-auto px-6 md:px-10 pt-40 md:pt-52 pb-40 md:pb-56">
        <div className="max-w-xl mx-auto">
        <FadeIn staggerIndex={0}>
          <h1 className="max-w-md">
            Insurance is broken for the people who need it most.
          </h1>
        </FadeIn>

        <div className="space-y-7 text-[15px] md:text-base leading-[1.75] text-foreground">
          <FadeIn staggerIndex={1}>
            <p>
              Most businesses don&apos;t go out of their way to buy insurance.
              Instead, it&apos;s something they have to do to win contracts with
              customers, sign leases with a landlord, or even to just do
              business in a state.
            </p>
          </FadeIn>

          <FadeIn staggerIndex={2}>
            <p>
              This makes insurance both critically important, and a
              pain in the ass for businesses.
            </p>
          </FadeIn>

          <FadeIn staggerIndex={3}>
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

          <FadeIn staggerIndex={4}>
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
              <div className="w-8 h-px bg-foreground/15" />
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
              <div className="w-8 h-px bg-foreground/15" />
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
              sending certificates of insurance to your landlord when you sign a new lease, and
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
              <div className="w-8 h-px bg-foreground/15" />
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
            <p className="pt-8 text-[1.1rem] md:text-lg text-foreground-highlight font-serif">
              This is just the start.
            </p>
          </FadeIn>

          <FadeIn>
            <SignOff />
          </FadeIn>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
