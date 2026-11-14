import { ApplyLink } from "@/components/max/ApplyLink";
import { Person } from "@/components/max/Person";
import { ShortVersion } from "@/components/max/ShortVersion";
import { VslPlayer } from "@/components/max/VslPlayer";
import { CTA, site } from "@/lib/config";

/**
 * Max's VSL landing page.
 *
 * The copy below is the counsel-review draft of 2026-11-09 with counsel's line edits of 2026-11-13 applied
 * (LP-00 to LP-08 and the three landing-page strings in his cover email), including every footnote and its
 * number. Treat it as reviewed text: change wording, numbers or dates only when the reviewed copy changes
 * (footnote 1 carries Max's pay to date and its "through" date, so it needs updating when either moves).
 *
 * The button labels and the first "what happens next" step come from CTA in lib/config.ts, because they have
 * to say what the button really opens: a call-booking calendar today, or this site's own application.
 *
 * Three things are wired rather than written here:
 *   - the video            -> components/max/VslPlayer.tsx   (Vidalytics ids in lib/config.ts)
 *   - every Apply button   -> components/max/ApplyLink.tsx   (APPLY_URL and CTA in lib/config.ts)
 *   - the short-version card and the rail notes beside it -> components/max/ShortVersion.tsx
 */
export default function MaxLandingPage() {
  return (
    <main>
      <header className="site-head" id="top">
        <div className="wrap">
          <div className="head-who">
            <div className="portrait" aria-hidden="true">MM</div>
            <div className="byline-text"><div className="brand">Max Mayes</div> Growth marketer. My campaigns have helped raise $30M+ for other people&apos;s deals: startups, family offices, real estate.</div>
          </div>
          <p className="upfront head-upfront"><strong>Up front:</strong> the company pays me for marketing work, including this campaign.<a className="fn" href="#fee">1</a> My pay isn&apos;t tied to what they raise. I am also an investor in this offering, which may create a conflict of interest. Weigh what I say accordingly.</p>
        </div>
      </header>
      {/* HERO: the rant (slow lane, left) + why-I-said-yes card (fast lane, right) */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">My take on investing</div>
            <h1>I&apos;ve been passing on almost everything. <em>Here&apos;s the rare deal I still wrote a check for</em> <span className="h1-risk">(knowing it can go to zero).</span></h1>
            <p className="lede">I see a lot of pitches, and right now almost nothing looks good to me. Here&apos;s why, and one deal I did put my own money into.</p>
            <VslPlayer />
            <div className="cta-row hero-cta">
              <ApplyLink className="btn btn-primary">{CTA.button}</ApplyLink>
              <div className="cta-notes">
                <b>The current minimum is $10,000 (subject to change). Only invest what you can afford to lose.</b>
                <a className="qualify-link" href="#qualify">Not sure you qualify? Here&apos;s what it takes.</a>
              </div>
            </div>
            <p className="legend-506c"><b>PRIVATE PLACEMENT — ACCREDITED INVESTORS ONLY.</b> This is a general solicitation under Rule 506(c). Securities are sold only to verified accredited investors. Investing involves risk, including possible loss of principal. This is not an offer where unlawful. Full offering documents (including the PPM) are available only after an NDA.</p>
          </div>
          {/* FAST LANE: why it got my attention, for the reader who scans */}
          <ShortVersion>
            <div className="punch-label">
              <div className="sig-k" id="signals-h">Why this one made me stop</div>
            </div>
            <ol className="punch">
              <li>
                <h3>This isn&apos;t a bet on the headlines.</h3>
                <p>It&apos;s a business built around a behavior that I believe holds up in good times and bad – even downturns and crises. Whether AI kills jobs or creates them, whether oil hits $40 or $140, whether rates rise or fall. <b>I don&apos;t see that often.</b></p>
              </li>
              <li>
                <h3>If it works, it could be big.</h3>
                <p>Most deals I see are built to do fine – often the kind of mid-teens (or lower) outcomes people quote as &quot;good.&quot; In my opinion, if this team executes, the upside could be far larger than those ordinary deals – and early-stage deals can also go to zero.<a className="fn" href="#cn-2">2</a> The product hasn&apos;t been revealed yet – it&apos;s still in stealth – so any upside, if it materializes at all, is <b>still speculative and unproven.</b></p>
              </li>
              <li>
                <h3>Open to you, and it shouldn&apos;t be.</h3>
                <p>In my experience, VCs chase opportunities like this, and VCs are easy: one check, one board seat, done. Founders who can raise from VCs typically do, and few go to the trouble of also opening the round to individual investors. These founders did – and set the <b>minimum at $10,000.</b></p>
              </li>
            </ol>
            <div className="sig-block backing">
              <div className="sig-k">Why I find this credible</div>
              <ul className="cred">
                <li>
                  <b>A growth engine that works.</b>
                  <div className="stats">
                    <div className="stat">
                      <div className="n">10,000+</div>
                      <div className="l">Pre-Product Users acquired<a className="fn" href="#cn-3">3</a></div>
                    </div>
                    <div className="stat">
                      <div className="n">$0.05</div>
                      <div className="l">to acquire a Pre-Product User<a className="fn" href="#cn-4">4</a></div>
                    </div>
                  </div>
                  <div className="bench">For comparison, the average company pays about $28 per lead from a Facebook ad and about $70 from a Google ad.<a className="fn" href="#cn-5">5</a></div>
                  <p style={{ margin: "8px 0 0", fontSize: "inherit", lineHeight: "inherit", color: "inherit" }}>As a marketer, the second number matters more to me than the first. It tells me that the team has found a way to reach interested people, and believes it can run the same play again once the product is revealed, at whatever it costs then, whether today&apos;s list converts or not.</p>
                </li>
                <li><b>A founder who builds.</b> Technical founder and serial entrepreneur. Built at four VC-backed startups, including a $1B+ unicorn. President of a company that was later acquired.</li>
                <li><b>A team that&apos;s done it before.</b> 21 people working together for months, mostly for equity, led by operators with 3 exits and an IPO between them.<a className="fn" href="#cn-6">6</a></li>
                <li><b>A professional investor is already in.</b> A hedge fund manager.</li>
              </ul>
            </div>
            <div className="sig-block clocks-mini">
              <div className="sig-k">Why there&apos;s urgency</div>
              <div className="cm"><b>The price steps up as money comes in.</b> Per the company&apos;s planned terms, the round is expected to be sold in stages, each costing more than the last. Here, &quot;price&quot; means the valuation cap on a SAFE. The longer you wait, the higher the cap, and the fewer shares the same check converts into.<a className="fn" href="#cn-7">7</a> <div className="ladder" aria-hidden="true"><i style={{ height: "32%" }}></i><i style={{ height: "43%" }}></i><i style={{ height: "58%" }}></i><i style={{ height: "77%" }}></i><i style={{ height: "100%" }}></i></div></div>
              <div className="cm"><b>The minimum steps up.</b> Per the company&apos;s planned terms, the $10,000 minimum is expected to rise as the round goes on.<a className="fn" href="#cn-7">7</a></div>
              <div className="cm"><b>Early and bigger checks may get more.</b> Under the company&apos;s planned terms, moving first or writing larger may come with better terms.<a className="fn" href="#cn-8">8</a></div>
            </div>
            <div className="card-cta">
              <ApplyLink className="btn btn-primary">{CTA.button}</ApplyLink>
              <b>The current minimum is $10,000 (subject to change). Only invest what you can afford to lose.</b>
            </div>
            <ol className="card-notes" start={2}>
              <li id="cn-2">Speaker&apos;s opinion. &quot;Mid-teens&quot; describes outcomes other deals commonly quote and isn&apos;t a projection for this one. Early-stage investments can lose everything.</li>
              <li id="cn-3">People who interacted with the company and asked to hear more, as of the week of Sep 29, 2026. Few, if any, have seen the product, and they aren&apos;t paying customers.</li>
              <li id="cn-4">Best campaign to date, not the average; other campaigns cost more. Results after launch may differ materially, and costs could be significantly higher.</li>
              <li id="cn-5">All-industry averages from WordStream by LocaliQ&apos;s 2025 benchmarks. Their &quot;lead&quot; is defined differently from a Pre-Product User, so the comparison is approximate.</li>
              <li id="cn-6">Contributors as of Nov 1, 2026; they&apos;ve been paid mostly in equity, and some are also investors in this round. Prior exits and the IPO were at other companies and don&apos;t predict results here.</li>
              <li id="cn-7">Planned terms; the company may change caps, stages, the minimum or the structure before closing. A valuation cap is an offering term, not a valuation, and a lower cap isn&apos;t a gain. Final terms are in the offering documents.</li>
              <li id="cn-8">Each SAFE is negotiated separately; better terms for earlier or larger checks are not guaranteed. Terms for individual investors, including those already in the round, may differ.</li>
            </ol>
          </ShortVersion>
        </div>
      </section>
      {/* SLOW LANE: the rant */}
      <section className="block">
        <div className="wrap narrow">
          <div className="kicker sec-kicker">
            <span>Why I&apos;m passing on almost everything else</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Every pitch I get seems to be a bet on the news.</h2>
          <div className="prose">
            <p>I&apos;m not a doomer. Things could boom from here, or they could stall, and I can&apos;t call which. The problem is that most of what crosses my desk only works if it breaks one way. So here&apos;s what I&apos;m leaving on the table.</p>
          </div>
        </div>
        <div className="wrap narrow">
          <div className="takes">
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>Public stocks</h3>
              <p>To me, the index is a handful of giant companies, priced like a lot goes right. Maybe it keeps climbing. Maybe one stumble drags it all down. Either way, I&apos;m betting on earnings calls and the Fed.</p>
            </div>
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>LLMs</h3>
              <p>The big players keep funding each other: the chip maker invests in the model company, which buys its chips. To me, it feels like a bubble. It could pop or run for years. I can&apos;t call it.</p>
            </div>
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>SaaS</h3>
              <p>Software sold by the seat was Wall Street&apos;s darling. To me, AI agents now do the work those seats paid for, and anyone can build the rest with a prompt.</p>
            </div>
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>Bonds and cash</h3>
              <p>Both bet my dollars will still buy something later. If AI takes jobs, I&apos;d expect the government to borrow and print to cover it. Even at 4%, after a 35% bracket and 3% inflation, I&apos;m losing ground.</p>
            </div>
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>Real estate</h3>
              <p>If AI takes enough jobs, incomes come down. Then rents come down, vacancies go up, and fewer people can afford to buy. Real estate looks solid until the people paying for it can&apos;t.</p>
            </div>
            <div className="take">
              <span className="verdict">Not for me</span>
              <h3>Commodities</h3>
              <p>Futures are bets on whatever comes next: a war or a peace deal, a cartel meeting, a drought, an electric-car mandate. One headline and the price flips, and the pros on the other side of the trade usually see it before I do.</p>
            </div>
          </div>
          <p className="takes-note">These are Max&apos;s opinions on where he isn&apos;t looking for his next investment, not a description of what he currently owns.</p>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow prose">
          <aside className="rail-note rail-quote chain-q" aria-hidden="true">&quot;When the chain breaks anywhere, it&apos;s felt everywhere.&quot;<small>Why the safe stuff isn&apos;t safe</small></aside>
          <div className="kicker sec-kicker">
            <span>Even the safe stuff sucks</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Ordinary businesses ride the news too.</h2>
          <p>Take plumbers. Most people think plumbers are a safe bet. AI can&apos;t fix a leak, and people will always need pipes. But are they really safe?</p>
          <p>In a downturn, homeowners lose jobs. They put off the remodel and live with the drip. Plumbers with no calls stop buying pipe. Suppliers with no orders lay people off, and those people stop calling plumbers. The slowdown feeds itself.</p>
          <p>I&apos;d argue almost every business in the world sits in a chain like that: the bakery, the dentist, the car dealer, the factory down the road. Each one depends on customers who depend on someone else. <strong>When the chain breaks anywhere, it&apos;s felt everywhere.</strong></p>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow">
          <div className="thesis">
            <div className="kicker sec-kicker">
              <span>What I&apos;m looking for</span>
              <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
            </div>
            <h2>So what&apos;s left?</h2>
            <p>A very specific thesis. I&apos;m looking for a deal that does two things at once:</p>
            <ol>
              <li><b>It holds up regardless of what the economy does</b>, or at least better than most.</li>
              <li><b>It could pay off in a big way if it works.</b></li>
            </ol>
            <p>Most deals give me one or the other, at best. Finding both is a tall order.</p>
            <p>
              <strong>But those deals exist.</strong>
            </p>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow prose">
          <aside className="rail-note rail-quote" aria-hidden="true">&quot;It&apos;s like starting two businesses at once.&quot;<small>Why founders take the fund</small></aside>
          <div className="kicker sec-kicker">
            <span>The part that makes me angry</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Great deals usually skip regular people.</h2>
          <p>It&apos;s not a conspiracy. It&apos;s just how the system works, and I&apos;ve been part of that system for years.</p>
          <p><strong>Small checks cost founders a second business.</strong> One fund writing $2 million is one meeting and one signature. Two hundred people writing $10,000 each means finding those two hundred people first. That takes sales and marketing: ads, landing pages, calls, follow-ups, lawyers, compliance, and someone to answer every question. It&apos;s like starting two businesses at once, one to launch the product and another to reach investors. That&apos;s a lot of time, cost and effort, so many founders take the fund.</p>
          <p><strong>The insiders go first.</strong> Funds that got in early usually have the right to buy into the next round before anyone else. When a company is doing well, those rights can fill the round before an outside seat ever opens.</p>
          <p><strong>What reaches regular investors is often what nobody else wants.</strong> Your cousin&apos;s food truck. Your neighbor&apos;s crypto app. A friend of a friend&apos;s &quot;Uber for dog walking.&quot; Nothing against anyone&apos;s dream, but a lot of the private deals that get offered widely are ones the professionals already looked at and passed on. And companies stay private longer than they used to. I believe that means more of the growth happens before the public can buy a share.</p>
          <p>So when a deal breaks that pattern, I notice.</p>
        </div>
      </section>
      <section className="block" id="three-ways">
        <div className="wrap narrow">
          <div className="kicker sec-kicker">
            <span>Why this one made me stop</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>3 things I&apos;ve never seen together in one deal.</h2>
          <div className="reasons">
            <div className="reason-row">
              <div className="reason">
                <div>
                  <h3>This isn&apos;t a bet on the headlines.</h3>
                  <p>It&apos;s a business built around a behavior that I believe holds up in good times and bad – even downturns and crises. Whether AI kills jobs or creates them, whether oil hits $40 or $140, whether rates rise or fall. <strong>I don&apos;t see that often.</strong></p>
                </div>
              </div>
              <aside className="reason-more rail-quote">&quot;I don&apos;t feel like I have to predict which way the wind blows. I&apos;m judging a team and a product.&quot;<small>What I&apos;m actually betting on</small></aside>
            </div>
            <div className="reason-row">
              <div className="reason">
                <div>
                  <h3>If it works, it could be big.</h3>
                  <p>Most deals I see are built to do fine – often the kind of mid-teens (or lower) outcomes people quote as &quot;good.&quot; In my opinion, if this team executes, the upside could be far larger than those ordinary deals – and early-stage deals can also go to zero.<a className="fn" href="#fn-irr">9</a> The product hasn&apos;t been revealed yet – it&apos;s still in stealth – so any upside, if it materializes at all, is <strong>still speculative and unproven.</strong></p>
                </div>
              </div>
              <aside className="reason-more rail-quote">&quot;If this team executes, the upside could be far larger than those ordinary deals – and early-stage deals can also go to zero.&quot;<small>Why it matters</small></aside>
            </div>
            <div className="reason-row">
              <div className="reason">
                <div>
                  <h3>Open to you, and it shouldn&apos;t be.</h3>
                  <p>In my experience, VCs chase opportunities like this, and VCs are easy: one check, one board seat, done. Founders who can raise from VCs typically do, and few go to the trouble of also opening the round to individual investors. These founders did – and set the <strong>minimum at $10,000.</strong></p>
                </div>
              </div>
              <aside className="reason-more rail-quote">&quot;There&apos;s a structural reason they opened this round to regular investors. You&apos;ll get it the moment you see it.&quot;<small>Why it&apos;s open</small></aside>
            </div>
          </div>
        </div>
      </section>
      {/* DEEP DIVE for the analysts: the specific claims, each with its own fine print */}
      <section className="block" id="proof">
        <div className="wrap">
          <div className="kicker sec-kicker">
            <span>Why I find this credible</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>The engine and the people behind this deal.</h2>
          <div className="proof-row">
            <div className="proof-main">
              <div className="prose backing-prose">
                <p><strong>A growth engine that works.</strong> More than 10,000 Pre-Product Users<a className="fn" href="#fn-users">10</a> at as little as $0.05 each,<a className="fn" href="#fn-cac">11</a> before anyone has seen the product. For comparison, the average company pays about $28 per lead from a Facebook ad and about $70 from a Google ad.<a className="fn" href="#fn-bench">12</a> As a marketer, the cost matters more to me than the count. It tells me the team has found a way to reach interested people for almost nothing so far. The team believes it can run the same play again once the product is revealed, whether or not today&apos;s list ever converts, though costs after launch could be much higher.</p>
                <p><strong>A founder who builds.</strong> He&apos;s a technical founder and serial entrepreneur. He&apos;s built at four VC-backed startups, including one that became a $1B+ unicorn, and was president of a company that was later acquired. He&apos;s not a pitch guy hiring someone to build his idea.</p>
                <p><strong>A team that&apos;s done it before.</strong> 21 people have been building this together for months, mostly for equity, led by operators who&apos;ve sold companies, taken one public, and run marketing for a firm managing over a trillion dollars. This may be pre-launch, but it isn&apos;t pre-seed. It&apos;s not two guys in a garage. The sophistication here is what I usually associate with companies that have raised $20 million or more and operated for years. I believe that&apos;s only possible because this founder has done this before. This isn&apos;t his first rodeo.</p>
                <p><strong>A professional investor is already in.</strong> The first professional investor in the round is a hedge fund manager. That doesn&apos;t decide anything for me, but I notice when someone who invests for a living goes first.</p>
              </div>
              <h3 id="people" style={{ fontSize: "24px", marginTop: "40px" }}>The operators <sup className="fn" style={{ fontSize: "12px" }}>13</sup></h3>
              <div className="people">
                <Person name="Jay" role="Founder &amp; CEO/CTO" photo="/operators/jay.jpg" linkedin="https://www.linkedin.com/in/j-d-crouch/">Technical architecture at The Honest Company, which later reached a $1B+ valuation. President of a company that was later acquired. Built at four venture-backed companies.</Person>
                <Person name="Steven" role="President" photo="/operators/steven.jpg" linkedin="https://www.linkedin.com/in/stevenswanson/">Co-founded a company that went public. An earlier venture&apos;s technology was acquired by Google. Helped grow a visual effects studio from 20 to 200+ people across 100+ films.</Person>
                <Person name="Meghan" role="Fractional CMO" photo="/operators/meghan.jpg" linkedin="https://www.linkedin.com/in/meghanrichter/">Led marketing at a firm as it grew from $550B to $1T+ in assets under management. Co-founded a fintech agency that exited.</Person>
                <Person name="John" role="Chief Legal Officer" photo="/operators/john.jpg" linkedin="https://www.linkedin.com/in/john-h-35331531/">Former Davis Polk and Norton Rose lawyer. Built an RIA to $1B+ in assets and 100K+ accounts.</Person>
              </div>
            </div>
            <aside className="proof-rail">
              <div className="proof">
                <div className="num">10,000+</div>
                <h3>Pre-Product Users <sup>10</sup></h3>
                <p>Acquired before the product has been shown to them. The company believes they&apos;re real people because each one verified receipt of its follow-up.</p>
              </div>
              <div className="proof">
                <div className="num">$0.05</div>
                <h3>Cost per Pre-Product User <sup>11</sup></h3>
                <p>Less than a typical ad click, while the average company pays about $28 per lead on Facebook and $70 on Google.<sup>12</sup> To me, it shows the team knows how to reach interested people efficiently. It&apos;s not a promise of what launch will cost.</p>
              </div>
              <div className="proof">
                <div className="num">21</div>
                <h3>People on the team <sup>13</sup></h3>
                <p>Pre-launch, but not pre-seed. The kind of organization I usually associate with companies that have raised $20 million or more and operated for years, built mostly on equity.</p>
              </div>
              <ol className="card-notes">
                <li value={10} id="fn-users">As of the week of Sep 29, 2026. People who have interacted with the company and indicated interest in continuing that interaction. Broad by design, so as not to reveal the playbook. Few, if any, have seen the product or been offered a chance to use it, and not all will. Full definition in the PPM.</li>
                <li value={11} id="fn-cac">$0.05 is the best campaign to date, not the average; other campaigns cost more. Results after launch may differ materially: acquisition costs could be significantly higher, and the team may not be able to repeat these results at all.</li>
                <li value={12}>All-industry averages from WordStream by LocaliQ&apos;s 2025 benchmarks. Their &quot;lead&quot; is defined differently from a Pre-Product User, so the comparison is approximate.</li>
                <li value={13} id="fn-team">Committed contributors as of Nov 1, 2026. Contributors have been paid mostly in equity, and some are also investors in this round. The comparison is the speaker&apos;s opinion.</li>
              </ol>
            </aside>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow prose">
          <div className="kicker sec-kicker">
            <span>What isn&apos;t on this page</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>No name, no product. On purpose.</h2>
          <p>There&apos;s no patent here. There&apos;s a head start, and my sense is the lead is widening. The team believes publishing the details is the one thing that would help someone catch up, so the specifics stay behind an NDA. Even &quot;ListLab&quot; is just a working name for the product.</p>
          <p>Once you sign, you see everything: the product, the full presentation, and the offering documents.</p>
        </div>
      </section>
      <section className="block">
        <div className="wrap">
          <aside className="rail-note rail-ladder">
            <div className="ladder">
              <i style={{ height: "32%" }}></i>
              <i style={{ height: "43%" }}></i>
              <i style={{ height: "58%" }}></i>
              <i style={{ height: "77%" }}></i>
              <i style={{ height: "100%" }}></i>
            </div>
            <p>Each stage of the round is expected to cost more than the last.</p>
            <div className="rail-quote early-q">&quot;Early and bigger checks may get more.&quot;<small>Under the company&apos;s planned terms, moving first or writing larger may come with better terms.<a className="fn" href="#fn-safe">15</a></small></div>
          </aside>
          <div className="kicker sec-kicker">
            <span>Why there&apos;s urgency</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Two clocks are already running.</h2>
          <div className="clocks">
            <div className="clock">
              <div className="kicker">First clock</div>
              <h3>The price steps up.</h3>
              <p>Per the company&apos;s planned terms, the round is expected to be sold in stages, each costing more than the last. The same check buys less the later it comes in.</p>
              <p>For the technical version: the round uses SAFEs, and &quot;price&quot; means the valuation cap. The longer you wait, the higher the cap, and the fewer shares the same money converts into.<a className="fn" href="#fn-terms">14</a></p>
            </div>
            <div className="clock">
              <div className="kicker">Second clock</div>
              <h3>The minimum steps up.</h3>
              <p>Per the company&apos;s planned terms, the $10,000 minimum is expected to rise as the round goes on.<a className="fn" href="#fn-terms">14</a></p>
              <p>And once the product is public, the company plans to raise from VCs and strategic partners. From what I&apos;ve seen, that&apos;s when deals like this stop being open to regular investors.</p>
            </div>
          </div>
          <div className="rail-quote early-q early-m">&quot;Early and bigger checks may get more.&quot;<small>Under the company&apos;s planned terms, moving first or writing larger may come with better terms.<a className="fn" href="#fn-safe">15</a></small></div>
        </div>
      </section>
      <section className="block">
        <div className="wrap narrow">
          <div className="kicker sec-kicker">
            <span>Questions you&apos;re probably asking</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Fair questions.</h2>
          <div className="faq">
            <details>
              <summary>You&apos;re paid. Why should I listen to you?</summary>
              <p>Don&apos;t take my word for it. The company pays me for marketing work, not for what it raises. But I also invested my own money, so I have a financial stake – and a conflict of interest – alongside the paid marketing relationship. I win or lose with other investors if the company succeeds or fails. What I can give you is the honest reason I put money in. You should make your own decision after seeing it.</p>
            </details>
            <details>
              <summary>&quot;Pre-launch&quot; sounds like an experiment.</summary>
              <p>Usually it is. Most early companies raise to find out whether anyone wants the thing. This company has already found more than 10,000 interested people, at as little as $0.05 each, before showing them anything. But because it&apos;s in stealth, there&apos;s no data yet on whether people will actually adopt the product, only a thesis. I believe it&apos;s a good one. That&apos;s the trade: risk and reward are tied together. Applying now only gets you a chance to review materials after verification and an NDA. Earlier entry under the company&apos;s planned terms may involve a lower valuation cap – and earlier investors can still lose everything if the company fails.</p>
            </details>
            <details>
              <summary>Is this safe?</summary>
              <p>No early-stage investment is. But in my experience, almost nothing with a shot at a meaningful return is. What you get here is the full picture and two weeks to decide with it.</p>
            </details>
          </div>
        </div>
      </section>
      <section className="block" id="next">
        <div className="wrap">
          <div className="kicker sec-kicker">
            <span>What happens next</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Five steps. You decide at the end.</h2>
          <div className="next-row">
            <div className="next-main">
              <ol className="timeline">
                <li><span className="when">Today · 2 minutes</span><b>{CTA.step1.title}</b>{CTA.step1.body}</li>
                <li><span className="when">{CTA.step2When}</span><b>Screening call</b>A short call to answer your questions and make sure it&apos;s a fit.</li>
                <li><span className="when">After the call</span><b>Sign the NDA</b>If it&apos;s a fit, the company sends it over. Nothing is owed by signing.</li>
                <li><span className="when">Right after</span><b>See everything</b>The company&apos;s name, the product, the full presentation and the offering documents.</li>
                <li><span className="when">The next two weeks</span><b>Decide</b>Read it all, ask your questions, talk to your own advisors. Invest or pass.</li>
              </ol>
              <div className="apply-card">
                <h3>{CTA.button}</h3>
                <p>Raising your hand isn&apos;t investing. You don&apos;t even know the company&apos;s name yet. If it&apos;s not a fit, you pass.</p>
                <ApplyLink className="btn btn-primary">{CTA.start}</ApplyLink>
              </div>
            </div>
            <div className="qualify in-rail" id="qualify">
              <h3>Not sure you qualify?</h3>
              <p>By law, this round is open only to what&apos;s called an <b>accredited investor</b>. In plain English, that usually means one of these is true:</p>
              <ul>
                <li>You&apos;ve earned over <b>$200,000 a year</b> for the last two years ($300,000 with a spouse or partner) and expect the same this year.</li>
                <li>You&apos;re worth over <b>$1 million</b>, not counting your home, on your own or with a spouse or partner.</li>
                <li>You hold a <b>Series 7, 65 or 82</b> license.</li>
              </ul>
              <p>If one of those fits, you likely qualify. If you&apos;re not sure, {CTA.notSure} If you move forward, the company will verify it, as the law requires.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="block closing">
        <div className="wrap narrow prose">
          <div className="kicker sec-kicker">
            <span>The bottom line</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Same uncertainty. Different question.</h2>
          <p>Nobody can tell you what happens next: not me, not the Fed, not anyone pitching you. But with this deal, I don&apos;t feel like I have to read the tea leaves. The question I care about most is whether this team can deliver, and I think they can. Look at the evidence and decide for yourself.</p>
          <p>
            <strong>I&apos;d rather people look and pass than hear about it after the cap has moved.</strong>
          </p>
          <div className="cta-row" style={{ marginTop: "22px" }}>
            <ApplyLink className="btn btn-primary">{CTA.button}</ApplyLink>
          </div>
        </div>
      </section>
      {/* GENERIC DISCLOSURES: all at the bottom */}
      <section className="block" id="risks">
        <div className="wrap narrow">
          <div className="kicker sec-kicker">
            <span>Before you apply</span>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <h2>Who this isn&apos;t for.</h2>
          <div className="prose">
            <p className="not-for">
              <strong>If $10,000 feels like a lot of money to you, don&apos;t apply.</strong>
            </p>
            <p>This is for someone who can write a check of $10,000 or more and not lose sleep over it. Someone looking for something that could hold up whichever way the economy turns. Someone tired of being offered whatever&apos;s left after the insiders pass. Someone hoping for a shot at a really big return.</p>
            <p>Here&apos;s what comes with a round like this:</p>
          </div>
          <ul className="risk-list">
            <li><b>You could lose all of it.</b> Most startups fail, and this one hasn&apos;t launched or made money yet. Pre-Product Users aren&apos;t paying customers.</li>
            <li><b>Getting it back out is hard.</b> There&apos;s no public market, and transfers are restricted. Some private shares do trade on secondary markets, but there may be no buyer, a sale usually needs the company&apos;s OK, and it often comes at a discount. Plan to hold for years, maybe many.</li>
            <li><b>You won&apos;t have a say.</b> The founders keep voting control.</li>
            <li><b>Your share can shrink.</b> Future rounds may dilute you.</li>
            <li><b>And more.</b> These are the big ones, not all of them. The full list of risks is in the private placement memorandum (PPM), and you&apos;ll get it before you decide anything.</li>
          </ul>
        </div>
      </section>
      <footer className="legal" id="disclosures">
        <div className="wrap narrow">
          <div className="sec-kicker legal-head">
            <h2>Important information</h2>
            <a className="to-top" href="#top">Top <span aria-hidden="true">↑</span></a>
          </div>
          <p>This page is a general solicitation by the company that acquired the ListLab technology and related intellectual property, including the ListLab brand (the &quot;Company&quot;), which will be identified in the Offering Documents. &quot;ListLab&quot; refers to the product and brand acquired by the Company; the Company is not ListLab, Inc. This page relates to the Company&apos;s private offering of SAFEs (the &quot;Securities&quot;) under Rule 506(c) of Regulation D. The Securities will be sold only to accredited investors, as defined in Rule 501(a).</p>
          <p>This page is not an offer to sell, or a solicitation of an offer to buy, any security in any jurisdiction where that would be unlawful. Offers will be made only through the Company&apos;s confidential offering documents, including its private placement memorandum and subscription agreement (the &quot;Offering Documents&quot;), which qualify this page in its entirety. If anything here conflicts with the Offering Documents, the Offering Documents control.</p>
          <p>The Securities have not been registered under the Securities Act of 1933 or any state securities law.</p>
          <p>Statements about the Company&apos;s demand, growth, markets, pricing or prospects are forward-looking. They reflect management&apos;s current beliefs and are subject to risks that could cause actual results to differ materially. No one can assure that demand for the Company&apos;s product will exist or continue under any economic condition. The Company undertakes no obligation to update them.</p>
          <p id="fee"><sup>1</sup> Max Mayes is paid by the Company for marketing services, including producing and appearing in the video on this page (a fixed fee of $500). Through November 13, 2026, the Company has paid him $12,500 in all. None of his compensation is based on the amount of capital raised. He has invested his own money in this offering, so he benefits if the Company does well. Because he is paid by the Company and has invested in this offering, he has a conflict of interest, and his views may be biased. Marketing relationships change; the scope of his role, his compensation and his investment may change, and any change will be disclosed. He does not negotiate or discuss offering terms with investors; descriptions of offering terms on this page are the Company&apos;s planned terms. Max provides marketing and endorsement services only. He is not a broker-dealer or finder, does not receive transaction-based compensation, does not handle investor funds or subscription agreements, and does not provide personalized investment advice. References to prior marketing results (including campaigns that have helped others raise $30M+) describe marketing work for other people&apos;s deals – not securities brokerage – and do not indicate results for this offering. Opinions on this page about markets and asset classes are his own. References to other persons or companies are for illustration only and do not imply affiliation or endorsement.</p>
          <p id="fn-irr"><sup>9</sup> Speaker&apos;s opinion. References to typical returns (such as mid-teens outcomes) describe other deals generally and are not a projection for this offering. Early-stage investments can lose their entire value.</p>
          <p id="fn-bench"><sup>12</sup> Benchmarks are all-industry averages from WordStream by LocaliQ&apos;s 2025 reports: about $27.66 per lead for Facebook lead campaigns and $70.11 per lead for Google Ads (U.S. campaigns, April 2024–March 2025). A Pre-Product User is defined differently from a &quot;lead&quot; in those reports, so the comparison is approximate. The Company&apos;s $0.05 is its best campaign to date, not an average, and costs after launch may be materially higher.</p>
          <p id="fn-terms"><sup>14</sup> Describes the Company&apos;s planned terms: SAFEs with valuation caps that step up by tranche as capital is raised. The Company may change the caps, tranche sizes, structure or minimum at any time before a closing. A valuation cap is an offering term, not a valuation, and a lower cap is not a gain. Final terms are set only in the Offering Documents.</p>
          <p id="fn-safe"><sup>15</sup> Each SAFE is negotiated separately; better terms for earlier or larger checks are not guaranteed. Terms for individual investors, including those already in the round, may differ.</p>
          <p>Rule 506(c) requires the Company to take reasonable steps to verify that each purchaser is an accredited investor, for example through a written confirmation from a registered broker-dealer, registered investment adviser, licensed attorney or certified public accountant.</p>
          <p>Nothing here is investment, legal or tax advice, and nothing here is a recommendation that any particular person invest. Max Mayes&apos;s statements are his personal opinions; he is not acting as an investment adviser or broker-dealer. Consult your own legal, tax and financial advisors before investing.</p>
          <p><b>Notice to residents of all states.</b> In making an investment decision, investors must rely on their own examination of the issuer and the terms of the offering, including the merits and risks involved. These securities have not been recommended by any federal or state securities commission or regulatory authority. Furthermore, the foregoing authorities have not confirmed the accuracy or determined the adequacy of this page. These securities are subject to restrictions on transferability and resale and may not be transferred or resold except as permitted under the Securities Act and applicable state securities laws, pursuant to registration or exemption therefrom. Investors should be aware that they will be required to bear the financial risks of this investment for an indefinite period of time. Additional state-specific notices, including any rescission rights available to residents of certain states, appear in the Offering Documents.</p>
          <p style={{ marginTop: "20px", color: "var(--ink-3)" }}>{site.privacyUrl ? <a href={site.privacyUrl}>Privacy</a> : "Privacy"} · {site.termsUrl ? <a href={site.termsUrl}>Terms</a> : "Terms"}</p>
        </div>
      </footer>
    </main>
  );
}
