# ListLab Investor Funnel — Launch Handoff

**From:** Max Mayes · **For:** the ListLab team
**What this is:** the investor landing page and application funnel is built and tested. It runs on our Vercel account and writes every lead and application into *your* GoHighLevel sub-account, so your team owns the follow-up. This page lists the seven things we need from you to go live, in order, and exactly what the funnel will do inside your GHL once it's connected.

Nothing here requires a developer on your side. Budget about 45 minutes in GHL plus one DNS record.

---

## 1. How the funnel works

| Step | Visitor sees | What happens in your GHL |
| --- | --- | --- |
| 1 | Landing page with the VSL. Every "See if you qualify" button opens an email box. | — |
| 2 | Enters email → taken to the application | Contact created (or updated) with tag `listlab-lead`, source "ListLab Landing Page". An **opportunity** is created in your ListLab pipeline at the **New Lead** stage. UTM parameters are saved as a note. |
| 3 | Application: full name, phone, "Have you invested in a deal before?", "Are you an accredited investor?" (Yes / No / Not sure), "What else can you bring to the table?" (Valuable insight / Relationships / Other + a text box) | Contact updated with name and phone. Tags added: `listlab-applied`, `accredited-yes` / `accredited-no` / `accredited-not-sure`, `invested-before-yes` / `invested-before-no`. A **note** with every answer is attached. The opportunity is renamed to the person's name and **moved to Application Submitted**. If you created the optional custom fields (section 4), the answers are written there too. |
| 4 | Thank-you page ("You're in the queue") | — |

Every opt-in and application is also stored in our database as a backup, so nothing is lost if GHL is ever unreachable. Visitors are never blocked by a CRM error.

---

## 2. What we need from you — checklist

| # | Item | Where it comes from | Send to Max |
| --- | --- | --- | --- |
| 1 | **Private Integration token** | GHL → Settings → Private Integrations | the token (starts with `pit-`) |
| 2 | **Location ID** | GHL → Settings → Business Profile | the ID |
| 3 | **Pipeline with two stages** | GHL → Opportunities → Pipelines | just confirm it's created; we'll pull the IDs |
| 4 | **Custom fields** (optional) | GHL → Settings → Custom Fields | confirm created |
| 5 | **Domain or subdomain** for the page | your DNS provider | the hostname you chose + add one DNS record |
| 6 | **VSL embed code** | your video host (Wistia, Vimeo, Vidalytics…) | the `<iframe>` snippet |
| 7 | **Terms & Privacy page URLs** | your site | two links |

Details for each below.

### 2.1 Private Integration token

1. In your ListLab sub-account: **Settings → Private Integrations → Create new integration**.
2. Name it `ListLab Funnel`.
3. Tick these scopes and nothing else:
   `contacts.readonly` · `contacts.write` · `opportunities.readonly` · `opportunities.write` · `locations/customFields.readonly`
4. Copy the token. It's shown once. Send it to Max over a secure channel (not email in plain text — a password manager share or Signal is fine).

### 2.2 Location ID

**Settings → Business Profile** — the Location ID is on the right. It looks like `ve9EPM428h8vShlRW1KT`.

### 2.3 Pipeline

Create a pipeline named **ListLab Investors** (any name works — we match on IDs, not names) with at least these two stages in this order:

1. **New Lead** — set when someone enters their email
2. **Application Submitted** — set when the application is completed

Add your own stages after those for your process, e.g. *Reviewing · NDA Sent · NDA Signed · Materials Viewed · Call Booked · Committed · Closed Won · Closed Lost*. The funnel only ever touches the first two; everything after is yours.

Once the token and Location ID are in place, Max pulls the pipeline and stage IDs automatically — you don't need to find them.

### 2.4 Custom fields (optional but recommended)

Tags and a note always carry the answers. If you also want them as filterable fields on the contact record, create these under **Settings → Custom Fields → Contact**:

| Field name | Type |
| --- | --- |
| Invested in a deal before | Single line text |
| Accredited investor | Single line text |
| Brings to the table | Single line text |
| Brings to the table — detail | Multi line text |

Max will map them by ID.

