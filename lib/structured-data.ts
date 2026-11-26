import { business } from '../content/business.ts';
import { amenities, anyDogsAllowed, roomPriceRange, rooms } from '../content/rooms.ts';
import { absoluteUrl } from './paths.ts';

/** BedAndBreakfast structured data derived from typed cottage content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const image = url ? `${url}og.png` : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BedAndBreakfast',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phoneSchema,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    checkinTime: business.times.checkIn,
    checkoutTime: business.times.checkOut,
    petsAllowed: anyDogsAllowed(rooms),
    priceRange: roomPriceRange(rooms),
    amenityFeature: amenities.map((item) => ({
      '@type': 'LocationFeatureSpecification',
      name: item.label,
      value: true,
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
