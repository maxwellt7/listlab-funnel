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
 * The VSL embed. Paste the provider's embed snippet here (Wistia, Vimeo, Vidalytics, YouTube…)
 * or set NEXT_PUBLIC_VSL_EMBED_HTML in the environment. Leave empty to show the placeholder.
 *
 * Example (Vimeo):
 *   '<iframe src="https://player.vimeo.com/video/000000000?badge=0&autopause=0&player_id=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="ListLab"></iframe>'
 */
export const VSL_EMBED_HTML: string = process.env.NEXT_PUBLIC_VSL_EMBED_HTML ?? "";

/** Aspect ratio of the VSL container. 16/9 for landscape video. */
export const VSL_ASPECT = "16 / 9";
