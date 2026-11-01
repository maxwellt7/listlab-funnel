import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Vercel Postgres / Neon. The Vercel ↔ Neon integration sets DATABASE_URL (and POSTGRES_URL on
 * older projects); either works. With neither set, every DB call is skipped and logged so the
 * funnel still runs (GHL is the system of record for leads; the DB is the backup + audit log).
 */
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function hasDb() {
  return Boolean(url);
}

function client() {
  if (!url) return null;
  if (!sql) sql = neon(url);
  return sql;
}

/** Creates the two tables on first use. Idempotent; runs once per server instance. */
export function ensureSchema() {
  const db = client();
  if (!db) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = (async () => {
      await db`
        CREATE TABLE IF NOT EXISTS leads (
          id                 SERIAL PRIMARY KEY,
          email              TEXT UNIQUE NOT NULL,
          ghl_contact_id     TEXT,
          ghl_opportunity_id TEXT,
          source             TEXT,
          landing_path       TEXT,
          utm                JSONB,
          ip                 TEXT,
          user_agent         TEXT,
          sync_error         TEXT,
          created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
      await db`
        CREATE TABLE IF NOT EXISTS applications (
          id                 SERIAL PRIMARY KEY,
          lead_id            INTEGER REFERENCES leads(id),
          email              TEXT NOT NULL,
          full_name          TEXT NOT NULL,
          phone              TEXT NOT NULL,
          invested_before    TEXT NOT NULL,
          accredited         TEXT NOT NULL,
          brings             TEXT[] NOT NULL DEFAULT '{}',
          brings_detail      TEXT,
          ghl_contact_id     TEXT,
          ghl_opportunity_id TEXT,
          sync_error         TEXT,
          ip                 TEXT,
          user_agent         TEXT,
          created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
      await db`CREATE INDEX IF NOT EXISTS applications_email_idx ON applications (email)`;
    })().catch((err) => {
      schemaReady = null; // retry next request
      throw err;
    });
  }
  return schemaReady;
}

export type LeadRow = {
  id: number;
  email: string;
  ghl_contact_id: string | null;
  ghl_opportunity_id: string | null;
};

export async function upsertLead(input: {
  email: string;
  source: string;
  landingPath?: string;
  utm?: Record<string, string>;
  ip?: string;
  userAgent?: string;
}): Promise<LeadRow | null> {
  const db = client();
  if (!db) return null;
  await ensureSchema();
  const rows = (await db`
    INSERT INTO leads (email, source, landing_path, utm, ip, user_agent)
    VALUES (${input.email}, ${input.source}, ${input.landingPath ?? null}, ${JSON.stringify(input.utm ?? {})}::jsonb, ${input.ip ?? null}, ${input.userAgent ?? null})
    ON CONFLICT (email) DO UPDATE SET
      landing_path = COALESCE(EXCLUDED.landing_path, leads.landing_path),
      utm = CASE WHEN EXCLUDED.utm = '{}'::jsonb THEN leads.utm ELSE EXCLUDED.utm END,
      updated_at = now()
    RETURNING id, email, ghl_contact_id, ghl_opportunity_id`) as LeadRow[];
  return rows[0] ?? null;
}

export async function getLeadByEmail(email: string): Promise<LeadRow | null> {
  const db = client();
  if (!db) return null;
  await ensureSchema();
  const rows = (await db`SELECT id, email, ghl_contact_id, ghl_opportunity_id FROM leads WHERE email = ${email}`) as LeadRow[];
  return rows[0] ?? null;
}

export async function setLeadSync(id: number, patch: { contactId?: string | null; opportunityId?: string | null; error?: string | null }) {
  const db = client();
  if (!db) return;
  await db`
    UPDATE leads SET
      ghl_contact_id     = COALESCE(${patch.contactId ?? null}, ghl_contact_id),
      ghl_opportunity_id = COALESCE(${patch.opportunityId ?? null}, ghl_opportunity_id),
      sync_error         = ${patch.error ?? null},
      updated_at         = now()
    WHERE id = ${id}`;
}

export async function insertApplication(input: {
  leadId: number | null;
  email: string;
  fullName: string;
  phone: string;
  investedBefore: string;
  accredited: string;
  brings: string[];
  bringsDetail: string | null;
  ip?: string;
  userAgent?: string;
}): Promise<number | null> {
  const db = client();
  if (!db) return null;
  await ensureSchema();
  const rows = (await db`
    INSERT INTO applications (lead_id, email, full_name, phone, invested_before, accredited, brings, brings_detail, ip, user_agent)
    VALUES (${input.leadId}, ${input.email}, ${input.fullName}, ${input.phone}, ${input.investedBefore}, ${input.accredited}, ${input.brings}, ${input.bringsDetail}, ${input.ip ?? null}, ${input.userAgent ?? null})
    RETURNING id`) as { id: number }[];
  return rows[0]?.id ?? null;
}

export async function setApplicationSync(id: number, patch: { contactId?: string | null; opportunityId?: string | null; error?: string | null }) {
  const db = client();
  if (!db) return;
  await db`
    UPDATE applications SET
      ghl_contact_id     = COALESCE(${patch.contactId ?? null}, ghl_contact_id),
      ghl_opportunity_id = COALESCE(${patch.opportunityId ?? null}, ghl_opportunity_id),
      sync_error         = ${patch.error ?? null}
    WHERE id = ${id}`;
}
