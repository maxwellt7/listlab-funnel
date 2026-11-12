"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

/**
 * The "Experienced investor? Give me the short version" card.
 * From 1280px up it sits in the right rail beside the hero; below that it is a full-width bar above the
 * video that opens in place. The card's contents are passed in as children so the copy stays in the page file.
 */
export function ShortVersion({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Rail notes (the pull quotes) sit beside their section; if the card above runs long, push them below it.
  const clearRail = useCallback(() => {
    if (!rail.current) return;
    let floor = rail.current.getBoundingClientRect().bottom + window.scrollY + 32;
    document.querySelectorAll<HTMLElement>(".rail-note").forEach((note) => {
      note.style.marginTop = "0px";
      if (!note.offsetParent) return;
      const top = note.getBoundingClientRect().top + window.scrollY;
      if (top < floor) note.style.marginTop = `${floor - top}px`;
      floor = Math.max(floor, note.getBoundingClientRect().bottom + window.scrollY + 32);
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("short-open", open);
    clearRail();
  }, [open, clearRail]);

  useEffect(() => {
    window.addEventListener("load", clearRail);
    window.addEventListener("resize", clearRail);
    document.fonts?.ready.then(clearRail, () => {});
    return () => {
      window.removeEventListener("load", clearRail);
      window.removeEventListener("resize", clearRail);
      document.body.classList.remove("short-open");
    };
  }, [clearRail]);

  function close() {
    flushSync(() => setOpen(false));
    if (toggle.current) window.scrollTo({ top: toggle.current.getBoundingClientRect().top + window.scrollY - 16 });
  }

  return (
    <div className="rail-col" ref={rail}>
      <div className="sig-callout" aria-hidden="true">
        <span>Experienced investor?</span>
        <svg className="hand-arrow" width="64" height="62" viewBox="0 0 64 62" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength="100" d="M4 12 C 26 2, 50 12, 46 54" />
          <path pathLength="100" d="M37 45 L 46 56 L 55 45" />
        </svg>
      </div>
      <button className="sig-toggle" type="button" aria-expanded={open} aria-controls="signals" id="sig-open" ref={toggle} onClick={() => setOpen((v) => !v)}>
        <span className="lbl">
          <span className="q">Experienced investor?</span> <b className="act">{open ? "Hide the short version" : "Give me the short version"}</b>
        </span>
        <svg className="chev" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>
      <aside className={open ? "signals open" : "signals"} id="signals" aria-labelledby="signals-h">
        {children}
        <button className="sig-close" type="button" onClick={close}>
          Hide the short version{" "}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5-5 5 5" />
          </svg>
        </button>
      </aside>
    </div>
  );
}
