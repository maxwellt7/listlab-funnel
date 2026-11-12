import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Application received — ListLab",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="on-dark relative overflow-hidden bg-hero-base px-6 py-20 text-center text-on-dark sm:py-28">
          <div className="ll-hero-glow pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-[720px]">
            <span className="ll-eyebrow">Application received</span>
            <h1 className="ll-h1 mt-6">
              You’re in the queue. <span className="text-accent-soft">We’ll be in touch.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[29px] text-on-dark-body">
              We review every application by hand. Keep an eye on your inbox — if you’re approved, the NDA comes next,
              and then you see everything.
            </p>
          </div>
        </section>

        <section className="bg-surface px-6 py-20">
          <div className="mx-auto max-w-page">
            <h2 className="ll-h2 text-center text-ink">What happens next</h2>
            <div className="ll-divider" aria-hidden />
            <ol className="mx-auto mt-12 grid max-w-[880px] gap-4 sm:grid-cols-2">
              {site.nextSteps.map((s, i) => (
                <li key={s.title} className={`flex items-start gap-5 rounded-[16px] p-6 ${i === 0 ? "bg-accent-tint" : "ll-card"}`}>
                  <span className="ll-num">{i === 0 ? "✓" : i + 1}</span>
                  <div className="pt-2">
                    <p className="text-[18px] font-bold leading-6 text-ink">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-6 text-ink-muted">{i === 0 ? "Done. Thank you." : s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-12 max-w-measure text-center text-[18px] leading-[29px] text-ink-body">
              One more thing: this page and everything you’ll be shown are confidential. Please don’t forward it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
