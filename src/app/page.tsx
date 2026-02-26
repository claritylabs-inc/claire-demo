import { FadeIn } from "@/components/FadeIn";

const brandFont = { fontFamily: 'var(--font-instrument-serif)' };

function BrandName({ children }: { children: React.ReactNode }) {
  return <span style={brandFont}>{children}</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-divider">
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <a href="/" className="text-xl tracking-tight" style={brandFont}>
            clarity
          </a>
          <a
            href="mailto:hello@clarity.so"
            className="text-xs uppercase tracking-[0.15em] text-muted hover:text-foreground transition-colors"
          >
            Get in touch
          </a>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-32 md:pb-44">
        <FadeIn>
          <h1 className="serif text-2xl md:text-3xl font-medium leading-[1.3] tracking-tight mb-16 max-w-md">
            Insurance is broken for the people who need it most. We&apos;re fixing it.
          </h1>
        </FadeIn>
        <article className="space-y-8 text-lg md:text-xl leading-relaxed">
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
              disorganized, it&apos;s incomprehensible to the people who depend
              on it most.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              This doesn&apos;t have to be the case anymore. Our belief is that
              AI can make insurance simple and autonomous for businesses.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              To be the trust layer for society that it&apos;s supposed to be.
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
            <p className="text-muted text-base md:text-lg pt-4">
              What we&apos;re building
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Our first product is called <BrandName>Clair</BrandName>.{" "}
              <BrandName>Clair</BrandName> is a system of record for your
              insurance that understands not just where your policies are, but
              what they mean. What you&apos;re covered for, where you have gaps,
              when you need to act, and what it&apos;ll cost you if you
              don&apos;t.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              <BrandName>Clair</BrandName> lives in your email inbox and SMS,
              answering your customers&apos; due diligence questions, sending
              COIs to your landlord when you sign a new lease, and helping you
              file claims when things go wrong.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              Because <BrandName>Clair</BrandName> has the full context of your
              business, your coverage, and your insurance needs, it can also
              proactively recommend changes, flag coverage gaps, and help you buy
              or renew policies completely autonomously.
            </p>
          </FadeIn>

          <FadeIn>
            <p>
              We&apos;re partnering with brokers to bring{" "}
              <BrandName>Clair</BrandName> to businesses. Brokers are giving
              their clients a dedicated intelligence layer that understands their
              coverage, answers their questions, and acts on their
              behalf&mdash;all without any added work. Every client on{" "}
              <BrandName>Clair</BrandName> is a client they can retain without
              adding headcount.
            </p>
          </FadeIn>

          <FadeIn>
            <p>This is just the start.</p>
          </FadeIn>
        </article>
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
