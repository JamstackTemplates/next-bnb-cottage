import type { DietaryTag } from '../../content/breakfast';

export type LinocutIconName =
  | 'bed'
  | 'sleeps'
  | 'stairs'
  | 'paw'
  | 'bath'
  | 'shower'
  | 'tea-tray'
  | 'wifi'
  | 'toiletries'
  | 'bottles'
  | 'boot-room'
  | 'parking'
  | 'ev'
  | 'footpath'
  | 'car'
  | 'clock'
  | 'key';

/** 24px linocut icons with bold ink outlines and subtle accent fills. */
export function LinocutIcon({
  name,
  className = 'h-5 w-5 shrink-0',
}: {
  name: LinocutIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'bed' && (
        <>
          <path d="M3 18 V9 M21 18 V12 M3 15 H21" />
          <path d="M5 12 H10 V15 H5 Z" fill="var(--butter)" />
          <path d="M10 11 H19 C20 11, 21 12, 21 13 V15 H10 Z" fill="var(--stone)" />
        </>
      )}
      {name === 'sleeps' && (
        <>
          <rect x="3" y="8" width="8" height="7" rx="2" fill="var(--stone)" />
          <rect x="13" y="8" width="8" height="7" rx="2" fill="var(--butter)" />
          <path d="M5 11.5 H9 M15 11.5 H19" />
        </>
      )}
      {name === 'stairs' && (
        <path d="M4 19 H9 V15 H13 V11 H17 V7 H21" />
      )}
      {name === 'paw' && (
        <>
          <circle cx="7" cy="9" r="1.7" fill="var(--honeysuckle)" />
          <circle cx="11" cy="6.8" r="1.7" fill="var(--honeysuckle)" />
          <circle cx="15" cy="7.5" r="1.7" fill="var(--honeysuckle)" />
          <circle cx="18" cy="10.5" r="1.6" fill="var(--honeysuckle)" />
          <path d="M8 15 C8 12.5, 10 11, 12.2 11 C14.5 11, 16.5 12.5, 16.5 15 C16.5 17.5, 14.5 18.5, 12 18.5 C9.5 18.5, 8 17.2, 8 15 Z" fill="var(--stone)" />
        </>
      )}
      {name === 'bath' && (
        <>
          <path d="M4 12 H20 V15 C20 17.5, 18 19, 15.5 19 H8.5 C6 19, 4 17.5, 4 15 Z" fill="var(--stone)" />
          <path d="M6 12 V7 C6 5.5, 7.5 5, 9 5.5" />
          <path d="M7 19 L6 21 M17 19 L18 21" />
        </>
      )}
      {name === 'shower' && (
        <>
          <path d="M5 20 V8 C5 5.5, 7.5 4, 10.5 4 H13" />
          <path d="M11 7 H18 L16.5 4.5 H12.5 Z" fill="var(--stone)" />
          <path d="M12 10 V12 M15 10 V13 M17.5 10 V12 M13.5 15 V17 M16.5 15 V17" />
        </>
      )}
      {name === 'tea-tray' && (
        <>
          <path d="M3 18 H21 L19.5 20 H4.5 Z" fill="var(--stone)" />
          <path d="M7 12 H15 V16 C15 17.2, 13.8 18, 11 18 C8.2 18, 7 17.2, 7 16 Z" fill="var(--butter)" />
          <path d="M15 13 H17.5 C18.5 13, 18.5 16, 17 16 H15" />
          <path d="M9.5 9 C9.5 7.5, 10.8 7, 10.8 5.5 M12.5 9 C12.5 7.5, 13.8 7, 13.8 5.5" />
        </>
      )}
      {name === 'wifi' && (
        <>
          <path d="M4 10 C8.5 6, 15.5 6, 20 10" />
          <path d="M7 13.5 C10 10.8, 14 10.8, 17 13.5" />
          <path d="M10 17 C11.2 15.8, 12.8 15.8, 14 17" />
          <circle cx="12" cy="19.5" r="1.2" fill="var(--honeysuckle)" />
        </>
      )}
      {name === 'toiletries' && (
        <>
          <rect x="8" y="9" width="8" height="11" rx="2" fill="var(--stone)" />
          <path d="M10 9 V6 H14 V9 M9 6 H15" />
          <path d="M12 12 V17 M10.5 14 L12 12.5 L13.5 14" stroke="var(--primary)" />
        </>
      )}
      {name === 'bottles' && (
        <>
          <path d="M9 5 H15 L14 8 H10 Z" fill="var(--stone)" />
          <rect x="7" y="8" width="10" height="12" rx="4" fill="var(--honeysuckle)" />
          <path d="M9.5 12 H14.5 M9.5 15.5 H14.5" stroke="var(--linen)" />
        </>
      )}
      {name === 'boot-room' && (
        <>
          <path d="M7 5 H13 V14 L19 15.5 V19 H6 V5 Z" fill="var(--stone)" />
          <path d="M6 17 H19" />
          <path d="M9 9 H11.5 M9 11.5 H11.5" />
        </>
      )}
      {name === 'parking' && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" fill="var(--stone)" />
          <path d="M9.5 17 V8 H13.5 C15.2 8, 16 9.2, 16 10.5 C16 12, 15 13, 13.5 13 H9.5" />
        </>
      )}
      {name === 'ev' && (
        <>
          <path d="M9 4 V9 M15 4 V9 M7 9 H17 V13 C17 15.5, 14.8 17.5, 12 17.5 C9.2 17.5, 7 15.5, 7 13 Z" fill="var(--butter)" />
          <path d="M12 17.5 V21" />
        </>
      )}
      {name === 'footpath' && (
        <>
          <path d="M7 18 C7 14, 10 13, 10 9.5 C10 7, 8.5 5.5, 7 6 C5.5 6.5, 5 8.5, 6 11" fill="var(--stone)" />
          <path d="M15 20 C15 16, 18 15, 18 11.5 C18 9, 16.5 7.5, 15 8 C13.5 8.5, 13 10.5, 14 13" fill="var(--butter)" />
        </>
      )}
      {name === 'car' && (
        <>
          <path d="M4 14 L6.5 8.5 H17.5 L20 14 V18 H4 Z" fill="var(--stone)" />
          <circle cx="7.5" cy="18" r="2" fill="var(--linen)" />
          <circle cx="16.5" cy="18" r="2" fill="var(--linen)" />
          <path d="M6.5 13 H17.5" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="8.5" fill="var(--butter)" />
          <path d="M12 7.5 V12 L15 14" />
        </>
      )}
      {name === 'key' && (
        <>
          <circle cx="8" cy="12" r="3.5" fill="var(--butter)" />
          <path d="M11.5 12 H20 M17 12 V15 M19.5 12 V14.5" />
        </>
      )}
    </svg>
  );
}

const dietaryMeta: Record<DietaryTag, { code: string; title: string }> = {
  v: { code: 'V', title: 'Vegetarian' },
  vg: { code: 'VG', title: 'Vegan' },
  'gf-option': { code: 'GF*', title: 'Gluten-free option available' },
};

/** Carved linocut roundel for dietary tags on the breakfast card. */
export function DietaryRoundel({ tag }: { tag: DietaryTag }) {
  const { code, title } = dietaryMeta[tag];
  return (
    <span
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center rounded-full border border-ink bg-linen px-1.5 py-0.5 font-sc text-[0.72rem] leading-none tracking-wide text-ink"
    >
      {code}
    </span>
  );
}
