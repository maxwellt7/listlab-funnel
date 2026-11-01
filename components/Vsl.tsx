import { VSL_ASPECT, VSL_EMBED_HTML } from "@/lib/config";

/**
 * The video. When VSL_EMBED_HTML is empty it renders a dark placeholder so the layout is final
 * before the embed code arrives. The embed is injected as-is, so only paste snippets you trust.
 */
export function Vsl() {
  return (
    <div
      className="relative mx-auto w-full max-w-[800px] overflow-hidden rounded-[16px] bg-black shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
      style={{ aspectRatio: VSL_ASPECT }}
    >
      {VSL_EMBED_HTML ? (
        <div className="absolute inset-0 [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: VSL_EMBED_HTML }} />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#2b1a4b_0,#100727_70%)]">
          <div className="flex flex-col items-center gap-4 text-on-dark">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-pale">
              Video
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
