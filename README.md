# ListLab investor funnel

Max's VSL landing page → application → thank-you. Next.js 16 on Vercel, Postgres (Neon) for the audit log,
GoHighLevel for the CRM/pipeline.

## Flow

| Step | Route | What happens |
| --- | --- | --- |
| Landing | `/` | Max's VSL landing page ("Max Mayes on Investing"): the Vidalytics VSL, the long-form page, and the "short version" card for experienced investors. Every Apply button goes to one destination, `APPLY_URL` (see below). |
| Opt-in | `POST /api/optin` | Saves the lead to Postgres → upserts a GHL contact tagged `listlab-lead` → creates an opportunity in the **New Lead** stage → sets a signed cookie with the email → client goes to `/apply`. Not called by the current landing page (see "Where Apply goes"). |
| Application | `/apply` → `POST /api/apply` | Email (when there is no opt-in cookie), name, phone, invested-before, accredited, what-you-bring. Saves to Postgres → upserts the contact (name/phone, tags `listlab-applied`, `accredited-*`, `invested-before-*`, a note with every answer, optional custom fields) → moves the opportunity to **Application Submitted** (creates one there if none exists). |
| Thank-you | `/thank-you` | Confirmation + next steps. |

Nothing ever blocks the visitor: if the database or GHL is down, the error is logged (and stored on the row's `sync_error`) and the person still moves forward.

## The landing page

The copy in `app/(max)/page.tsx` is the counsel-review draft of 2026-11-09 with counsel's line edits of
2026-11-13 applied (headline, the header disclosure, the return and "upside" lines, both FAQ answers, the
Rule 506(c) legend by the first button, footnote 1), footnotes included. Treat it as reviewed text: change
wording, numbers or dates only when the reviewed copy changes. Footnote 1 states Max's pay to date and its
"through" date (November 13, 2026), so it has to be updated whenever either moves.

The page has its own root layout, fonts and stylesheet (`app/(max)/`) and shares nothing visual with the
application pages (`app/(funnel)/`, Tailwind + the ListLab design system). Going from one to the other is a
normal page load.

### Where Apply goes

`APPLY_URL` in `lib/config.ts`, or the `NEXT_PUBLIC_APPLY_URL` env var.

- Default: the link from the reviewed draft, which opens ListLab's "Investor Meet & Greet" calendar in GoHighLevel.
- `NEXT_PUBLIC_APPLY_URL=/apply` sends people to this funnel's own application instead. Before using it, add the
  `GHL_*` env vars (step 3–4 under Deploy); without them applications are stored in Postgres but never reach GHL.

The button wording follows the destination (`CTA` in `lib/config.ts`), because counsel asked that a button
which opens a calendar say so:

- a booking-calendar link (the default) → "Schedule a screening call" / "Pick a time for the call", and step one
  of "what happens next" is scheduling the call;
- `/apply` or any other form → "Apply to see the deal" / "Start the 2-minute application", and step one is the
  application.

`NEXT_PUBLIC_APPLY_MODE=booking` or `=application` overrides the guess when the URL doesn't make it obvious.

UTM parameters and click ids (`utm_*`, `fbclid`, `gclid`, `ref`) on the landing page URL are appended to the
Apply link, so the ad source survives the hand-off.

### The video

Vidalytics. The embed id and base URL from the Vidalytics snippet live in `lib/config.ts` (`VSL`), overridable with
`NEXT_PUBLIC_VIDALYTICS_EMBED_ID` and `NEXT_PUBLIC_VIDALYTICS_BASE_URL`. Autoplay, thumbnail and player controls
are set in Vidalytics, not here.

### Footer links

"Privacy · Terms" at the bottom of the page is plain text until `NEXT_PUBLIC_PRIVACY_URL` and
`NEXT_PUBLIC_TERMS_URL` are set; then each word links to its page.

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

- `app/(max)/page.tsx` — landing page copy and sections
- `app/(max)/max.css`, `app/(max)/layout.tsx`, `app/(max)/fonts/` — the landing page's stylesheet, root layout and fonts
- `components/max/` — the pieces of the landing page that do something: `VslPlayer` (video), `ApplyLink` (every Apply button), `ShortVersion` (the short-version card), `Person` (operator cards)
- `public/operators/` — the four operator photos
- `app/(funnel)/` — the application and thank-you pages and their layout
- `components/ApplicationForm.tsx` — the application
- `components/OptIn.tsx` — CTA button + email modal from the first landing page; kept for an email-first step, not used by the current page
- `lib/ghl.ts` — GHL API v2 client (`syncOptIn`, `syncApplication`)
- `lib/db.ts` — Postgres schema + queries
- `lib/config.ts` — VSL ids, Apply destination, footer, next steps
- `HANDOFF.md` — what ListLab needs to do on their side
