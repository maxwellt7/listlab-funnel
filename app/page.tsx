import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Vsl } from "@/components/Vsl";
import { CtaButton, OptInProvider } from "@/components/OptIn";

function SectionHeading({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="text-center">
      <h2 className={`ll-h2 ${dark ? "text-on-dark" : "text-ink"}`}>{children}</h2>
      <div className="ll-divider" aria-hidden />
    </div>
  );
}

function XIcon() {
  return (
    <span className="ll-x" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <span className="inline-grid h-6 w-6 flex-none place-items-center rounded-full bg-accent-tint text-accent" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L19 7" />
      </svg>
    </span>
  );
}

export default function LandingPage() {
  return (
    <OptInProvider>
      <Nav />
      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="on-dark relative overflow-hidden bg-hero-base px-6 pb-20 pt-16 text-center text-on-dark sm:pt-20">
          <div className="ll-hero-glow pointer-events-none absolute inset-0" aria-hidden />
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 960 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <g stroke="#d8b4fe" strokeOpacity=".22" strokeWidth="1">
              <line x1="60" y1="80" x2="190" y2="160" /><line x1="190" y1="160" x2="120" y2="320" /><line x1="820" y1="120" x2="900" y2="260" />
              <line x1="900" y1="260" x2="760" y2="360" /><line x1="40" y1="520" x2="170" y2="610" /><line x1="760" y1="560" x2="880" y2="640" />
              <line x1="300" y1="40" x2="420" y2="90" /><line x1="620" y1="640" x2="700" y2="560" />
            </g>
            <g fill="#d8b4fe" fillOpacity=".5">
              <circle cx="60" cy="80" r="3" /><circle cx="190" cy="160" r="4" /><circle cx="120" cy="320" r="2.5" /><circle cx="820" cy="120" r="3" />
              <circle cx="900" cy="260" r="4" /><circle cx="760" cy="360" r="2.5" /><circle cx="40" cy="520" r="3" /><circle cx="170" cy="610" r="3" />
              <circle cx="760" cy="560" r="4" /><circle cx="880" cy="640" r="2.5" /><circle cx="300" cy="40" r="2.5" /><circle cx="420" cy="90" r="3" />
              <circle cx="620" cy="640" r="3" /><circle cx="700" cy="560" r="3" />
            </g>
          </svg>

          <div className="relative mx-auto max-w-page">
            <span className="ll-eyebrow">For accredited investors with $10k+ liquid</span>
            <h1 className="ll-h1 mx-auto mt-6 max-w-[880px]">
              Every investment right now needs you to predict the next few years.{" "}
              <span className="text-accent-soft">This one doesn’t.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[18px] leading-[29px] text-on-dark-body sm:text-[20px] sm:leading-8">
              It’s built on a need people have in any economy. Boom or bust. AI or no AI.{" "}
              <strong className="font-bold text-on-dark">Press play to see why.</strong>
            </p>

            <div className="mt-10">
              <Vsl />
            </div>

            <div className="mt-10 flex flex-col items-center">
              <CtaButton />
              <p className="mt-6 max-w-[640px] text-[14px] leading-[22px] text-on-dark-muted">
                10,000+ Pre-Product Users acquired at $0.05 each. &nbsp;|&nbsp; Applying costs nothing and commits you to
                nothing.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- What Is ListLab ---------- */}
        <section className="bg-surface px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page">
            <SectionHeading>What Is ListLab?</SectionHeading>
            <p className="mx-auto mt-8 max-w-measure text-center text-[20px] leading-8 text-ink-secondary">
              ListLab is a <span className="font-semibold text-accent">private investment opportunity</span> for
              accredited investors with $10,000+ to invest.
            </p>
            <p className="mt-10 text-center text-[16px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
              It’s built on
            </p>
            <ul className="mx-auto mt-6 grid max-w-[880px] gap-4 sm:grid-cols-2">
              {[
                ["The founder that has done this before.", "He’s built at four venture-backed companies, one of them a billion-dollar unicorn."],
                ["The team has skin in the game.", "22 people building it, mostly for equity."],
                ["It’s operating.", "We have more than 10,000 pre-product users actively using the product, acquired for less than $0.05 each."],
                ["Growth regardless of the future.", "It’s built on a need that exists regardless of AI, war, economic climate, etc."],
              ].map(([title, body]) => (
                <li key={title} className="ll-card flex gap-4 p-6">
                  <CheckIcon />
                  <div>
                    <p className="text-[16px] font-bold leading-6 text-ink">{title}</p>
                    <p className="mt-1 text-[15px] leading-6 text-ink-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-12 max-w-measure text-center text-[18px] leading-[29px] text-ink-body">
              So you can finally feel confident in an investment without having to predict the future…
            </p>
            <p className="mx-auto mt-3 max-w-measure text-center text-[18px] font-semibold leading-[29px] text-ink">
              …instead, you can just see what’s already happening.
            </p>
          </div>
        </section>

        {/* ---------- You used to know ---------- */}
        <section className="bg-surface-tint px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page">
            <SectionHeading>You used to know where to put your money.</SectionHeading>
            <p className="mx-auto mt-8 max-w-measure text-center text-[22px] font-medium leading-8 text-ink-secondary">
              Now every move feels like <span className="font-semibold text-accent">a bet on the news</span>.
            </p>
            <ul className="mx-auto mt-10 max-w-[560px] space-y-4">
              {["Stocks swing on a headline.", "Bonds swing on a rate decision.", "Cash feels safe, but it’s still a bet on what happens next."].map((line) => (
                <li key={line} className="flex items-center gap-4 text-[18px] leading-7 text-ink-body">
                  <XIcon />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-10 max-w-measure text-center text-[17px] leading-7 text-ink-muted">
              So you wait → You read more → You watch more → And your money sits.
            </p>
            <p className="mx-auto mt-4 max-w-measure text-center text-[20px] font-bold leading-7 text-ink">
              Waiting isn’t a plan. It’s just a slower bet.
            </p>
          </div>
        </section>

        {/* ---------- Why ListLab is different ---------- */}
        <section className="bg-surface px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page text-center">
            <SectionHeading>Why ListLab is different</SectionHeading>
            <div className="mx-auto mt-8 max-w-measure space-y-4 text-[18px] leading-[29px] text-ink-body">
              <p>Almost every option out there needs the future to go a certain way.</p>
              <p className="text-[22px] font-bold leading-8 text-ink">This one doesn’t.</p>
              <p>It’s built on a need that exists regardless of AI, war or the economy.</p>
              <p>The video above shows you why.</p>
              <p>And we can show you more if your application is approved.</p>
            </div>
            <div className="mt-10">
              <CtaButton />
            </div>
          </div>
        </section>

        {/* ---------- Who this is for ---------- */}
        <section className="bg-surface-tint px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page">
            <SectionHeading>Who This Is For…</SectionHeading>
            <div className="mx-auto mt-12 grid max-w-[880px] gap-6 md:grid-cols-2">
              <div className="ll-card p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent">This is for you if…</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Your money’s been sitting somewhere you’re not thrilled about.",
                    "You’d rather decide on demand than guess on the news.",
                    "You can put in an amount you could afford to lose.",
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-[16px] leading-6 text-ink-body">
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ll-card p-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted">It’s not for you if…</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "You need this money back soon.",
                    "You want to keep sitting on the sidelines, waiting for certainty that isn’t coming.",
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-[16px] leading-6 text-ink-body">
                      <XIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- What happens next ---------- */}
        <section className="bg-surface px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page">
            <SectionHeading>What Happens Next</SectionHeading>
            <ol className="mx-auto mt-12 grid max-w-[880px] gap-4 sm:grid-cols-2">
              {[
                ["Apply.", "A few questions about who you are and what you’d bring."],
                ["Sign the NDA.", "If you’re approved."],
                ["See everything.", "What the company is. The numbers. The team."],
                ["Decide.", "No pressure, no call you didn’t ask for."],
              ].map(([title, body], i) => (
                <li key={title} className="ll-card flex items-start gap-5 p-6">
                  <span className="ll-num">{i + 1}</span>
                  <div className="pt-2">
                    <p className="text-[18px] font-bold leading-6 text-ink">{title}</p>
                    <p className="mt-1 text-[15px] leading-6 text-ink-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Why now (band) ---------- */}
        <section className="on-dark ll-band px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page text-center">
            <SectionHeading dark>Why Now?</SectionHeading>
            <div className="mx-auto mt-10 grid max-w-[880px] gap-4 md:grid-cols-2">
              <div className="ll-glass p-8 text-left">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent-soft">The price</p>
                <p className="mt-3 text-[18px] font-bold leading-7">The round isn’t one price. It steps up as capital comes in.</p>
                <p className="mt-2 text-[17px] leading-7 text-on-dark-body">
                  The last checks could pay more than three times what the first ones do.
                </p>
              </div>
              <div className="ll-glass p-8 text-left">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent-soft">The minimum</p>
                <p className="mt-3 text-[18px] font-bold leading-7">The minimum to get in is only $10,000…</p>
                <p className="mt-2 text-[17px] leading-7 text-on-dark-body">…check size doesn’t matter… taking action does.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- A year from now ---------- */}
        <section className="bg-surface px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-page text-center">
            <SectionHeading>A Year From Now</SectionHeading>
            <p className="mx-auto mt-8 max-w-measure text-[18px] leading-[29px] text-ink-body">
              A year from now, you’ll say one of two things.
            </p>
            <div className="mx-auto mt-6 grid max-w-[720px] gap-4 sm:grid-cols-2">
              <p className="rounded-[12px] bg-surface-tint px-6 py-5 text-[18px] font-medium leading-7 text-ink-muted">
                “I looked at it and passed.”
              </p>
              <p className="rounded-[12px] bg-accent-tint px-6 py-5 text-[18px] font-bold leading-7 text-accent">
                “I wish I’d seen it earlier.”
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center">
              <CtaButton />
              <p className="mt-5 text-[15px] leading-6 text-ink-muted">Applying costs nothing and commits you to nothing.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </OptInProvider>
  );
}
