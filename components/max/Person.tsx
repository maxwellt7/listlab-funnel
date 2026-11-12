"use client";

import { useState, type ReactNode } from "react";

/** One operator card. On phones the bio is clamped to three lines with a "Show more" toggle (see max.css). */
export function Person({ name, role, photo, linkedin, children }: { name: string; role: string; photo: string; linkedin: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "person open" : "person"}>
      {/* A 320px square, sized and cropped in CSS; next/image would add nothing here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt={name} loading="lazy" decoding="async" />
      <b>{name}</b>
      <span className="role">{role}</span>
      <p>{children}</p>
      <button type="button" className="bio-more" onClick={() => setOpen((v) => !v)}>
        {open ? "Show less" : "Show more"}
      </button>
      <a className="li" href={linkedin} target="_blank" rel="noopener">
        LinkedIn ↗
      </a>
    </div>
  );
}
