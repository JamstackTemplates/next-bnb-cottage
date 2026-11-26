import type { Metadata } from 'next';
import { HenAndEggCup, SupplyFrieze } from '../../components/art/breakfast-art';
import { StitchedHem } from '../../components/art/dividers';
import { BreakfastMenuCard } from '../../components/breakfast-menu-card';
import { PageHead } from '../../components/page-head';
import { breakfastSections } from '../../content/breakfast';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Breakfast',
  description:
    'Cooked breakfasts in our garden room with eggs from our own hens, pastries from the Cirencester baker and dry-cured valley bacon.',
  alternates: { canonical: absoluteUrl('/breakfast/') },
};

export default function BreakfastPage() {
  return (
    <>
      <PageHead eyebrow="Morning table" title="Breakfast in the garden room">
        <p>
          Laid out by the French windows looking down the orchard. Take your time over a pot of tea
          while we cook your order on the stove.
        </p>
      </PageHead>

      {/* Serving times as two oversized IM Fell numeral blocks beside the hen */}
      <section className="wrap py-10 sm:py-12">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="grid gap-5 sm:grid-cols-2 md:col-span-8">
            <div className="border-l-4 border-primary pl-5">
              <p className="font-sc text-xs tracking-[0.14em] text-muted">MONDAY – FRIDAY</p>
              <p className="mt-1 font-display text-[clamp(2.2rem,4.5vw,3.1rem)] leading-none text-ink">
                {business.times.breakfastWeekday}
              </p>
            </div>
            <div className="border-l-4 border-honeysuckle pl-5">
              <p className="font-sc text-xs tracking-[0.14em] text-muted">SATURDAY &amp; SUNDAY</p>
              <p className="mt-1 font-display text-[clamp(2.2rem,4.5vw,3.1rem)] leading-none text-ink">
                {business.times.breakfastWeekend}
              </p>
            </div>
            <p className="sm:col-span-2 text-sm text-muted">
              Leave your ticked breakfast slip on the hall table before bed—and tell us if you have
              an early walk planned so we can have coffee waiting.
            </p>
          </div>
          <div className="flex flex-col items-center md:col-span-4">
            <HenAndEggCup className="h-32 w-40" />
            <p className="mt-1 font-hand text-2xl text-primary-ink">Fresh from the orchard</p>
          </div>
        </div>
      </section>

      {/* Centred printed MenuCard */}
      <div className="wrap pb-12">
        <BreakfastMenuCard sections={breakfastSections} />
      </div>

      {/* Pinned paper-slip allergen note */}
      <section className="wrap pb-14">
        <div className="relative mx-auto max-w-2xl rotate-[0.6deg] rounded-ui border-2 border-ink bg-linen-deep px-6 py-5 shadow-[3px_3px_0_var(--ink)]">
          <span
            aria-hidden="true"
            className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-honeysuckle"
          />
          <h2 className="font-sc text-sm tracking-[0.12em] text-primary-ink">
            Dietary needs &amp; allergies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            Tell us about allergies when you enquire and again on arrival. Our kitchen handles
            gluten, eggs, milk, nuts and sesame, so we cannot guarantee any dish is free of them.
          </p>
        </div>
      </section>

      <StitchedHem />

      {/* Where it comes from — three-step printed frieze */}
      <section className="linen-band py-14">
        <div className="wrap">
          <p className="kicker">Where it comes from</p>
          <h2 className="mt-2 font-display text-[clamp(1.85rem,3.6vw,2.6rem)] text-ink">
            Three short miles from gate to plate
          </h2>

          <div className="mt-8">
            <SupplyFrieze className="mx-auto max-w-4xl" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl text-ink">1. Our own hens</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Six speckled hens scratching under the orchard apple trees keep the egg basket full
                most mornings of the year.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-ink">2. The Cirencester baker</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Sourdough loaves, croissants and spiced buns baked overnight in the market town and
                dropped on our porch at dawn.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-ink">3. The valley farm shop</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Dry-cured bacon, pork sausages, thick yoghurt and orchard-pressed apple juice from
                neighbouring Gloucestershire farms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
