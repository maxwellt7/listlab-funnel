"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Ctx = { open: () => void };
const OptInContext = createContext<Ctx>({ open: () => {} });

export function useOptIn() {
  return useContext(OptInContext);
}

/** Wraps the landing page: provides `open()` to every CTA and renders the email modal once. */
export function OptInProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <OptInContext.Provider value={{ open }}>
      {children}
      {isOpen && <OptInModal onClose={() => setOpen(false)} />}
    </OptInContext.Provider>
  );
}

/** The "See if you qualify" button. `sub` is the italic second line. */
export function CtaButton({ label = "See if you qualify", sub = "Accredited investors only.", className = "" }: { label?: string; sub?: string; className?: string }) {
  const { open } = useOptIn();
  return (
    <button type="button" className={`ll-btn ${className}`} onClick={open}>
      <span>{label}</span>
      {sub && <span className="sub">{sub}</span>}
    </button>
  );
}

function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const [k, v] of params) {
    if (/^(utm_|fbclid|gclid|ref$)/.test(k)) out[k] = v.slice(0, 200);
  }
  return out;
}

function OptInModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, website: hp, utm: readUtm(), path: window.location.pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Try again.");
      // Full navigation (not router.push): /apply must be rendered fresh so it sees the cookie just set.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- intentional: the client router may hold a pre-cookie render of /apply
      window.location.assign("/apply");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(16,7,39,0.72)] p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="optin-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="ll-card relative w-full max-w-[480px] p-8 sm:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">Step 1 of 2</p>
        <h2 id="optin-title" className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
          Where should we send the details?
        </h2>
        <p className="mt-3 text-[16px] leading-[26px] text-ink-body">
          Enter your email and we’ll take you to a short application. Applying costs nothing and commits you to
          nothing.
        </p>
        <form onSubmit={submit} className="mt-6" noValidate>
          <label htmlFor="optin-email" className="ll-label">
            Email
          </label>
          <input
            ref={inputRef}
            id="optin-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="ll-input mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "optin-error" : undefined}
            required
          />
          {/* honeypot — hidden from people, filled by bots */}
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
            </label>
          </div>
          {error && (
            <p id="optin-error" className="ll-error mt-2" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="ll-btn mt-5 w-full" disabled={busy}>
            <span>{busy ? "One moment…" : "Continue to the application"}</span>
          </button>
          <p className="mt-4 text-center text-[12px] leading-[18px] text-ink-muted">
            Accredited investors only. We don’t share your email.
          </p>
        </form>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-ink-muted hover:bg-surface-tint hover:text-ink"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
