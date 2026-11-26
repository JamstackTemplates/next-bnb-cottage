import type { Metadata } from 'next';
import { StitchedHem } from '../../components/art/dividers';
import { HoneysuckleVine } from '../../components/art/honeysuckle-vine';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Enquire',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Enquiries" title={business.enquiries.title}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left: Printed postcard "What to include" with climbing vine */}
          <aside
            aria-label="What to include in your enquiry"
            className="linocut-frame relative overflow-hidden rounded-ui p-6 sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-4 -top-4 opacity-80 no-print">
              <HoneysuckleVine className="h-44 w-24" />
            </div>
            <p className="kicker">Postcard note</p>
            <h2 className="mt-2 font-display text-3xl text-ink">What to include</h2>
            <p className="mt-2 max-w-[34ch] text-sm text-muted">
              Pop these details into your message so we can check the right room straight away:
            </p>
            <ul className="mt-5 space-y-2.5 border-y border-dashed border-line py-4 text-[0.97rem] text-ink">
              {business.enquiries.usefulToInclude.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-honeysuckle"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              No payment is taken on this website. Your room is only booked once we’ve confirmed in
              writing.
            </p>
          </aside>

          {/* Right: Hosted Jamstacks form or visible email fallback */}
          <section
            aria-label="Enquiry form"
            className="linocut-frame rounded-ui p-6 sm:p-8 lg:col-span-7"
          >
            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div>
                <p className="kicker">Write directly</p>
                <h2 className="mt-2 font-display text-3xl text-ink">Send us an email</h2>
                <p className="mt-3 text-muted">
                  The online enquiry form is not connected on this preview. Email us directly with
                  your dates and room preference and we’ll reply with availability and the price.
                </p>
                <p className="mt-5">
                  <a
                    className="button"
                    href={`mailto:${business.email}?subject=Enquiry%20about%20dates`}
                  >
                    Email {business.email}
                  </a>
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="my-12">
          <StitchedHem />
        </div>

        {/* Email, phone, phone-line badge, time-zone note, directions & map */}
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="kicker">Direct contact</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Email &amp; telephone</h2>
              <p className="mt-4">
                <a className="text-link text-lg wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
            </div>

            <div className="border-t border-line pt-5">
              <p className="text-lg text-ink">
                <a
                  className="text-link"
                  href={`tel:${business.phoneSchema.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              </p>
              <div className="mt-2.5">
                <OpenBadge hours={business.phoneHours} />
              </div>
              <TimeZoneNote />
            </div>

            <div className="border-t border-line pt-5">
              <h3 className="font-display text-2xl text-ink">Finding the cottage</h3>
              <address className="mt-2 not-italic text-sm text-ink">
                {business.address.formatted}
              </address>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {business.directionsSummary}
              </p>
              <p className="mt-2 text-xs text-muted">{business.times.closedNote}</p>
            </div>
          </div>

          <div className="rounded-ui border-4 border-stone bg-stone p-1.5 shadow-[4px_4px_0_var(--ink)] lg:col-span-7">
            <div className="border-2 border-ink bg-surface">
              <GoogleMap
                address={business.address.formatted}
                title="Map to Honeysuckle Cottage, The Street, Bibury"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
