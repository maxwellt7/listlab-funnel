import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * A small signed cookie that carries the opted-in email (and lead id) from the landing page to
 * /apply, so the application form doesn't ask for the email twice. Not a login — it only proves
 * the value came from our own /api/optin.
 */
export const LEAD_COOKIE = "ll_lead";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret() {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") console.warn("[listlab] SESSION_SECRET is not set; using a weak default.");
  return "listlab-dev-secret-change-me";
}

export type LeadSession = { email: string; leadId: number | null; opportunityId: string | null; contactId: string | null };

function b64url(s: string) {
  return Buffer.from(s, "utf8").toString("base64url");
}
function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeLead(session: LeadSession): string {
  const payload = b64url(JSON.stringify(session));
  return `${payload}.${sign(payload)}`;
}

export function decodeLead(value: string | undefined | null): LeadSession | null {
  if (!value) return null;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<LeadSession>;
    if (typeof parsed.email !== "string") return null;
    return {
      email: parsed.email,
      leadId: typeof parsed.leadId === "number" ? parsed.leadId : null,
      opportunityId: typeof parsed.opportunityId === "string" ? parsed.opportunityId : null,
      contactId: typeof parsed.contactId === "string" ? parsed.contactId : null,
    };
  } catch {
    return null;
  }
}

export const leadCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
