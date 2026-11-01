/**
 * GoHighLevel (LeadConnector) API v2 client.
 *
 * Auth is a Private Integration Token created in ListLab's sub-account:
 *   Settings → Private Integrations → Create → scopes:
 *   contacts.readonly, contacts.write, opportunities.readonly, opportunities.write,
 *   locations/customFields.readonly, locations/tags.write (optional)
 *
 * Env vars (see .env.example): GHL_API_KEY, GHL_LOCATION_ID, GHL_PIPELINE_ID,
 * GHL_STAGE_NEW_LEAD_ID, GHL_STAGE_APPLICATION_SUBMITTED_ID, optional GHL_CF_* ids.
 */

const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

export const ghlEnv = {
  apiKey: process.env.GHL_API_KEY ?? "",
  locationId: process.env.GHL_LOCATION_ID ?? "",
  pipelineId: process.env.GHL_PIPELINE_ID ?? "",
  stageNewLead: process.env.GHL_STAGE_NEW_LEAD_ID ?? "",
  stageApplied: process.env.GHL_STAGE_APPLICATION_SUBMITTED_ID ?? "",
  // optional custom field ids — when set, answers are written to the contact record as fields
  cfInvestedBefore: process.env.GHL_CF_INVESTED_BEFORE_ID ?? "",
  cfAccredited: process.env.GHL_CF_ACCREDITED_ID ?? "",
  cfBrings: process.env.GHL_CF_BRINGS_ID ?? "",
  cfBringsDetail: process.env.GHL_CF_BRINGS_DETAIL_ID ?? "",
};

export const TAGS = {
  lead: "listlab-lead",
  applied: "listlab-applied",
  accredited: (v: string) => `accredited-${v}`, // accredited-yes | accredited-no | accredited-not-sure
  invested: (v: string) => `invested-before-${v}`, // invested-before-yes | invested-before-no
};

export const SOURCE = "ListLab Landing Page";

export function ghlConfigured() {
  return Boolean(ghlEnv.apiKey && ghlEnv.locationId);
}

export class GhlError extends Error {
  constructor(message: string, public status: number, public body: unknown) {
    super(message);
  }
}

async function ghl<T>(path: string, init: RequestInit & { query?: Record<string, string | undefined> } = {}): Promise<T> {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(init.query ?? {})) if (v) url.searchParams.set(k, v);
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${ghlEnv.apiKey}`,
      Version: VERSION,
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* keep text */
  }
  if (!res.ok) {
    const msg = (body as { message?: string | string[] })?.message;
    throw new GhlError(`GHL ${init.method ?? "GET"} ${path} → ${res.status}: ${Array.isArray(msg) ? msg.join("; ") : msg ?? text}`, res.status, body);
  }
  return body as T;
}

// ---------- Contacts ----------

export type GhlContact = { id: string; email?: string; firstName?: string; lastName?: string; phone?: string; tags?: string[] };

type CustomField = { id: string; field_value: string | string[] };

/** Create-or-update by email. Returns the contact id. */
export async function upsertContact(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  customFields?: CustomField[];
  source?: string;
}): Promise<GhlContact> {
  const data = await ghl<{ contact: GhlContact; new?: boolean }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId: ghlEnv.locationId,
      email: input.email,
      ...(input.firstName ? { firstName: input.firstName } : {}),
      ...(input.lastName ? { lastName: input.lastName } : {}),
      ...(input.phone ? { phone: input.phone } : {}),
      ...(input.tags?.length ? { tags: input.tags } : {}),
      ...(input.customFields?.length ? { customFields: input.customFields } : {}),
      source: input.source ?? SOURCE,
    }),
  });
  return data.contact;
}

/** Upsert merges tags; this guarantees the tags land even if the contact already existed. */
export async function addTags(contactId: string, tags: string[]) {
  if (!tags.length) return;
  await ghl(`/contacts/${contactId}/tags`, { method: "POST", body: JSON.stringify({ tags }) });
}

export async function addNote(contactId: string, body: string) {
  await ghl(`/contacts/${contactId}/notes`, { method: "POST", body: JSON.stringify({ body }) });
}

// ---------- Opportunities ----------

export type GhlOpportunity = { id: string; name: string; pipelineId: string; pipelineStageId: string; status: string; contact?: { id: string } };

export async function findOpenOpportunity(contactId: string): Promise<GhlOpportunity | null> {
  if (!ghlEnv.pipelineId) return null;
  const data = await ghl<{ opportunities?: GhlOpportunity[] }>("/opportunities/search", {
    query: { location_id: ghlEnv.locationId, contact_id: contactId, pipeline_id: ghlEnv.pipelineId, status: "open" },
  });
  return data.opportunities?.[0] ?? null;
}

export async function createOpportunity(input: { contactId: string; name: string; stageId: string; source?: string }): Promise<GhlOpportunity> {
  const data = await ghl<{ opportunity: GhlOpportunity }>("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      locationId: ghlEnv.locationId,
      pipelineId: ghlEnv.pipelineId,
      pipelineStageId: input.stageId,
      contactId: input.contactId,
      name: input.name,
      status: "open",
      source: input.source ?? SOURCE,
    }),
  });
  return data.opportunity;
}

export async function updateOpportunity(id: string, patch: { stageId?: string; name?: string; status?: "open" | "won" | "lost" | "abandoned" }): Promise<GhlOpportunity> {
  const data = await ghl<{ opportunity: GhlOpportunity }>(`/opportunities/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...(patch.stageId ? { pipelineStageId: patch.stageId } : {}),
      ...(patch.name ? { name: patch.name } : {}),
      ...(patch.status ? { status: patch.status } : {}),
    }),
  });
  return data.opportunity;
}

