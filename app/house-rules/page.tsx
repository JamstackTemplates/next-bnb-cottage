import type { Metadata } from 'next';
import { StitchedHem } from '../../components/art/dividers';
import {
  CrossStitchIcon,
  SamplerAlphabetBand,
  SamplerCottageMotif,
} from '../../components/art/sampler-art';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import {
  RULE_GROUPS,
  houseRuleNotes,
  houseRules,
  ruleGroupLabels,
} from '../../content/house-rules';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'House rules',
  description:
    'Check-in and check-out times, dogs, children, step-free access and how staying enquiries work at Honeysuckle Cottage B&B.',
  alternates: { canonical: absoluteUrl('/house-rules/') },
};

export default function HouseRulesPage() {
  return (
    <>
      <PageHead eyebrow="Good to know" title="A few gentle house rules">
        <p>
          We run a small 17th-century home with four guest rooms. Everything below is stitched up so
          every guest gets a peaceful stay and a good night’s sleep.
        </p>
      </PageHead>

      {/* Framed cross-stitch sampler */}
      <section className="stone-wall-band border-b-2 border-ink py-12 sm:py-16">
        <div className="wrap">
          <div className="mx-auto max-w-5xl rounded-ui border-[6px] border-ink bg-surface p-3 shadow-[6px_6px_0_rgba(43,42,51,0.2)] sm:p-5">
            <div className="stitched-border px-5 py-7 sm:px-9 sm:py-9">
              <SamplerAlphabetBand text="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" />

              <div className="my-5">
                <SamplerCottageMotif />
                <h2 className="mt-2 text-center font-display text-3xl text-ink">
                  Honeysuckle Cottage Sampler
                </h2>
              </div>

              <div className="mt-8 grid gap-9 md:grid-cols-3">
                {RULE_GROUPS.map((group) => {
                  const groupRules = houseRules.filter((rule) => rule.group === group);
                  return (
                    <div key={group}>
                      <h3 className="border-b-2 border-dashed border-line pb-2 font-sc text-lg tracking-[0.14em] text-primary-ink">
                        {ruleGroupLabels[group]}
                      </h3>
                      <ul className="mt-4 space-y-5">
                        {groupRules.map((rule) => (
                          <li key={rule.id} className="flex items-start gap-3">
                            <CrossStitchIcon motif={rule.stitch} className="mt-0.5 h-6 w-6 shrink-0" />
                            <div>
                              <p className="font-display text-lg leading-snug text-ink">
                                {rule.title}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-muted">
                                {rule.detail}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div className="mt-9">
                <SamplerAlphabetBand text="1 2 3 4 5 6 7 8 9 0 · BIBURY · GLOUCESTERSHIRE" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plain two-column notes: children, dogs, accessibility */}
      <section className="wrap py-14">
        <p className="kicker">Practical notes</p>
        <h2 className="mt-2 font-display text-[clamp(1.85rem,3.6vw,2.5rem)] text-ink">
          Children, dogs &amp; accessibility
        </h2>
        <div className="mt-7 grid gap-8 md:grid-cols-2">
          {houseRuleNotes.map((note) => (
            <div key={note.id} className="border-t-2 border-line pt-4">
              <h3 className="font-display text-2xl text-ink">{note.heading}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{note.body}</p>
            </div>
          ))}
        </div>
      </section>

      <StitchedHem />

      {/* How enquiries work — three-step footpath line */}
      <section className="linen-band py-14">
        <div className="wrap">
          <p className="kicker">How enquiries work</p>
          <h2 className="mt-2 font-display text-[clamp(1.85rem,3.6vw,2.6rem)] text-ink">
            Simple, personal and confirmed in writing
          </h2>

          <ol className="relative mt-9 grid gap-8 md:grid-cols-3">
            <li className="linocut-frame rounded-ui p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-primary font-sc text-sm text-white">
                1
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink">Send an enquiry</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tell us your preferred dates, room and who is coming using our enquiry page or by
                email.
              </p>
            </li>
            <li className="linocut-frame rounded-ui p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-honeysuckle font-sc text-sm text-white">
                2
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink">We reply by email</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Ellen or Tom writes back with availability, the exact nightly price and answers to
                any questions.
              </p>
            </li>
            <li className="linocut-frame rounded-ui p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-butter font-sc text-sm text-ink">
                3
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink">Confirmed in writing</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Your room is only booked once we’ve confirmed in writing. No payment is taken on
                this website.
              </p>
            </li>
          </ol>

          <div className="mt-9">
            <SiteLink href="/contact/" className="button">
              Enquire about dates
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
