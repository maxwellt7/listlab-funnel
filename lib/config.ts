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
 * Where every Apply button on the landing page goes ("Apply to see the deal", "Start the 2-minute application").
 *
 * The default is the link from the reviewed page draft. It opens ListLab's "Investor Meet & Greet" calendar in
 * GoHighLevel. To send people to this funnel's own application instead, set NEXT_PUBLIC_APPLY_URL=/apply.
 * An external URL opens in a new tab; a path on this site opens in the same tab. UTM and click-id parameters
 * on the landing page URL are carried over to it either way.
 */
export const APPLY_URL: string =
  process.env.NEXT_PUBLIC_APPLY_URL || "https://api.leadconnectorhq.com/widget/booking/M1eqdYB2kSxkqkYXY7Ry";
