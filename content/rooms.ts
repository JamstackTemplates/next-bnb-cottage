
export type RoomFloor = 'ground' | 'first';

export interface Room {
  /** URL-safe unique identifier, also used as the /rooms/#<id> anchor. */
  id: string;
  /** Display name of the room. */
  name: string;
  /** Bed configuration description. */
  bed: string;
  /** Maximum number of guests (integer 1–4). */
  sleeps: number;
  /** Floor area in square metres. */
  sizeSqM: number;
  /** Cottage storey. */
  floor: RoomFloor;
  /** View or garden access from the window/door. */
  outlook: string;
  /** Nightly rate in whole pounds (40–400) for two guests with breakfast. */
  pricePerNightGBP: number;
  /** Extra guest charge in whole pounds per night, or null if not offered. */
  extraGuestGBP: number | null;
  /** Minimum weekend stay in nights (1–3). */
  minNightsWeekend: number;
  /** Whether a well-behaved dog is welcome in this room. */
  dogFriendly: boolean;
  /** Optional short note about dog tariff or conditions. */
  dogNote?: string;
  /** Set false to show "Not taking enquiries this season" and hide the room's enquiry link. */
  openForEnquiries: boolean;
  /** Short list of distinctive room features (non-empty). */
  features: string[];
}

export const AMENITY_ICONS = [
  'tea-tray',
  'wifi',
  'toiletries',
  'bottles',
  'boot-room',
  'parking',
  'ev',
] as const;
export type AmenityIcon = (typeof AMENITY_ICONS)[number];

export interface Amenity {
  /** Unique identifier. */
  id: string;
  /** Short visitor-facing label. */
  label: string;
  /** Linocut icon name. */
  icon: AmenityIcon;
}

export const rooms: Room[] = [
  {
    id: 'honeysuckle',
    name: 'Honeysuckle Room',
    bed: 'King, oak four-poster',
    sleeps: 2,
    sizeSqM: 22,
    floor: 'first',
    outlook: 'Over the front door and the honeysuckle porch',
    pricePerNightGBP: 165,
    extraGuestGBP: null,
    minNightsWeekend: 2,
    dogFriendly: false,
    openForEnquiries: true,
    features: ['Roll-top bath', 'Window seat', 'Welsh wool blanket'],
  },
  {
    id: 'dovecote',
    name: 'Dovecote Room',
    bed: 'Double',
    sleeps: 2,
    sizeSqM: 15,
    floor: 'first',
    outlook: 'Rooftops and the old dovecote',
    pricePerNightGBP: 115,
    extraGuestGBP: null,
    minNightsWeekend: 2,
    dogFriendly: false,
    openForEnquiries: true,
    features: ['Sloping beams', 'Shower room', 'Writing desk'],
  },
  {
    id: 'orchard',
    name: 'Orchard Room',
    bed: 'Super-king or twin, plus daybed',
    sleeps: 3,
    sizeSqM: 26,
    floor: 'first',
    outlook: 'Apple trees and the hen run',
    pricePerNightGBP: 150,
    extraGuestGBP: 30,
    minNightsWeekend: 2,
    dogFriendly: false,
    openForEnquiries: true,
    features: ['Daybed for a child aged 8+', 'Bath with shower', 'Garden view'],
  },
  {
    id: 'garden-room',
    name: 'Garden Room',
    bed: 'King',
    sleeps: 2,
    sizeSqM: 20,
    floor: 'ground',
    outlook: 'Own door onto the cottage garden',
    pricePerNightGBP: 145,
    extraGuestGBP: null,
    minNightsWeekend: 2,
    dogFriendly: true,
    dogNote: 'One dog welcome, £15 per stay',
    openForEnquiries: true,
    features: [
      'Step-free level access from the garden path',
      'Walk-in shower',
      'Private terrace',
      'Dog bed and towels',
    ],
  },
];

