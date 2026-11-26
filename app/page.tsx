import type { Metadata } from 'next';
import {
  BreakfastTeaser,
  FindingUsSection,
  HomeHero,
  HostsNote,
  RoomsFacade,
  WalksStrip,
} from '../components/home-sections';
import { breakfastSections } from '../content/breakfast';
import { business } from '../content/business';
import { guidePlaces } from '../content/local-guide';
import { rooms } from '../content/rooms';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const cookedItems = breakfastSections.find((s) => s.id === 'cooked')?.items ?? [];
const breakfastHighlights = cookedItems.filter((item) =>
  ['full-cottage', 'eggs-your-way', 'smoked-trout'].includes(item.id),
);
const doorWalks = guidePlaces.filter((place) =>
  ['arlington-row', 'rack-isle', 'coln-valley-loop'].includes(place.id),
);

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Kicker>Bed &amp; breakfast · Bibury</HomeHero.Kicker>
        <HomeHero.Heading>
          A stone cottage, a honeysuckle door and breakfast from our own hens.
        </HomeHero.Heading>
        <HomeHero.Intro>
          Four quiet rooms in a 17th-century Cotswold-stone cottage, two minutes’ walk from
          Arlington Row and the River Coln.
        </HomeHero.Intro>
        <HomeHero.Actions>
          <HomeHero.PrimaryCta>Enquire about dates</HomeHero.PrimaryCta>
          <HomeHero.SecondaryCta>See the rooms</HomeHero.SecondaryCta>
        </HomeHero.Actions>
        <HomeHero.TimesLine>
          Check-in from 3pm · Breakfast till 9:30 (10:00 weekends)
        </HomeHero.TimesLine>
      </HomeHero>

      <RoomsFacade
        kicker="Four casements"
        heading="The rooms at a glance"
        intro="Every room has its own window onto the village or garden. Pick a casement to see inside, beds and nightly rates with breakfast."
        rooms={rooms}
      />

      <BreakfastTeaser
        kicker="In the garden room"
        heading="Eggs from the hens at the bottom of the garden"
        intro="Breakfast is cooked to order each morning with our own hens’ eggs, bread from the Cirencester baker and dry-cured bacon from the valley farm shop."
        linkLabel="Read the breakfast menu"
        highlights={breakfastHighlights}
      />

      <HostsNote
        kicker="From the kitchen table"
        heading="A note from Ellen & Tom"
        signature="Ellen & Tom"
      >
        <p>
          We moved into Honeysuckle Cottage twelve autumns ago, lured by the quiet of the Coln
          valley once the afternoon coaches have gone home. In the early morning you hear the river
          over the weir, the jackdaws in the old dovecote and our six hens waiting by the orchard
          gate.
        </p>
        <p>
          We keep four rooms so the cottage stays unhurried. Leave your muddy boots in the stone
          boot room, borrow a hand-drawn walking route from the hall, and let us know how you like
          your eggs before you head upstairs.
        </p>
      </HostsNote>

      <WalksStrip
        kicker="Out of the gate"
        heading="Walks from the door"
        linkLabel="See the full local guide"
        places={doorWalks}
        allPlaces={guidePlaces}
      />

      <FindingUsSection
        kicker="Finding us"
        heading="The Street, Bibury"
        ctaHeading="Thinking of a few nights in the Cotswolds?"
        ctaText="Tell us your preferred dates and room. We reply personally by email with availability and the price—your room is only booked once we’ve confirmed in writing."
        ctaLabel="Enquire about dates"
        business={business}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
