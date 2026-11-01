import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasDb, setLeadSync, upsertLead } from "@/lib/db";
import { ghlConfigured, SOURCE, syncOptIn } from "@/lib/ghl";
import { encodeLead, LEAD_COOKIE, leadCookieOptions } from "@/lib/session";

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
  utm: z.record(z.string(), z.string().max(200)).optional().default({}),
  path: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    parsed = Body.safeParse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!parsed.success) {
    const honeypot = parsed.error.issues.some((i) => i.path[0] === "website");
    if (honeypot) return NextResponse.json({ ok: true }); // pretend success to bots
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  const { email, utm, path } = parsed.data;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  // 1. Save the lead (backup + audit log). Never blocks the visitor.
  let leadId: number | null = null;
  try {
    const row = await upsertLead({ email, source: SOURCE, landingPath: path, utm, ip, userAgent });
    leadId = row?.id ?? null;
  } catch (err) {
    console.error("[optin] db error", err);
  }

  // 2. Push to GHL: contact + opportunity in the New Lead stage.
  let contactId: string | null = null;
  let opportunityId: string | null = null;
  let syncError: string | null = null;
  if (ghlConfigured()) {
    try {
      const r = await syncOptIn(email, { utm, landingPath: path });
      contactId = r.contactId;
      opportunityId = r.opportunityId;
    } catch (err) {
      syncError = err instanceof Error ? err.message : String(err);
      console.error("[optin] ghl error", syncError);
    }
  } else {
    console.warn("[optin] GHL not configured; skipped push for", email);
  }
  if (leadId !== null && hasDb()) {
    await setLeadSync(leadId, { contactId, opportunityId, error: syncError }).catch((e) => console.error("[optin] db sync note", e));
  }

  // 3. Hand the email to /apply via a signed cookie.
  const res = NextResponse.json({ ok: true });
  res.cookies.set(LEAD_COOKIE, encodeLead({ email, leadId, opportunityId, contactId }), leadCookieOptions);
  return res;
}
