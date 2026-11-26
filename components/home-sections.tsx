import type { ReactNode } from 'react';
import type { BreakfastItem } from '../content/breakfast';
import type { Business } from '../content/business';
import type { GuidePlace } from '../content/local-guide';
import { formatPlaceDistance, guideCategoryLabels } from '../content/local-guide';
import type { Room } from '../content/rooms';
import { HenAndEggCup, MenuCardVignette } from './art/breakfast-art';
import { CottageHero } from './art/cottage-hero';
import { HedgeRow, StitchedHem } from './art/dividers';
import { HoneysuckleVine } from './art/honeysuckle-vine';
import { LinocutIcon } from './art/icons';
import { RoomWindow } from './art/room-window';
import { WalkingMap } from './art/walking-map';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* --------------------------------------------------------------------------
   1. Home Hero — asymmetric 5/12 + 7/12 split on desktop; cropped cottage band
      above heading & CTA at 390px so wordmark, door+honeysuckle and button
      all fit above the fold.
   -------------------------------------------------------------------------- */
function HeroRoot({ children }: ChildrenProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-4 sm:pt-8 lg:pb-16 lg:pt-10">
      <div className="wrap grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Mobile cottage illustration above heading & CTA */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-lg">
            <CottageHero className="w-full" />
          </div>
        </div>

        {/* Left 5/12 copy column */}
        <div className="relative z-10 lg:col-span-5">
          <div className="pointer-events-none absolute -left-24 -top-10 hidden opacity-85 2xl:block no-print">
            <HoneysuckleVine className="h-44 w-24" flip />
          </div>
          {children}
        </div>

        {/* Right 7/12 CottageHero bleeding gently past the right edge on desktop */}
        <div className="hidden lg:col-span-7 lg:block">
          <div className="-mr-8 xl:-mr-16">
            <CottageHero className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroKicker({ children }: ChildrenProps) {
  return <p className="kicker">{children}</p>;
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="mt-2 font-display text-[clamp(2.15rem,4.6vw,3.7rem)] leading-[1.05] text-ink">
      {children}
    </h1>
  );
}

function HeroIntro({ children }: ChildrenProps) {
  return <p className="mt-4 max-w-[36ch] text-[1.05rem] leading-relaxed text-muted">{children}</p>;
}

function HeroActions({ children }: ChildrenProps) {
  return <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>;
}

