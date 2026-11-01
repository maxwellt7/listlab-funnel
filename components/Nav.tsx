import Link from "next/link";

export function Nav() {
  return (
    <header className="ll-nav text-on-dark">
      <div className="mx-auto flex h-[64px] max-w-page items-center px-6">
        <Link href="/" className="text-[15px] font-bold tracking-tight text-on-dark no-underline">
          ListLab
        </Link>
        <span aria-hidden className="ml-4 h-6 w-px" style={{ background: "var(--pill-border)" }} />
        <span className="ml-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-accent-pale">
          Accredited investors only
        </span>
      </div>
    </header>
  );
}