/** Lists pipelines + stage ids for the location — used by /api/ghl/pipelines during setup. */
export async function listPipelines() {
  return ghl<{ pipelines: { id: string; name: string; stages: { id: string; name: string; position: number }[] }[] }>("/opportunities/pipelines", {
    query: { locationId: ghlEnv.locationId },
  });
}

/** Lists custom fields for the location — used by /api/ghl/pipelines during setup. */
export async function listCustomFields() {
  return ghl<{ customFields: { id: string; name: string; fieldKey: string; dataType: string; model?: string }[] }>(`/locations/${ghlEnv.locationId}/customFields`, {
    query: { model: "contact" },
  });
}

// ---------- Funnel operations ----------

/** Step 1: email opt-in → contact tagged as lead + an open opportunity in the New Lead stage. */
export async function syncOptIn(email: string, extra: { utm?: Record<string, string>; landingPath?: string } = {}) {
  const contact = await upsertContact({ email, tags: [TAGS.lead] });
  await addTags(contact.id, [TAGS.lead]);

  let opportunity: GhlOpportunity | null = null;
  if (ghlEnv.pipelineId && ghlEnv.stageNewLead) {
    opportunity = await findOpenOpportunity(contact.id);
    if (!opportunity) {
      opportunity = await createOpportunity({ contactId: contact.id, name: `ListLab — ${email}`, stageId: ghlEnv.stageNewLead });
    }
  }
  const utmLine = extra.utm && Object.keys(extra.utm).length ? `\nUTM: ${JSON.stringify(extra.utm)}` : "";
  if (utmLine || extra.landingPath) {
    await addNote(contact.id, `Opted in on ${SOURCE}${extra.landingPath ? ` (${extra.landingPath})` : ""}.${utmLine}`).catch(() => {});
  }
  return { contactId: contact.id, opportunityId: opportunity?.id ?? null };
}

export type ApplicationAnswers = {
  email: string;
  fullName: string;
  phone: string;
  investedBefore: "yes" | "no";
  accredited: "yes" | "no" | "not-sure";
  brings: ("insight" | "relationships" | "other")[];
  bringsDetail: string | null;
};

const BRINGS_LABEL: Record<ApplicationAnswers["brings"][number], string> = {
  insight: "Valuable insight",
  relationships: "Relationships",
  other: "Other",
};
const ACCREDITED_LABEL: Record<ApplicationAnswers["accredited"], string> = { yes: "Yes", no: "No", "not-sure": "Not sure" };

/** Step 2: application → contact updated + tagged, note with answers, opportunity moved to Application Submitted. */
export async function syncApplication(a: ApplicationAnswers, known: { opportunityId?: string | null } = {}) {
  const [firstName, ...rest] = a.fullName.trim().split(/\s+/);
  const lastName = rest.join(" ");
  const tags = [TAGS.lead, TAGS.applied, TAGS.accredited(a.accredited), TAGS.invested(a.investedBefore)];
  const bringsLabels = a.brings.map((b) => BRINGS_LABEL[b]);

  const customFields: CustomField[] = [];
  if (ghlEnv.cfInvestedBefore) customFields.push({ id: ghlEnv.cfInvestedBefore, field_value: a.investedBefore === "yes" ? "Yes" : "No" });
  if (ghlEnv.cfAccredited) customFields.push({ id: ghlEnv.cfAccredited, field_value: ACCREDITED_LABEL[a.accredited] });
  if (ghlEnv.cfBrings) customFields.push({ id: ghlEnv.cfBrings, field_value: bringsLabels.join(", ") });
  if (ghlEnv.cfBringsDetail && a.bringsDetail) customFields.push({ id: ghlEnv.cfBringsDetail, field_value: a.bringsDetail });

  const contact = await upsertContact({ email: a.email, firstName, lastName: lastName || undefined, phone: a.phone, tags, customFields });
  await addTags(contact.id, tags);

  await addNote(
    contact.id,
    [
      "ListLab investor application",
      `Name: ${a.fullName}`,
      `Phone: ${a.phone}`,
      `Invested in a deal before: ${a.investedBefore === "yes" ? "Yes" : "No"}`,
      `Accredited investor: ${ACCREDITED_LABEL[a.accredited]}`,
      `Brings to the table: ${bringsLabels.join(", ") || "—"}`,
      a.bringsDetail ? `Detail: ${a.bringsDetail}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  ).catch(() => {});

  let opportunityId: string | null = known.opportunityId ?? null;
  if (ghlEnv.pipelineId && ghlEnv.stageApplied) {
    const name = `ListLab — ${a.fullName}`;
    if (!opportunityId) opportunityId = (await findOpenOpportunity(contact.id))?.id ?? null;
    if (opportunityId) {
      try {
        await updateOpportunity(opportunityId, { stageId: ghlEnv.stageApplied, name });
      } catch (err) {
        if (err instanceof GhlError && err.status === 404) opportunityId = null; // stale id → create fresh below
        else throw err;
      }
    }
    if (!opportunityId) {
      opportunityId = (await createOpportunity({ contactId: contact.id, name, stageId: ghlEnv.stageApplied })).id;
    }
  }
  return { contactId: contact.id, opportunityId };
}
