import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getLeadByEmail, insertApplication, setApplicationSync, setLeadSync, upsertLead } from "@/lib/db";
import { ghlConfigured, SOURCE, syncApplication } from "@/lib/ghl";
import { decodeLead, encodeLead, LEAD_COOKIE, leadCookieOptions } from "@/lib/session";

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254).optional(),
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(32)
    .regex(/^[+()\d\s.-]+$/, "Enter a valid phone number."),
  investedBefore: z.enum(["yes", "no"]),
  accredited: z.enum(["yes", "no", "not-sure"]),
  brings: z.array(z.enum(["insight", "relationships", "other"])).min(1, "Pick at least one."),
  bringsDetail: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    parsed = Body.safeParse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return NextResponse.json({ ok: true });
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const session = decodeLead(request.cookies.get(LEAD_COOKIE)?.value);
  const email = session?.email ?? parsed.data.email;
  if (!email) return NextResponse.json({ ok: false, error: "Enter your email.", fieldErrors: { email: "Enter your email." } }, { status: 400 });

  const data = parsed.data;
  if (data.brings.includes("other") && !data.bringsDetail) {
    return NextResponse.json({ ok: false, error: "Tell us a bit more.", fieldErrors: { bringsDetail: "Tell us what you'd bring." } }, { status: 400 });
  }
  const bringsDetail = data.bringsDetail || null;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  // 1. Database: make sure a lead row exists (covers people who land on /apply directly), then store the application.
  let leadId: number | null = session?.leadId ?? null;
  let knownOpportunityId: string | null = session?.opportunityId ?? null;
  let applicationId: number | null = null;
  try {
    const lead = (await getLeadByEmail(email)) ?? (await upsertLead({ email, source: SOURCE, ip, userAgent }));
    if (lead) {
      leadId = lead.id;
      knownOpportunityId = knownOpportunityId ?? lead.ghl_opportunity_id;
    }
    applicationId = await insertApplication({
      leadId,
      email,
      fullName: data.fullName,
      phone: data.phone,
      investedBefore: data.investedBefore,
      accredited: data.accredited,
      brings: data.brings,
      bringsDetail,
      ip,
      userAgent,
    });
  } catch (err) {
    console.error("[apply] db error", err);
  }

  // 2. GHL: update the contact, add note + tags, move the opportunity to Application Submitted.
  let contactId: string | null = session?.contactId ?? null;
  let opportunityId: string | null = knownOpportunityId;
  let syncError: string | null = null;
  if (ghlConfigured()) {
    try {
      const r = await syncApplication(
        { email, fullName: data.fullName, phone: data.phone, investedBefore: data.investedBefore, accredited: data.accredited, brings: data.brings, bringsDetail },
        { opportunityId: knownOpportunityId },
      );
      contactId = r.contactId;
      opportunityId = r.opportunityId;
    } catch (err) {
      syncError = err instanceof Error ? err.message : String(err);
      console.error("[apply] ghl error", syncError);
    }
  } else {
    console.warn("[apply] GHL not configured; skipped push for", email);
  }
  if (applicationId !== null) await setApplicationSync(applicationId, { contactId, opportunityId, error: syncError }).catch(() => {});
  if (leadId !== null) await setLeadSync(leadId, { contactId, opportunityId, error: syncError }).catch(() => {});

  const res = NextResponse.json({ ok: true });
  res.cookies.set(LEAD_COOKIE, encodeLead({ email, leadId, opportunityId, contactId }), leadCookieOptions);
  return res;
}