### 2.5 Domain

Pick where the page lives. A **subdomain is simplest** and keeps your main site untouched — for example `invest.yourdomain.com` or `apply.yourdomain.com`.

Tell Max the hostname. He'll add it to the Vercel project, and Vercel will show the exact DNS record to create — for a subdomain it's a single **CNAME**; for a bare domain it's an **A** record. Add that record at your DNS provider; the certificate is issued automatically within a few minutes. (If it's easier, give Max DNS access and he'll do it.)

### 2.6 VSL embed

Send the embed snippet from your video host. The page is built around a 16:9 player; autoplay settings are controlled on your host's side.

### 2.7 Terms & Privacy

The footer has slots for *Terms & Conditions* and *Privacy Policy*. They stay hidden until you send the two URLs. The legal disclaimers block from your copy doc is already on the page.

---

## 3. Workflows to build in GHL

The funnel fires the triggers; your workflows do the talking. Three are enough to launch. Trigger on the **tags** (most reliable) or on the pipeline stage — both are set at the same moment.

### A. New lead, hasn't applied yet
- **Trigger:** Contact Tag Added → `listlab-lead`
- **Goal:** get them to finish the application
- Wait 20 min → *If* contact does **not** have tag `listlab-applied` → email "Finish your application" with a link to the page. Repeat once the next day. Stop the moment `listlab-applied` is added.

### B. Application received
- **Trigger:** Contact Tag Added → `listlab-applied` *(or Pipeline Stage Changed → Application Submitted)*
- Send the applicant a confirmation ("We review every application by hand…").
- Internal notification (email/SMS/Slack) to whoever reviews applications, including the contact's note with the answers.
- Create a task "Review application" assigned to the reviewer, due in 1 business day.

### C. Accreditation routing (branch inside B, or its own workflow)
- `accredited-yes` → fast lane: reviewer task gets high priority.
- `accredited-not-sure` → send a short "what accredited means" email; keep them in the pipeline.
- `accredited-no` → a courteous email explaining the offering is limited to accredited investors; move the opportunity to Closed Lost (or a "Not eligible" stage).

Later stages (NDA sent, signed, materials, call booked) are manual or automated by you — the funnel never moves an opportunity past Application Submitted.

**Email deliverability:** make sure a sending domain is verified in your sub-account (Settings → Email Services → Dedicated Domain) before launch, or workflow emails will land in spam.

---

## 4. What the data looks like in GHL

**Contact after opt-in**
- Email · Source: `ListLab Landing Page` · Tag: `listlab-lead`
- Note: "Opted in on ListLab Landing Page (/). UTM: {…}" (only when UTM parameters were present)

**Contact after application**
- First name, last name, phone
- Tags: `listlab-lead`, `listlab-applied`, `accredited-yes|no|not-sure`, `invested-before-yes|no`
- Note:
  ```
  ListLab investor application
  Name: Jane Investor
  Phone: +1 555 010 2030
  Invested in a deal before: Yes
  Accredited investor: Not sure
  Brings to the table: Relationships
  Detail: I sit on two family-office investment committees.
  ```
- Custom fields (if created): the same four values

**Opportunity**
- Name: `ListLab — jane@example.com` → renamed `ListLab — Jane Investor` on application
- Pipeline: ListLab Investors · Stage: New Lead → Application Submitted · Status: open · Source: ListLab Landing Page

---

## 5. Launch checklist (Max runs this with you)

1. Token + Location ID added → `/api/ghl/pipelines` returns your pipelines and fields → stage IDs mapped.
2. Test opt-in with a real email of yours → contact appears with `listlab-lead`, opportunity sits in **New Lead**.
3. Complete the test application → contact has name/phone, note, tags; opportunity is in **Application Submitted**.
4. Workflow A fires on the opt-in; B (and C) fire on the application. Check the emails land in the inbox, not spam.
5. VSL plays on desktop and phone.
6. Domain resolves with a valid certificate; `https://` only.
7. Delete the test contact and opportunity. Go live.

---

## 6. Questions

Anything on this page: Max Mayes — max@maxwellmayes.com.
