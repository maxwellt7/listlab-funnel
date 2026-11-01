import { site } from "@/lib/config";

export function Footer() {
  return (
    <>
      <footer className="ll-band px-6 py-12 text-center">
        <p className="text-[18px] font-bold leading-7">ListLab</p>
        <p className="mt-2 text-[12px] leading-4 text-on-dark-body">
          {site.address[0]}
          <br />
          {site.address[1]}
        </p>
        {(site.termsUrl || site.privacyUrl) && (
          <p className="mt-5 text-[12px] leading-4">
            {site.termsUrl && (
              <a href={site.termsUrl} className="text-on-dark no-underline hover:underline">
                Terms &amp; Conditions
              </a>
            )}
            {site.termsUrl && site.privacyUrl && <span className="mx-2 text-on-dark-muted">|</span>}
            {site.privacyUrl && (
              <a href={site.privacyUrl} className="text-on-dark no-underline hover:underline">
                Privacy Policy
              </a>
            )}
          </p>
        )}
        <p className="mt-5 text-[12px] leading-4 text-on-dark-muted">{site.copyright}</p>
      </footer>
      <LegalBlock />
    </>
  );
}

export function LegalBlock() {
  return (
    <section className="bg-surface-legal px-6 py-10 text-[12px] leading-[18px] text-ink-body">
      <div className="mx-auto max-w-page">
        <h3 className="mb-3 text-[16px] font-bold leading-6 text-ink">Legal Disclaimers</h3>
        <p className="mb-3">
          Nothing on this website constitutes an offer to sell securities or a recommendation of any security or
          investment product. Any securities that may be offered in the future will only be offered to persons who
          meet applicable legal requirements and will be subject to all applicable federal and state securities laws.
        </p>
        <p className="mb-3">
          <strong>Forward-Looking Statements:</strong> This website may contain forward-looking statements regarding
          potential future outcomes, business prospects, or investment returns. Such statements involve substantial
          risks and uncertainties. Actual results may differ materially from those expressed or implied. No
          representation or warranty is made regarding the achievement of any projected outcomes.
        </p>
        <p className="mb-3">
          <strong>Confidential:</strong> The contents of this page, including all company materials linked to or
          referenced from this page, are confidential and proprietary to ListLab and constitute Confidential
          Information, regardless of whether such materials are explicitly marked as confidential. This material is
          intended solely for the individual or entity to whom it was provided and may not be forwarded, copied, or
          distributed in any form without prior written consent. By accessing this page, you agree to maintain the
          confidentiality of all information presented or referenced herein.
        </p>
        <p className="mb-3">
          <strong>Investment Risk:</strong> Early-stage investing is highly speculative and involves a substantial
          risk of loss. Most startups fail. Any investment in an early-stage company could result in a total loss of
          the invested amount. Past performance of any company or investment is not indicative of future results.
        </p>
        <p className="mb-3">
          <strong>No Professional Advice:</strong> The information provided on this website is for general
          informational purposes only and does not constitute legal, tax, investment, financial, or other professional
          advice. You should consult with qualified professionals before making any decisions based on the information
          presented here.
        </p>
        <p className="mb-3">
          <strong>No Reliance:</strong> You should not rely on any information on this website to make an investment
          or business decision. All information is provided “as is” without warranty of any kind. No contractual or
          other obligation is created by viewing this website.
        </p>
        <p>If this page and the Company’s Private Placement Memorandum differ, the Memorandum controls.</p>
      </div>
    </section>
  );
}
