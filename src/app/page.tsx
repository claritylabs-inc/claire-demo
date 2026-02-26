import { FadeIn } from "@/components/FadeIn";

function Divider() {
  return (
    <FadeIn>
      <div className="w-full h-px bg-divider my-24 md:my-32" />
    </FadeIn>
  );
}

const brandFont = { fontFamily: 'var(--font-instrument-serif)' };

function BrandName({ children }: { children: React.ReactNode }) {
  return <span style={brandFont}>{children}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-[0.2em] text-muted font-mono mb-8 block">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-divider">
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <span className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            clarity
          </span>
          <a
            href="mailto:hello@clarity.so"
            className="text-xs uppercase tracking-[0.15em] text-muted hover:text-foreground transition-colors"
          >
            Get in touch
          </a>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <section className="pt-40 md:pt-52 pb-24 md:pb-32 text-center flex flex-col items-center">
          <FadeIn>
            <h1 className="serif text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.2] tracking-tight">
              Making insurance <span className="serif italic text-muted">simple</span>
              {" "}and{" "}
              <span className="serif italic text-muted">autonomous</span> for businesses.
            </h1>
          </FadeIn>
        </section>

        <Divider />

        {/* The Problem */}
        <section>
          <FadeIn>
            <SectionLabel>The reality</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Most businesses don&apos;t go out of their way to buy insurance.
              Instead, it&apos;s something they <em className="serif italic">have</em> to
              do to win contracts with customers, sign leases with a landlord,
              or even to just do business in a state.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed text-accent mb-8">
              That makes commercial insurance both critically important, and a
              pain in the ass.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* The Breakdown */}
        <section>
          <FadeIn>
            <SectionLabel>The breakdown</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-accent">
              The process of buying insurance and managing it is terrible. Few,
              if any companies have an in-house insurance expert.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Instead, the critical job of buying, managing, renewing, and
              handling claims falls on someone who never signed up for
              it:
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="pl-6 border-l border-divider mb-8 space-y-3">
              <p className="text-base md:text-lg text-muted leading-relaxed">
                The contractor trying to win a city bid.
              </p>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                The restaurant owner renewing a lease.
              </p>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                The startup closing their first enterprise deal.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              These people aren&apos;t insurance experts, and they&apos;re not supposed
              to be. Buying a policy feels like an inquisition, soaking up weeks
              of valuable time. Policies are filled with language nobody
              understands. There&apos;s no single source of truth. The information
              isn&apos;t just disorganized&mdash;it&apos;s incomprehensible to the people who
              depend on it most.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* The Belief */}
        <section>
          <FadeIn>
            <SectionLabel>Our belief</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-10">
              This doesn&apos;t have to be
              <br />
              the case anymore.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              AI can make insurance simple and autonomous for businesses.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed text-accent italic serif">
              To be the trust layer for society that it&apos;s supposed to be.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* Mission */}
        <section>
          <FadeIn>
            <SectionLabel>Our mission</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed">
              Build tools that make it easy for businesses to manage their
              insurance, trust each other when completing transactions, and for
              insurance companies to better understand the businesses they serve.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* What we're building */}
        <section>
          <FadeIn>
            <SectionLabel>What we&apos;re building</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-normal leading-[1.15] tracking-tight mb-10" style={brandFont}>
              Clair
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Our first product is a system of record for your insurance that
              understands not just where your policies are, but{" "}
              <em className="serif italic">what they mean</em>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="pl-6 border-l border-divider mb-10 space-y-3">
              <p className="text-base md:text-lg text-muted leading-relaxed">
                What you&apos;re covered for.
              </p>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                Where you have gaps.
              </p>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                When you need to act.
              </p>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                What it&apos;ll cost you if you don&apos;t.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              <BrandName>Clair</BrandName> lives in your email inbox and SMS&mdash;answering your
              customers&apos; due diligence questions, sending COIs to your landlord
              when you sign a new lease, and helping you file claims when things
              go wrong.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl leading-relaxed">
              Because <BrandName>Clair</BrandName> has the full context of your business, your
              coverage, and your insurance needs, it can proactively recommend
              changes, flag coverage gaps, and help you buy or renew policies
              completely autonomously.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* Go-to-market */}
        <section>
          <FadeIn>
            <SectionLabel>Go to market</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              We&apos;re partnering with brokers to bring <BrandName>Clair</BrandName> to businesses.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-accent">
              Brokers are giving their clients a dedicated intelligence layer
              that understands their coverage, answers their questions, and acts
              on their behalf&mdash;all without any added work.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed">
              Every client on <BrandName>Clair</BrandName> is a client they can retain without adding
              headcount.
            </p>
          </FadeIn>
        </section>

        <Divider />

        {/* Closing */}
        <section className="pb-40 md:pb-52">
          <FadeIn>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-center">
              This is just the start.
            </h2>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-divider">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 flex items-center justify-between">
          <span className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Clarity
          </span>
          <a
            href="mailto:hello@clarity.so"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            hello@clarity.so
          </a>
        </div>
      </footer>
    </div>
  );
}
