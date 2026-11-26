export const GUIDE_CATEGORIES = ['walk', 'village', 'history', 'food', 'rainy-day'] as const;
export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export const TRAVEL_MODES = ['on-foot', 'drive'] as const;
export type TravelMode = (typeof TRAVEL_MODES)[number];

export interface GuidePlace {
  /** URL-safe unique identifier. */
  id: string;
  /** Place or route name. */
  name: string;
  /** Filter category. */
  category: GuideCategory;
  /** Distance from the cottage gate in miles (0–25, one decimal). */
  distanceMiles: number;
  /** Optional round-trip walking loop length in miles. */
  routeMiles?: number;
  /** Whether reached on foot from the cottage or by car. */
  travel: TravelMode;
  /** Unique consecutive pin number (1..n), shown on the map and gazetteer. */
  mapPin: number;
  /**
   * On-foot places only: where the pin points on the painted map
   * (public/map/bibury-*.webp), as 0–100 percent from the left edge.
   * Drive destinations are off the map and listed on the "Further afield" signpost.
   */
  mapX?: number;
  /** On-foot places only: pin position as 0–100 percent from the top edge. */
  mapY?: number;
  /** Optional shorter name for the map label (defaults to `name`). */
  mapLabel?: string;
  /** Short host-written note. */
  note: string;
  /** Optional personal tip from Ellen and Tom. */
  hostTip?: string;
}

export const guideCategoryLabels: Record<GuideCategory, string> = {
  walk: 'Walks',
  village: 'Villages',
  history: 'Gardens & history',
  food: 'Food & drink',
  'rainy-day': 'Rainy day',
};

export const guidePlaces: GuidePlace[] = [
  {
    id: 'arlington-row',
    name: 'Arlington Row',
    category: 'history',
    distanceMiles: 0.2,
    travel: 'on-foot',
    mapPin: 1,
    mapX: 29.1,
    mapY: 44.9,
    note: 'Go before nine and you’ll have the weavers’ cottages and the footbridge to yourselves.',
    hostTip: 'Turn left past the footbridge to look back across the water meadow.',
  },
  {
    id: 'rack-isle',
    name: 'Rack Isle water meadow',
    category: 'walk',
    distanceMiles: 0.2,
    travel: 'on-foot',
    mapPin: 2,
    mapX: 35.6,
    mapY: 78.1,
    mapLabel: 'Rack Isle',
    note: 'A wet meadow ringed by the River Coln where weavers once hung woollen cloth to dry.',
    hostTip: 'Bring binoculars in spring for moorhens, wagtails and marsh marigolds.',
  },
  {
    id: 'st-marys-bibury',
    name: 'St Mary’s Church, Bibury',
    category: 'history',
    distanceMiles: 0.3,
    travel: 'on-foot',
    mapPin: 3,
    mapX: 72.3,
    mapY: 25.4,
    mapLabel: 'St Mary’s Church',
    note: 'Saxon stonework, a quiet yew churchyard and stained glass tucked away up Church Road.',
    hostTip: 'Take the footpath behind the lychgate back down towards the mill stream.',
  },
  {
    id: 'coln-valley-loop',
    name: 'Coln valley loop to Coln St Aldwyns',
    category: 'walk',
    distanceMiles: 0.0,
    routeMiles: 4.5,
    travel: 'on-foot',
    mapPin: 4,
    mapX: 90.1,
    mapY: 78.1,
    mapLabel: 'Coln St Aldwyns loop',
    note: 'Field paths and stone stiles following the river to the next village and back along the ridge.',
    hostTip: 'We keep laminated copies of our hand-drawn route card in the hall.',
  },
  {
    id: 'ablington',
    name: 'Ablington hamlet',
    category: 'village',
    distanceMiles: 1.2,
    travel: 'on-foot',
    mapPin: 5,
    mapX: 21.8,
    mapY: 12.4,
    note: 'A quiet upstream cluster of limestone barns, a stone bridge and a footpath through sheep pasture.',
    hostTip: 'An easy evening stroll before supper when the valley goes still.',
  },
  {
    id: 'chedworth-roman-villa',
    name: 'Chedworth Roman Villa',
    category: 'history',
    distanceMiles: 7.5,
    travel: 'drive',
    mapPin: 6,
    note: 'Fourth-century Roman mosaics and bath-house ruins sheltered in a wooded Coln valley combe.',
    hostTip: 'The lane is narrow in places—take it slowly and enjoy the beech woods.',
  },
  {
    id: 'cirencester',
    name: 'Cirencester market town',
    category: 'food',
    distanceMiles: 7.0,
    travel: 'drive',
    mapPin: 7,
    note: 'Independent bakers, greengrocers and weekly markets around the limestone parish church.',
    hostTip: 'Worth a morning wander for picnic provisions before a longer valley walk.',
  },
  {
    id: 'corinium-museum',
    name: 'Corinium Museum',
    category: 'rainy-day',
    distanceMiles: 7.0,
    travel: 'drive',
    mapPin: 8,
    note: 'Roman mosaics, carved stone altars and Cotswold archaeology under one warm roof.',
    hostTip: 'Our favourite wet-afternoon shelter, ten minutes from the market place.',
  },
  {
    id: 'bourton-on-the-water',
    name: 'Bourton-on-the-Water',
    category: 'village',
    distanceMiles: 11.0,
    travel: 'drive',
    mapPin: 9,
    note: 'Low stone footbridges over the River Windrush and easy riverside benches.',
    hostTip: 'Arrive early or late afternoon for a quieter walk along the water.',
  },
  {
    id: 'cotswold-water-park',
    name: 'Cotswold Water Park',
    category: 'walk',
    distanceMiles: 12.0,
    travel: 'drive',
    mapPin: 10,
    note: 'Flat, level lakeside trails and bird hides across dozens of flooded gravel lakes.',
    hostTip: 'Ideal for an easy, pushchair- or dog-friendly ramble on clear winter days.',
  },
];

