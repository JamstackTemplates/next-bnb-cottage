/** Cotswold drystone wall course divider. */
export function StoneCourse({ className = 'w-full h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      className={`block no-print ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="1200" height="28" fill="var(--stone)" />
      <g fill="var(--stone-deep)" opacity="0.55">
        <path d="M12 4 H102 L98 13 H8 Z" />
        <path d="M164 15 H268 L264 25 H160 Z" />
        <path d="M332 3 H444 L438 13 H328 Z" />
        <path d="M510 15 H612 L608 25 H506 Z" />
        <path d="M684 4 H798 L792 13 H680 Z" />
        <path d="M862 15 H978 L972 25 H858 Z" />
        <path d="M1044 4 H1156 L1150 13 H1040 Z" />
      </g>
      <path
        d="M0 2 H1200 M0 14 H1200 M0 26 H1200"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <path
        d="M110 2 V14 M228 2 V14 M322 2 V14 M452 2 V14 M576 2 V14 M674 2 V14 M804 2 V14 M928 2 V14 M1034 2 V14 M1164 2 V14 M58 14 V26 M156 14 V26 M276 14 V26 M392 14 V26 M502 14 V26 M622 14 V26 M740 14 V26 M854 14 V26 M984 14 V26 M1098 14 V26"
        stroke="var(--ink)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/** Clipped cottage hedgerow with honeysuckle blossoms. */
export function HedgeRow({ className = 'w-full max-w-2xl mx-auto h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 44"
      className={`block no-print ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 32 C34 14, 72 16, 98 24 C128 12, 168 14, 198 22 C232 10, 276 12, 314 20 C352 10, 398 12, 434 22 C468 12, 512 14, 544 24 C574 14, 606 16, 624 32 L618 36 H22 Z"
        fill="var(--primary)"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      {/* Gouge leaf strokes */}
      <g stroke="var(--linen)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
        <path d="M58 24 L68 20 M142 22 L154 18 M248 20 L262 17 M368 20 L380 17 M486 22 L498 19 M576 24 L588 21" />
      </g>
      {/* Blossoms */}
      <g stroke="var(--ink)" strokeWidth="1.4">
        <circle cx="96" cy="21" r="5" fill="var(--honeysuckle)" />
        <circle cx="103" cy="24" r="3.5" fill="var(--butter)" />
        <circle cx="232" cy="18" r="5" fill="var(--butter)" />
        <circle cx="240" cy="21" r="3.5" fill="var(--honeysuckle)" />
        <circle cx="388" cy="18" r="5" fill="var(--honeysuckle)" />
        <circle cx="396" cy="22" r="3.5" fill="var(--butter)" />
        <circle cx="534" cy="22" r="5" fill="var(--butter)" />
        <circle cx="542" cy="25" r="3.5" fill="var(--honeysuckle)" />
      </g>
    </svg>
  );
}

/** Printed tea-towel stitched hem with a tiny knot at the centre. */
export function StitchedHem({ className = 'w-full h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 20"
      preserveAspectRatio="none"
      className={`block no-print ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0"
        y1="10"
        x2="386"
        y2="10"
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray="9 7"
      />
      <line
        x1="414"
        y1="10"
        x2="800"
        y2="10"
        stroke="var(--line)"
        strokeWidth="2"
        strokeDasharray="9 7"
      />
      <path
        d="M393 10 L400 4 L407 10 L400 16 Z"
        fill="var(--honeysuckle)"
        stroke="var(--ink)"
        strokeWidth="1.4"
      />
    </svg>
  );
}
