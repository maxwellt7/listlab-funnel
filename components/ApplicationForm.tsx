"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { email: string | null };

type Errors = Partial<Record<"email" | "fullName" | "phone" | "investedBefore" | "accredited" | "brings" | "bringsDetail" | "form", string>>;

const BRINGS = [
  { value: "insight", label: "Valuable insight", hint: "Industry, operating or market knowledge we should hear." },
  { value: "relationships", label: "Relationships", hint: "People, partners or capital you could open a door to." },
  { value: "other", label: "Other", hint: "Something else — tell us below." },
] as const;

export function ApplicationForm({ email }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [brings, setBrings] = useState<string[]>([]);
  const [hp, setHp] = useState("");

  function toggle(v: string) {
    setBrings((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: email ?? String(fd.get("email") ?? ""),
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      investedBefore: String(fd.get("investedBefore") ?? ""),
      accredited: String(fd.get("accredited") ?? ""),
      brings,
      bringsDetail: String(fd.get("bringsDetail") ?? ""),
      website: hp,
    };

    // client-side pass so people get instant feedback; the API re-validates
    const next: Errors = {};
    if (!email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) next.email = "Enter a valid email address.";
    if (payload.fullName.trim().length < 2) next.fullName = "Enter your full name.";
    if (!/^[+()\d\s.-]{7,}$/.test(payload.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!payload.investedBefore) next.investedBefore = "Choose one.";
    if (!payload.accredited) next.accredited = "Choose one.";
    if (!brings.length) next.brings = "Pick at least one.";
    if (brings.includes("other") && !payload.bringsDetail.trim()) next.bringsDetail = "Tell us what you'd bring.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true'], [role='alert']")?.focus();
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Errors };
      if (!res.ok || !data.ok) {
        setErrors({ ...(data.fieldErrors ?? {}), form: data.error ?? "Something went wrong. Try again." });
        setBusy(false);
        return;
      }
      router.push("/thank-you");
    } catch {
      setErrors({ form: "Something went wrong. Try again." });
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {/* identity */}
      <fieldset className="space-y-5">
        <legend className="sr-only">About you</legend>
        {email ? (
          <p className="text-[14px] leading-5 text-ink-muted">
            Applying as <span className="font-semibold text-ink">{email}</span>
          </p>
        ) : (
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" className="ll-input mt-2" aria-invalid={!!errors.email} />
          </Field>
        )}
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="First and last name" className="ll-input mt-2" aria-invalid={!!errors.fullName} autoFocus />
        </Field>
        <Field id="phone" label="Phone number" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" className="ll-input mt-2" aria-invalid={!!errors.phone} />
        </Field>
      </fieldset>

      {/* Q1 */}
      <Radio
        name="investedBefore"
        legend="Have you invested in a deal before?"
        error={errors.investedBefore}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {/* Q2 */}
      <Radio
        name="accredited"
        legend="Are you an accredited investor?"
        hint="In the U.S. that generally means $200k+ income ($300k joint) in each of the last two years, or $1M+ net worth excluding your primary home."
        error={errors.accredited}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not-sure", label: "Not sure" },
        ]}
      />

      {/* Q3 */}
      <fieldset>
        <legend className="ll-label">What else can you bring to the table as an investor?</legend>
        <p className="mt-1 text-[14px] leading-5 text-ink-muted">Pick everything that applies.</p>
        <div className="mt-3 grid gap-3">
          {BRINGS.map((o) => (
            <label key={o.value} className="ll-choice !h-auto !items-start py-3">
              <input type="checkbox" name="brings" value={o.value} className="mt-1" checked={brings.includes(o.value)} onChange={() => toggle(o.value)} />
              <span>
                <span className="block font-semibold">{o.label}</span>
                <span className="block text-[14px] leading-5 text-ink-muted">{o.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.brings && (
          <p className="ll-error mt-2" role="alert">
            {errors.brings}
          </p>
        )}
        <div className="mt-4">
          <label htmlFor="bringsDetail" className="ll-label">
            Tell us more {brings.includes("other") ? "" : <span className="font-normal text-ink-muted">(optional)</span>}
          </label>
          <textarea id="bringsDetail" name="bringsDetail" className="ll-input mt-2" placeholder="A sentence or two is plenty." aria-invalid={!!errors.bringsDetail} />
          {errors.bringsDetail && (
            <p className="ll-error mt-2" role="alert">
              {errors.bringsDetail}
            </p>
          )}
        </div>
      </fieldset>

      {/* honeypot */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {errors.form && (
        <p className="ll-error" role="alert">
          {errors.form}
        </p>
      )}

      <div>
        <button type="submit" className="ll-btn w-full" disabled={busy}>
          <span>{busy ? "Submitting…" : "Submit application"}</span>
        </button>
        <p className="mt-4 text-center text-[13px] leading-5 text-ink-muted">
          Applying costs nothing and commits you to nothing. We’ll only use this to review your application.
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="ll-label">
        {label}
      </label>
      {children}
      {error && (
        <p className="ll-error mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Radio({ name, legend, hint, options, error }: { name: string; legend: string; hint?: string; options: { value: string; label: string }[]; error?: string }) {
  return (
    <fieldset>
      <legend className="ll-label">{legend}</legend>
      {hint && <p className="mt-1 text-[14px] leading-5 text-ink-muted">{hint}</p>}
      <div className="mt-3 grid gap-3 sm:grid-flow-col sm:auto-cols-fr">
        {options.map((o) => (
          <label key={o.value} className="ll-choice">
            <input type="radio" name={name} value={o.value} aria-describedby={error ? `${name}-error` : undefined} />
            <span className="font-semibold">{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="ll-error mt-2" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
