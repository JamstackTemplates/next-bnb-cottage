export const DIETARY_TAGS = ['v', 'vg', 'gf-option'] as const;
export type DietaryTag = (typeof DIETARY_TAGS)[number];

export interface BreakfastItem {
  /** URL-safe unique item identifier. */
  id: string;
  /** Dish or drink name on the printed menu card. */
  name: string;
  /** Short description of ingredients or preparation. */
  description: string;
  /** 0 means included in the room rate; otherwise whole pounds 1–15. */
  supplementGBP: number;
  /** Dietary markers from 'v' | 'vg' | 'gf-option'. */
  dietary: DietaryTag[];
  /** Set false when out of season or unavailable today. */
  available: boolean;
  /** Optional seasonal window, e.g. "June–September". */
  seasonal?: string;
}

export interface BreakfastSection {
  /** URL-safe unique section identifier. */
  id: string;
  /** Printed section heading on the menu card. */
  title: string;
  /** Dishes or drinks in this section. */
  items: BreakfastItem[];
}

export const breakfastSections: BreakfastSection[] = [
  {
    id: 'from-the-sideboard',
    title: 'From the sideboard',
    items: [
      {
        id: 'granola',
        name: 'House granola with yoghurt and honey',
        description: 'Toasted oats, orchard apple, thick farm yoghurt and Cotswold blossom honey.',
        supplementGBP: 0,
        dietary: ['v'],
        available: true,
      },
      {
        id: 'fruit',
        name: 'Poached fruit of the week',
        description: 'Stewed orchard pears, plums or rhubarb depending on what is ripe.',
        supplementGBP: 0,
        dietary: ['vg', 'gf-option'],
        available: true,
      },
      {
        id: 'pastries',
        name: 'Warm pastries from the Cirencester baker',
        description: 'Butter croissants and spiced buns brought fresh from the morning bake.',
        supplementGBP: 0,
        dietary: ['v'],
        available: true,
      },
      {
        id: 'juice',
        name: 'Pressed apple juice from the valley',
        description: 'Cloudy orchard-pressed apple juice, poured cold.',
        supplementGBP: 0,
        dietary: ['vg'],
        available: true,
      },
    ],
  },
  {
    id: 'cooked',
    title: 'From the stove',
    items: [
      {
        id: 'full-cottage',
        name: 'The full cottage',
        description: 'Dry-cured bacon, pork sausage, hen’s egg, field mushroom, roast tomato, black pudding and toast.',
        supplementGBP: 0,
        dietary: ['gf-option'],
        available: true,
      },
      {
        id: 'garden-veg',
        name: 'The garden vegetarian',
        description: 'Griddled halloumi, hen’s egg, field mushroom, roast tomato, baked beans and toast.',
        supplementGBP: 0,
        dietary: ['v', 'gf-option'],
        available: true,
      },
      {
        id: 'eggs-your-way',
        name: 'Hens’ eggs your way on sourdough',
        description: 'Poached, scrambled or softly boiled from our own flock, on toasted sourdough.',
        supplementGBP: 0,
        dietary: ['v', 'gf-option'],
        available: true,
      },
      {
        id: 'smoked-trout',
        name: 'Smoked Coln trout with scrambled egg',
        description: 'Oak-smoked valley trout flaked over soft scrambled hens’ eggs and buttered toast.',
        supplementGBP: 4,
        dietary: ['gf-option'],
        available: true,
      },
      {
        id: 'pancakes',
        name: 'Buttermilk pancakes with summer berries',
        description: 'Warm griddle pancakes with garden berries and a drizzle of honey.',
        supplementGBP: 0,
        dietary: ['v'],
        available: false,
        seasonal: 'June–September',
      },
      {
        id: 'porridge',
        name: 'Porridge with cream and demerara',
        description: 'Pinhead oats simmered slowly; made with oat milk on request (vg).',
        supplementGBP: 0,
        dietary: ['v'],
        available: true,
      },
    ],
  },
  {
    id: 'to-drink',
    title: 'Pots and cups',
    items: [
      {
        id: 'tea',
        name: 'Pot of tea',
        description: 'English breakfast, Earl Grey or fresh garden peppermint.',
        supplementGBP: 0,
        dietary: ['vg'],
        available: true,
      },
      {
        id: 'coffee',
        name: 'Cafetière coffee',
        description: 'Freshly ground medium-roast coffee, with cow’s or oat milk.',
        supplementGBP: 0,
        dietary: ['vg'],
        available: true,
      },
      {
        id: 'hot-chocolate',
        name: 'Hot chocolate',
        description: 'Dark cocoa whisked into warm whole milk.',
        supplementGBP: 0,
        dietary: ['v'],
        available: true,
      },
    ],
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateBreakfast(sections: readonly BreakfastSection[] = breakfastSections): void {
  if (!sections.length) throw new Error('breakfast: at least one section is required');
  const seenSections = new Set<string>();
  const seenItems = new Set<string>();

  for (const section of sections) {
    if (!section.id || !URL_SAFE_ID.test(section.id)) {
      throw new Error(`breakfast section[${section.id || 'unknown'}]: id must be lowercase URL-safe`);
    }
    if (seenSections.has(section.id)) {
      throw new Error(`breakfast section[${section.id}]: duplicate section id`);
    }
    seenSections.add(section.id);
    if (!section.title.trim()) {
      throw new Error(`breakfast section[${section.id}]: title is required`);
    }
    if (!section.items.length) {
      throw new Error(`breakfast section[${section.id}]: must contain at least one item`);
    }

    let availableCount = 0;
    for (const item of section.items) {
      if (!item.id || !URL_SAFE_ID.test(item.id)) {
        throw new Error(`breakfast item[${item.id || 'unknown'}]: id must be lowercase URL-safe`);
      }
      if (seenItems.has(item.id)) {
        throw new Error(`breakfast item[${item.id}]: duplicate item id`);
      }
      seenItems.add(item.id);
      if (!item.name.trim()) {
        throw new Error(`breakfast item[${item.id}]: name is required`);
      }
      if (!item.description.trim()) {
        throw new Error(`breakfast item[${item.id}]: description is required`);
      }
      if (
        !Number.isInteger(item.supplementGBP) ||
        item.supplementGBP < 0 ||
        item.supplementGBP > 15
      ) {
        throw new Error(`breakfast item[${item.id}]: supplementGBP must be an integer 0–15`);
      }
      for (const tag of item.dietary) {
        if (!DIETARY_TAGS.includes(tag)) {
          throw new Error(`breakfast item[${item.id}]: unknown dietary tag "${tag}"`);
        }
      }
      if (item.available) availableCount += 1;
    }

    if (availableCount < 1) {
      throw new Error(
        `breakfast section[${section.id}]: must have at least one available item`,
      );
    }
  }
}
