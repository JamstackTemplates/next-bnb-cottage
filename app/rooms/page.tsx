import type { Metadata } from 'next';
import { StitchedHem } from '../../components/art/dividers';
import { LinocutIcon } from '../../components/art/icons';
import { PageHead } from '../../components/page-head';
import { RoomsExplorer } from '../../components/rooms-explorer';
import { business } from '../../content/business';
import { amenities, rooms } from '../../content/rooms';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Rooms',
  description:
    'Four individual rooms under one 17th-century Cotswold stone roof in Bibury, including a ground-floor dog-friendly Garden Room and a family Orchard Room.',
  alternates: { canonical: absoluteUrl('/rooms/') },
};

export default function RoomsPage() {
  return (
    <>
      <PageHead eyebrow="Stay with us" title="Four rooms under one stone roof">
        <p>
          Three upstairs rooms up our oak staircase and one step-free ground-floor room opening onto
          the cottage garden. Every nightly rate includes cooked breakfast for two.
        </p>
      </PageHead>

      <RoomsExplorer rooms={rooms} email={business.email} />

      {/* In every room amenities band */}
      <section className="linen-band border-y-2 border-ink py-12 sm:py-14">
        <div className="wrap">
          <p className="kicker">In every room &amp; around the cottage</p>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,3.4vw,2.4rem)] text-ink">
            Waiting for you on arrival
          </h2>
          <ul className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            {amenities.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2.5 rounded-ui border-2 border-ink bg-surface px-4 py-2.5 text-sm text-ink shadow-[2px_2px_0_var(--ink)]"
              >
                <LinocutIcon name={item.icon} className="h-5 w-5 text-primary-ink" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stitched prices note */}
      <section className="wrap py-10">
        <div className="stitched-border rounded-ui bg-surface px-6 py-5 text-center text-sm leading-relaxed text-muted">
          <p>
            Prices are per room per night for two including breakfast. Your dates are only held once
            we’ve replied in writing.
          </p>
        </div>
        <div className="mt-6">
          <StitchedHem />
        </div>
      </section>
    </>
  );
}