function HeroPrimaryCta({ children }: ChildrenProps) {
  return (
    <SiteLink href="/contact/" className="button">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryCta({ children }: ChildrenProps) {
  return (
    <SiteLink href="/rooms/" className="button button-quiet">
      {children}
    </SiteLink>
  );
}

function HeroTimesLine({ children }: ChildrenProps) {
  return (
    <p className="mt-5 font-sc text-[0.9rem] tracking-[0.06em] text-muted">{children}</p>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  Kicker: HeroKicker,
  Heading: HeroHeading,
  Intro: HeroIntro,
  Actions: HeroActions,
  PrimaryCta: HeroPrimaryCta,
  SecondaryCta: HeroSecondaryCta,
  TimesLine: HeroTimesLine,
});

/* --------------------------------------------------------------------------
   2. Rooms at a glance — full-bleed Cotswold stone wall façade with 4 painted
      RoomWindow vignettes at staggered sill heights (2x2 on 390px).
   -------------------------------------------------------------------------- */
const SILL_OFFSETS = ['lg:mt-0', 'lg:mt-8', 'lg:mt-2', 'lg:mt-10'] as const;

export function RoomsFacade({
  kicker,
  heading,
  intro,
  rooms,
}: {
  kicker: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  rooms: readonly Room[];
}) {
  return (
    <section className="stone-wall-band reveal-section border-y-2 border-ink py-14 sm:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">{kicker}</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          </div>
          <p className="max-w-md text-sm text-ink/85">{intro}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-7">
          {rooms.map((room, index) => (
            <SiteLink
              key={room.id}
              href={`/rooms/#${room.id}`}
              className={`casement-trigger group block text-center no-underline hover:no-underline ${SILL_OFFSETS[index % SILL_OFFSETS.length]}`}
            >
              <RoomWindow roomId={room.id} className="mx-auto w-full max-w-[15rem]" />
              <span className="mt-4 block font-display text-[1.3rem] leading-tight text-ink group-hover:underline decoration-honeysuckle decoration-2">
                {room.name}
              </span>
              <span className="mt-1 block font-sc text-[0.86rem] tracking-[0.06em] text-ink/80">
                Sleeps {room.sleeps} · from £{room.pricePerNightGBP}/night
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   3. Breakfast teaser — linen band, highlights on left, propped -3° MenuCard
      and overlapping HenAndEggCup on right.
   -------------------------------------------------------------------------- */
export function BreakfastTeaser({
  kicker,
  heading,
  intro,
  linkLabel,
  highlights,
}: {
  kicker: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  linkLabel: ReactNode;
  highlights: readonly BreakfastItem[];
}) {
  return (
    <section className="reveal-section py-16 sm:py-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="kicker">{kicker}</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          <p className="mt-4 max-w-[44ch] text-muted">{intro}</p>

          <ul className="mt-6 space-y-3 border-y border-line py-5">
            {highlights.map((item) => (
              <li key={item.id} className="leader-row text-[0.98rem]">
                <span className="font-display text-[1.18rem] text-ink">{item.name}</span>
                <span className="leader-dots" aria-hidden="true" />
                <span className="font-sc text-[0.86rem] text-primary-ink">
                  {item.supplementGBP > 0 ? `+£${item.supplementGBP}` : 'Included'}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <SiteLink href="/breakfast/" className="button button-quiet">
              {linkLabel}
            </SiteLink>
          </div>
        </div>

        {/* Propped MenuCard at -3° with overlapping HenAndEggCup */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-6">
          <div className="linocut-frame relative rounded-ui p-6 sm:p-8 lg:-rotate-2">
            <div className="stitched-border p-4 sm:p-5">
              <MenuCardVignette className="mx-auto h-14 w-40" />
              <p className="mt-2 text-center font-sc text-xs tracking-[0.16em] text-muted">
                MORNING TABLE · BIBURY
              </p>
              <p className="mt-1 text-center font-display text-2xl text-ink">
                Garden Room Breakfast
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {highlights.map((item) => (
                  <li key={item.id} className="border-b border-dotted border-line pb-1.5">
                    <span className="font-medium text-ink">{item.name}</span>
                    <span className="block text-xs">{item.description}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center font-hand text-xl text-primary-ink">
                Tick your order before bed
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-4 w-36 sm:-right-8 sm:w-44 no-print">
            <HenAndEggCup className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. Hosts' note — narrow centred folded-letter sheet with Cedarville signature
      and HedgeRow divider beneath.
   -------------------------------------------------------------------------- */
export function HostsNote({
  kicker,
  heading,
  signature,
  children,
}: {
  kicker: ReactNode;
  heading: ReactNode;
  signature: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="linen-band reveal-section py-14 sm:py-18">
      <div className="wrap">
        <div className="linocut-frame relative mx-auto max-w-2xl rounded-ui px-7 py-9 sm:px-12 sm:py-11">
          <p className="kicker text-center">{kicker}</p>
          <h2 className="mt-2 text-center font-display text-[clamp(1.75rem,3.4vw,2.4rem)] text-ink">
            {heading}
          </h2>
          <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-muted">
            {children}
          </div>
          <p className="mt-6 font-hand text-3xl text-primary-ink">{signature}</p>
        </div>
        <div className="mt-10">
          <HedgeRow />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   5. Walks from the door — compact painted WalkingMap + 3 picks alongside.
   -------------------------------------------------------------------------- */
export function WalksStrip({
  kicker,
  heading,
  linkLabel,
  places,
  allPlaces,
}: {
  kicker: ReactNode;
  heading: ReactNode;
  linkLabel: ReactNode;
  places: readonly GuidePlace[];
  allPlaces: readonly GuidePlace[];
}) {
  return (
    <section className="reveal-section py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">{kicker}</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-ink">{heading}</h2>
          </div>
          <SiteLink href="/local-guide/" className="button button-quiet">
            {linkLabel}
          </SiteLink>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          <div className="linocut-frame overflow-hidden rounded-ui p-1.5 sm:p-2 lg:col-span-7">
            <WalkingMap places={allPlaces} compact />
          </div>

          <ol className="space-y-4 lg:col-span-5">
            {places.map((place) => (
              <li
                key={place.id}
                className="flex items-start gap-3.5 border-b border-line pb-4 last:border-b-0"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-honeysuckle font-sc text-sm font-bold text-white">
                  {place.mapPin}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{place.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 font-sc text-xs tracking-[0.08em] text-primary-ink">
                    <LinocutIcon name={place.travel === 'on-foot' ? 'footpath' : 'car'} className="h-4 w-4" />
                    <span>
                      {guideCategoryLabels[place.category]} · {formatPlaceDistance(place)}
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{place.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   6. Finding us + closing primary ivy CTA band.
   -------------------------------------------------------------------------- */
export function FindingUsSection({
  kicker,
  heading,
  ctaHeading,
  ctaText,
  ctaLabel,
  business,
}: {
  kicker: ReactNode;
  heading: ReactNode;
  ctaHeading: ReactNode;
  ctaText: ReactNode;
  ctaLabel: ReactNode;
  business: Business;
}) {
  return (
    <>
      <StitchedHem />
      <section className="linen-band reveal-section py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-12">
          {/* Printed notice box */}
          <div className="linocut-frame rounded-ui p-6 sm:p-8 lg:col-span-5">
            <p className="kicker">{kicker}</p>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,2.6rem)] text-ink">
              {heading}
            </h2>
            <address className="mt-4 not-italic text-ink">{business.address.formatted}</address>
            <p className="mt-3 text-sm leading-relaxed text-muted">{business.directionsSummary}</p>

            <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <p>
                <span className="font-sc text-xs tracking-[0.1em] text-muted">TELEPHONE </span>
                <a
                  className="text-link ml-1"
                  href={`tel:${business.phoneSchema.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              </p>
              <p>
                <span className="font-sc text-xs tracking-[0.1em] text-muted">EMAIL </span>
                <a className="text-link ml-1 wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <p className="text-muted">
                Check-in {business.times.checkIn}–{business.times.checkInEnd} · Check-out by{' '}
                {business.times.checkOut}
              </p>
              <div className="pt-1">
                <OpenBadge hours={business.phoneHours} />
              </div>
            </div>
          </div>

          {/* Stone-edged GoogleMap frame */}
          <div className="rounded-ui border-4 border-stone bg-stone p-1.5 shadow-[4px_4px_0_var(--ink)] lg:col-span-7">
            <div className="border-2 border-ink bg-surface">
              <GoogleMap
                address={business.address.formatted}
                title="Map to Honeysuckle Cottage, The Street, Bibury"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-width closing primary ivy call */}
      <section className="relative overflow-hidden border-y-2 border-ink bg-primary text-on-primary">
        <div className="wrap relative z-10 flex flex-col items-start justify-between gap-6 py-12 sm:py-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] leading-tight text-white">
              {ctaHeading}
            </h2>
            <p className="mt-2.5 text-[1.02rem] text-white/90">{ctaText}</p>
          </div>
          <SiteLink href="/contact/" className="button button-on-dark shrink-0">
            {ctaLabel}
          </SiteLink>
        </div>
        <div className="pointer-events-none absolute -right-4 -top-6 hidden opacity-35 md:block no-print">
          <HoneysuckleVine className="h-52 w-28" />
        </div>
      </section>
    </>
  );
}