export function formatPlaceDistance(place: GuidePlace): string {
  if (place.distanceMiles === 0 && place.routeMiles) {
    return `From the gate · ${place.routeMiles}-mile loop`;
  }
  const travelText = place.travel === 'on-foot' ? 'on foot' : 'drive';
  return `${place.distanceMiles.toFixed(1)} mi · ${travelText}`;
}

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateLocalGuide(places: readonly GuidePlace[] = guidePlaces): void {
  if (!places.length) throw new Error('local-guide: at least one place is required');
  const seenIds = new Set<string>();
  const seenPins = new Set<number>();

  for (const place of places) {
    if (!place.id || !URL_SAFE_ID.test(place.id)) {
      throw new Error(`local-guide[${place.id || 'unknown'}]: id must be lowercase URL-safe`);
    }
    if (seenIds.has(place.id)) {
      throw new Error(`local-guide[${place.id}]: duplicate place id`);
    }
    seenIds.add(place.id);
    if (!place.name.trim()) throw new Error(`local-guide[${place.id}]: name is required`);
    if (!GUIDE_CATEGORIES.includes(place.category)) {
      throw new Error(`local-guide[${place.id}]: unknown category "${place.category}"`);
    }
    if (!TRAVEL_MODES.includes(place.travel)) {
      throw new Error(`local-guide[${place.id}]: unknown travel mode "${place.travel}"`);
    }
    if (typeof place.distanceMiles !== 'number' || place.distanceMiles < 0 || place.distanceMiles > 25) {
      throw new Error(`local-guide[${place.id}]: distanceMiles must be between 0 and 25`);
    }
    if (!Number.isInteger(place.mapPin) || place.mapPin < 1) {
      throw new Error(`local-guide[${place.id}]: mapPin must be a positive integer`);
    }
    if (seenPins.has(place.mapPin)) {
      throw new Error(`local-guide[${place.id}]: duplicate mapPin ${place.mapPin}`);
    }
    seenPins.add(place.mapPin);
    const hasCoords = place.mapX !== undefined || place.mapY !== undefined;
    if (place.travel === 'on-foot' || hasCoords) {
      for (const value of [place.mapX, place.mapY]) {
        if (typeof value !== 'number' || value < 0 || value > 100) {
          throw new Error(
            `local-guide[${place.id}]: mapX and mapY must both be between 0 and 100` +
              (place.travel === 'on-foot' ? ' (required for on-foot places shown on the map)' : ''),
          );
        }
      }
    }
    if (place.mapLabel !== undefined && !place.mapLabel.trim()) {
      throw new Error(`local-guide[${place.id}]: mapLabel must not be empty when set`);
    }
    if (!place.note.trim()) throw new Error(`local-guide[${place.id}]: note is required`);
  }

  for (let pin = 1; pin <= places.length; pin += 1) {
    if (!seenPins.has(pin)) {
      throw new Error(`local-guide: mapPin values must be consecutive 1..${places.length} (missing ${pin})`);
    }
  }
}
