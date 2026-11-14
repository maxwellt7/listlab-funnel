/**
 * Site-level settings. Everything here is safe to ship to the browser.
 * Secrets live in environment variables (see .env.example) and are read in lib/ghl.ts / lib/db.ts.
 */

export const site = {
  name: "ListLab",
  /** Shown in the footer. */
  address: ["1968 S. Coast Hwy #2253", "Laguna Beach, California 92651"],
  copyright: "© 2025–2026 ListLab. All rights reserved.",
  /** Footer legal links. Leave empty to hide a link until ListLab supplies the page. */
  termsUrl: process.env.NEXT_PUBLIC_TERMS_URL ?? "",
  privacyUrl: process.env.NEXT_PUBLIC_PRIVACY_URL ?? "",
  /** The thank-you page's "what happens next" */
  nextSteps: [
    { title: "Apply.", body: "A few questions about who you are and what you'd bring." },
    { title: "Sign the NDA.", body: "If you're approved." },
    { title: "See everything.", body: "What the company is. The numbers. The team." },
    { title: "Decide.", body: "No pressure, no call you didn't ask for." },
  ],
};

/**
 * The landing page VSL, hosted on Vidalytics. Both values come straight from the Vidalytics embed snippet:
 *
 *   <div id="vidalytics_embed_0PmXFINealUU8RRj" …></div>                       ← embedId is the part after "vidalytics_embed_"
 *   …})(window, document, 'Vidalytics', 'vidalytics_embed_0PmXFINealUU8RRj',
 *        'https://fast.vidalytics.com/embeds/Atjoh1F2/0PmXFINealUU8RRj/');     ← baseUrl is this last argument
 *
 * To swap the video, change them here or set the two env vars and redeploy. If either is empty or
 * malformed the page shows a plain dark placeholder instead of a player.
 */
export const VSL = {
  embedId: process.env.NEXT_PUBLIC_VIDALYTICS_EMBED_ID ?? "0PmXFINealUU8RRj",
  baseUrl: process.env.NEXT_PUBLIC_VIDALYTICS_BASE_URL ?? "https://fast.vidalytics.com/embeds/Atjoh1F2/0PmXFINealUU8RRj/",
};

/**
 * Where every button on the landing page goes.
 *
 * The default is the link from the reviewed page draft. It opens ListLab's "Investor Meet & Greet" calendar in
 * GoHighLevel. To send people to this funnel's own application instead, set NEXT_PUBLIC_APPLY_URL=/apply.
 * An external URL opens in a new tab; a path on this site opens in the same tab. UTM and click-id parameters
 * on the landing page URL are carried over to it either way.
 */
export const APPLY_URL: string =
  process.env.NEXT_PUBLIC_APPLY_URL || "https://api.leadconnectorhq.com/widget/booking/M1eqdYB2kSxkqkYXY7Ry";

/**
 * What the buttons say, and what step one of "what happens next" is.
 *
 * Counsel's review of 2026-11-13 (LP-07, LP-08): a button that opens a calendar has to be labeled as scheduling
 * a screening call, not as an application, and the page's steps have to match what actually happens. So the
 * wording follows the destination: a booking-calendar link gets the "schedule a call" wording; anything else
 * (this site's /apply, or another application form) keeps the "apply" wording from the 2026-11-09 draft.
 * NEXT_PUBLIC_APPLY_MODE=booking or =application overrides the guess if the link type isn't obvious from the URL.
 */
const mode = (process.env.NEXT_PUBLIC_APPLY_MODE ?? "").toLowerCase();
export const APPLY_IS_BOOKING: boolean =
  mode === "booking" || (mode !== "application" && /\/widget\/booking\/|calendly\.com|\/booking\b/i.test(APPLY_URL));

export const CTA = APPLY_IS_BOOKING
  ? {
      button: "Schedule a screening call",
      start: "Pick a time for the call",
      step1: { title: "Schedule a call", body: "Pick a time for a 30-minute screening call with the company." },
      step2When: "At the time you pick",
      notSure: "schedule the call anyway; the company will walk you through it.",
    }
  : {
      button: "Apply to see the deal",
      start: "Start the 2-minute application",
      step1: { title: "Apply", body: "A few questions about who you are and what you're looking for." },
      step2When: "In a couple of days",
      notSure: "apply anyway; the application walks you through it.",
    };
