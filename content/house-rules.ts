import { business } from './business.ts';

export const RULE_GROUPS = ['arrival', 'staying', 'departure'] as const;
export type RuleGroup = (typeof RULE_GROUPS)[number];

export const STITCH_MOTIFS = [
  'key',
  'moon',
  'pawprint',
  'kettle',
  'boot',
  'clock',
  'smoke',
  'child',
] as const;
export type StitchMotif = (typeof STITCH_MOTIFS)[number];

export interface HouseRule {
  /** URL-safe unique identifier. */
  id: string;
  /** Sampler column group. */
  group: RuleGroup;
  /** Short stitched heading. */
  title: string;
  /** Plain-language detail. */
  detail: string;
  /** Cross-stitch pixel motif name. */
  stitch: StitchMotif;
}

export const ruleGroupLabels: Record<RuleGroup, string> = {
  arrival: 'Arrival',
  staying: 'Staying',
  departure: 'Departure',
};

export const houseRules: HouseRule[] = [
  {
    id: 'check-in',
    group: 'arrival',
    title: `Check-in ${business.times.checkIn}–${business.times.checkInEnd}`,
    detail: 'Tell us when you enquire if you expect to arrive later so we can leave the porch lamp on.',
    stitch: 'clock',
  },
  {
    id: 'keys',
    group: 'arrival',
    title: 'Front-door key',
    detail: 'Each room has its own front-door key; we bolt the porch door at 23:00 for a quiet night.',
    stitch: 'key',
  },
  {
    id: 'parking',
    group: 'arrival',
    title: 'Gravel parking',
    detail: 'Park on our gravel behind the stone wall rather than on the narrow village lane.',
    stitch: 'boot',
  },
  {
    id: 'quiet',
    group: 'staying',
    title: 'Quiet after 22:00',
    detail: 'The stone walls are thick, but the 17th-century oak stairs like to creak.',
    stitch: 'moon',
  },
  {
    id: 'no-smoking',
    group: 'staying',
    title: 'No smoking or vaping',
    detail: 'Not indoors and not in the cottage garden, for the comfort of all four rooms.',
    stitch: 'smoke',
  },
  {
    id: 'dogs',
    group: 'staying',
    title: 'Dogs in the Garden Room',
    detail: 'One well-behaved dog per stay in the Garden Room (£15 per stay), never left alone in the room.',
    stitch: 'pawprint',
  },
  {
    id: 'children',
    group: 'staying',
    title: 'Children aged 8 and over',
    detail: 'Welcome in the Orchard Room with its daybed; please tell us ages when you enquire.',
    stitch: 'child',
  },
  {
    id: 'boots',
    group: 'staying',
    title: 'Muddy boots in the boot room',
    detail: 'Leave wet boots and coats in the stone boot room by the garden door—boot jacks and newspaper are waiting.',
    stitch: 'boot',
  },
  {
    id: 'kettle',
    group: 'staying',
    title: 'Tea tray & fresh milk',
    detail: 'Help yourself to the tea tray and biscuits in your room; tap on the kitchen door any time for fresh milk.',
    stitch: 'kettle',
  },
  {
    id: 'check-out',
    group: 'departure',
    title: `Check-out by ${business.times.checkOut}`,
    detail: 'Bags are welcome to stay in the boot room until 15:00 if you want one last walk along the Coln.',
    stitch: 'clock',
  },
  {
    id: 'changes',
    group: 'departure',
    title: 'Changing your dates',
    detail: 'Write to us by email as soon as your plans shift and we will confirm what is possible in writing.',
    stitch: 'key',
  },
];

export const houseRuleNotes = [
  {
    id: 'children-note',
    heading: 'Children',
    body: 'Because the cottage has steep oak stairs and a low garden wall beside the stream, we welcome children aged 8 and over in the Orchard Room, where the daybed makes up cleanly for a third guest (£30 per night with breakfast).',
  },
  {
    id: 'dogs-note',
    heading: 'Dogs',
    body: 'One well-behaved dog is welcome in the ground-floor Garden Room for £15 per stay. We leave a dog bed, drying towels and water bowl by the stable door. Dogs cannot be left unattended in the room or join breakfast in the garden room.',
  },
  {
    id: 'accessibility-note',
    heading: 'Step-free access & old stonework',
    body: 'The Garden Room sits on the ground floor with level step-free access from the gravel parking along the garden path and a walk-in shower. The other three rooms are up one flight of original 17th-century oak stairs with a sturdy handrail.',
  },
] as const;

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateHouseRules(rules: readonly HouseRule[] = houseRules): void {
  if (!rules.length) throw new Error('house-rules: at least one rule is required');
  const seen = new Set<string>();
  for (const rule of rules) {
    if (!rule.id || !URL_SAFE_ID.test(rule.id)) {
      throw new Error(`house-rules[${rule.id || 'unknown'}]: id must be lowercase URL-safe`);
    }
    if (seen.has(rule.id)) {
      throw new Error(`house-rules[${rule.id}]: duplicate rule id`);
    }
    seen.add(rule.id);
    if (!RULE_GROUPS.includes(rule.group)) {
      throw new Error(`house-rules[${rule.id}]: unknown group "${rule.group}"`);
    }
    if (!STITCH_MOTIFS.includes(rule.stitch)) {
      throw new Error(`house-rules[${rule.id}]: unknown stitch "${rule.stitch}"`);
    }
    if (!rule.title.trim()) throw new Error(`house-rules[${rule.id}]: title is required`);
    if (!rule.detail.trim()) throw new Error(`house-rules[${rule.id}]: detail is required`);
  }
}
