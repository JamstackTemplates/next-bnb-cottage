import type { Metadata } from 'next';
import { LocalGuideExplorer } from '../../components/local-guide-explorer';
import { PageHead } from '../../components/page-head';
import { guidePlaces } from '../../content/local-guide';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Local guide',
  description:
    'Hand-drawn Bibury walking map and our ten favourite walks, villages, gardens and rainy-day shelters along the River Coln and nearby Cotswolds.',
  alternates: { canonical: absoluteUrl('/local-guide/') },
};

export default function LocalGuidePage() {
  return (
    <>
      <PageHead eyebrow="Around Bibury" title="Out of the gate and along the Coln">
        <p>
          Our favourite walks straight from the cottage door, plus a few short drives through the
          valley. Every numbered pin on the map matches the gazetteer below.
        </p>
      </PageHead>

      <LocalGuideExplorer places={guidePlaces} />

      {/* Signpost-shaped seasonal note */}
      <section className="wrap pb-12">
        <div className="relative mx-auto max-w-2xl rounded-ui border-2 border-ink bg-surface px-7 py-5 shadow-[4px_4px_0_var(--ink)]">
          <p className="font-sc text-xs tracking-[0.14em] text-primary-ink">BEFORE YOU SET OFF</p>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-ink">
            Opening times change with the seasons, so check with each place before you set off.
            We’re happy to lend maps and wellies.
          </p>
        </div>
      </section>
    </>
  );
}