export const amenities: Amenity[] = [
  { id: 'tea-tray', label: 'Tea tray with home-baked biscuits', icon: 'tea-tray' },
  { id: 'wifi', label: 'Wi-Fi throughout', icon: 'wifi' },
  { id: 'toiletries', label: 'Lavender toiletries from a Cotswold farm', icon: 'toiletries' },
  { id: 'bottles', label: 'Hot-water bottles', icon: 'bottles' },
  { id: 'boot-room', label: 'Boot room for muddy boots', icon: 'boot-room' },
  { id: 'parking', label: 'Off-road parking for four cars', icon: 'parking' },
  { id: 'ev', label: 'EV charging point (just ask)', icon: 'ev' },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateRooms(list: readonly Room[] = rooms): void {
  if (!list.length) throw new Error('rooms: at least one room is required');
  const seen = new Set<string>();
  for (const room of list) {
    if (!room.id || !URL_SAFE_ID.test(room.id)) {
      throw new Error(`rooms[${room.id || 'unknown'}]: id must be lowercase URL-safe`);
    }
    if (seen.has(room.id)) {
      throw new Error(`rooms[${room.id}]: duplicate room id`);
    }
    seen.add(room.id);
    if (!room.name.trim()) throw new Error(`rooms[${room.id}]: name is required`);
    if (!room.bed.trim()) throw new Error(`rooms[${room.id}]: bed is required`);
    if (!room.outlook.trim()) throw new Error(`rooms[${room.id}]: outlook is required`);
    if (!Number.isInteger(room.sleeps) || room.sleeps < 1 || room.sleeps > 4) {
      throw new Error(`rooms[${room.id}]: sleeps must be an integer between 1 and 4`);
    }
    if (typeof room.sizeSqM !== 'number' || room.sizeSqM <= 0) {
      throw new Error(`rooms[${room.id}]: sizeSqM must be a positive number`);
    }
    if (room.floor !== 'ground' && room.floor !== 'first') {
      throw new Error(`rooms[${room.id}]: floor must be "ground" or "first"`);
    }
    if (
      !Number.isInteger(room.pricePerNightGBP) ||
      room.pricePerNightGBP < 40 ||
      room.pricePerNightGBP > 400
    ) {
      throw new Error(`rooms[${room.id}]: pricePerNightGBP must be an integer between 40 and 400`);
    }
    if (
      room.extraGuestGBP !== null &&
      (!Number.isInteger(room.extraGuestGBP) || room.extraGuestGBP < 0)
    ) {
      throw new Error(`rooms[${room.id}]: extraGuestGBP must be null or a non-negative integer`);
    }
    if (
      !Number.isInteger(room.minNightsWeekend) ||
      room.minNightsWeekend < 1 ||
      room.minNightsWeekend > 3
    ) {
      throw new Error(`rooms[${room.id}]: minNightsWeekend must be an integer between 1 and 3`);
    }
    if (!Array.isArray(room.features) || room.features.length === 0) {
      throw new Error(`rooms[${room.id}]: features must be a non-empty array`);
    }
    for (const feature of room.features) {
      if (!feature.trim()) throw new Error(`rooms[${room.id}]: empty feature string`);
    }
  }
}

/** Derive schema.org priceRange (e.g. "£115–£165") from room prices. */
/**
 * Public paths of a room's painted window illustrations (shown on the home page).
 * Each room needs `public/rooms/<id>-light.webp` and `public/rooms/<id>-dark.webp`.
 */
export function roomImagePaths(roomId: string): { light: string; dark: string } {
  return {
    light: `/rooms/${roomId}-light.webp`,
    dark: `/rooms/${roomId}-dark.webp`,
  };
}

export function roomPriceRange(list: readonly Room[] = rooms): string {
  const prices = list.map((room) => room.pricePerNightGBP);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `£${min}` : `£${min}–£${max}`;
}

export function anyDogsAllowed(list: readonly Room[] = rooms): boolean {
  return list.some((room) => room.dogFriendly);
}
