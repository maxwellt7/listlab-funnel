import { Suspense } from "react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ApplicationForm } from "@/components/ApplicationForm";
import { decodeLead, LEAD_COOKIE } from "@/lib/session";

export const metadata: Metadata = {
  title: "Apply — ListLab",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-surface-tint px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-[640px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">Step 2 of 2</p>
          <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[40px]">
            A few questions about who you are and what you’d bring.
          </h1>
          <p className="mt-4 text-[17px] leading-7 text-ink-body">
            Takes about a minute. If you’re approved, the next step is the NDA — then you see everything.
          </p>
          <div className="ll-card mt-10 p-6 sm:p-10">
            <Suspense fallback={<FormSkeleton />}>
              <FormWithSession />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function FormWithSession() {
  const session = decodeLead((await cookies()).get(LEAD_COOKIE)?.value);
  return <ApplicationForm email={session?.email ?? null} />;
}

function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-4 w-40 rounded bg-surface-tint" />
          <div className="mt-2 h-14 rounded-[8px] bg-surface-tint" />
        </div>
      ))}
    </div>
  );
}
