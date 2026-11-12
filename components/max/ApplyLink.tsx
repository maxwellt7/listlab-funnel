"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { APPLY_URL } from "@/lib/config";

/** The same attribution parameters the opt-in API keeps (see components/OptIn.tsx). */
const TRACKING = /^(utm_|fbclid|gclid|ref$)/;

const noSubscription = () => () => {};
const readSearch = () => window.location.search;
const emptySearch = () => "";

/** Adds the visitor's UTM / click-id parameters to the apply link so the source survives the hand-off. */
function withTracking(base: string, search: string): string {
  if (!search) return base;
  const carried = [...new URLSearchParams(search)].filter(([key]) => TRACKING.test(key));
  if (!carried.length) return base;
  try {
    const external = /^https?:\/\//i.test(base);
    const url = new URL(base, window.location.origin);
    for (const [key, value] of carried) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value.slice(0, 200));
    }
    return external ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return base;
  }
}

/**
 * Every Apply button on the landing page. The destination is set once, in lib/config.ts (APPLY_URL).
 * Works without JavaScript; with it, tracking parameters from the page URL are appended.
 */
export function ApplyLink({ className, children }: { className?: string; children: ReactNode }) {
  const search = useSyncExternalStore(noSubscription, readSearch, emptySearch);
  const external = /^https?:\/\//i.test(APPLY_URL);
  return (
    <a className={className} href={withTracking(APPLY_URL, search)} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
    </a>
  );
}
