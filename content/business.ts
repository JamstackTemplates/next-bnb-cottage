import { DAYS, type OpeningHours } from '../lib/hours.ts';

export interface PostalAddress {
  /** Building or cottage name and street line. */
  streetAddress: string;
  /** Village or town. */
  addressLocality: string;
  /** County or region. */
  addressRegion: string;
  /** UK postcode. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code. */
  addressCountry: string;
  /** Full single-line formatted address for maps and display. */
  formatted: string;
}

export interface CottageTimes {
  /** Earliest check-in time in 24-hour HH:MM format. */
  checkIn: string;
  /** Latest standard check-in time in 24-hour HH:MM format. */
  checkInEnd: string;
  /** Check-out deadline in 24-hour HH:MM format. */
  checkOut: string;
  /** Weekday breakfast serving window. */
  breakfastWeekday: string;
  /** Weekend (Saturday–Sunday) breakfast serving window. */
  breakfastWeekend: string;
  /** Annual closure note shown as plain text, not computed. */
  closedNote: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark name displayed in the header. */
  shortName: string;
  /** Short subtitle beside the wordmark. */
  placeLine: string;
  /** Hosts' names. */
  hosts: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and schema. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public UK display telephone number (Ofcom drama range). */
  phone: string;
  /** International telephone format for schema.org and tel: links. */
  phoneSchema: string;
  /** Cottage postal address. */
  address: PostalAddress;
  /** Short directions summary referencing Arlington Row and the River Coln. */
  directionsSummary: string;
  /** Check-in, check-out, breakfast and seasonal closure details. */
  times: CottageTimes;
  /** Daily phone-line hours (same-day intervals only) used by OpenBadge. */
  phoneHours: readonly OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-text introduction; enquiries only, confirmed in writing. */
    introduction: string;
    /** Guidance checklist for the message box, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Honeysuckle Cottage B&B',
  shortName: 'Honeysuckle Cottage',
  placeLine: 'B&B · Bibury',
  hosts: 'Ellen & Tom Marlow',
  tagline: 'A stone cottage, a honeysuckle door and breakfast from our own hens.',
  introduction:
    'A four-room Cotswold-stone B&B in Bibury with cooked breakfasts, garden rooms and walks from the door. Enquire about dates.',
  email: 'stay@honeysucklecottage.example',
  phone: '01632 960418',
  phoneSchema: '+44 1632 960418',
  address: {
    streetAddress: 'Honeysuckle Cottage, The Street, Bibury',
    addressLocality: 'Cirencester',
    addressRegion: 'Gloucestershire',
    postalCode: 'GL7 5NJ',
    addressCountry: 'GB',
    formatted:
      'Honeysuckle Cottage, The Street, Bibury, Cirencester, Gloucestershire GL7 5NJ, United Kingdom',
  },
  directionsSummary:
    'Turn onto The Street beside the River Coln bridge. We are the honey-stone cottage with the green stable door, two minutes’ walk upstream from Arlington Row. Pull straight onto the gravel behind the low drystone wall.',
  times: {
    checkIn: '15:00',
    checkInEnd: '19:30',
    checkOut: '10:30',
    breakfastWeekday: '08:00–09:30',
    breakfastWeekend: '08:30–10:00',
    closedNote: 'Open all year except 23–27 December.',
  },
  phoneHours: DAYS.map((day) => ({ day, opens: '08:00', closes: '20:00' })),
  enquiries: {
    title: 'Enquire about dates',
    introduction:
      'We’ll reply by email with availability and the price. Your room is only booked once we’ve confirmed in writing.',
    usefulToInclude: [
      'Preferred room (or “any”)',
      'Arrival date and number of nights',
      'Number of guests, plus children’s ages',
      'Whether a dog is coming',
      'Dietary needs or allergies',
      'Estimated arrival time',
    ],
  },
};
