# ListLab investor funnel

Landing page → email opt-in → application → thank-you. Next.js 16 on Vercel, Postgres (Neon) for the audit log,
GoHighLevel for the CRM/pipeline. Styled from the ListLab design system.

## Flow

| Step | Route | What happens |
| --- | --- | --- |
| Landing | `/` | VSL + copy. Every "See if you qualify" button opens the email modal. |
| Opt-in | `POST /api/optin` | Saves the lead to Postgres → upserts a GHL contact tagged `listlab-lead` → creates an opportunity in the **New Lead** stage → sets a signed cookie with the email → client goes to `/apply`. |
| Application | `/apply` → `POST /api/apply` | Name, phone, invested-before, accredited, what-you-bring. Saves to Postgres → upserts the contact (name/phone, tags `listlab-applied`, `accredited-*`, `invested-before-*`, a note with every answer, optional custom fields) → moves the opportunity to **Application Submitted** (creates one there if none exists). |
| Thank-you | `/thank-you` | Confirmation + next steps. |

Nothing ever blocks the visitor: if the database or GHL is down, the error is logged (and stored on the row's `sync_error`) and the person still moves forward.

## Run locally

```bash
cp .env.example .env.local   # fill in what you have; everything is optional for a local render
npm install
npm run dev
```

## Deploy

1. Push to GitHub, import into Vercel.
2. Storage → add **Neon** (Postgres). It sets `DATABASE_URL`. Tables are created automatically on first request.
3. Add the env vars from `.env.example`. Redeploy.
4. Visit `/api/ghl/pipelines?secret=<SETUP_SECRET>` to read the pipeline/stage/custom-field ids, fill in `GHL_PIPELINE_ID`, `GHL_STAGE_*`, redeploy.
5. Settings → Domains → add the ListLab domain (see `HANDOFF.md` for the DNS records).

## Files

- `app/page.tsx` — landing page copy and sections
- `components/OptIn.tsx` — CTA button + email modal
- `components/ApplicationForm.tsx` — the application
- `lib/ghl.ts` — GHL API v2 client (`syncOptIn`, `syncApplication`)
- `lib/db.ts` — Postgres schema + queries
- `lib/config.ts` — VSL embed, footer, next steps
- `HANDOFF.md` — what ListLab needs to do on their side
