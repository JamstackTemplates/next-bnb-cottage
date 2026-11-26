/** 404 linocut art: a blank wooden fingerpost half-swallowed by a honeysuckle hedge with a hen peering out. */
export function LostInTheHedge({ className = 'mx-auto w-full max-w-md h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 260"
      className={className}
      role="img"
      aria-label="Linocut illustration of a wooden fingerpost signpost half-swallowed by a blooming honeysuckle hedge with a curious hen peering out."
    >
      {/* Fingerpost upright */}
      <rect x="196" y="34" width="20" height="198" fill="var(--stone)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M192 34 L206 18 L220 34 Z" fill="var(--stone-deep)" stroke="var(--ink)" strokeWidth="2.4" />

      {/* Blank fingerpost arms */}
      <path d="M196 58 H74 L56 72 L74 86 H196 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M216 94 H340 L358 108 L340 122 H216 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
      {/* Carved wood grain lines on the blank arms */}
      <path d="M84 72 H174 M234 108 H326" stroke="var(--line)" strokeWidth="1.6" strokeDasharray="8 5" />

      {/* Overgrown hedge swallowing the base */}
      <path
        d="M24 228 C28 164, 86 138, 146 154 C178 122, 246 126, 276 156 C332 136, 392 164, 396 228 Z"
        fill="var(--primary)"
        stroke="var(--ink)"
        strokeWidth="2.6"
      />
      {/* Twining vine climbing the post */}
      <path
        d="M196 176 C174 150, 232 128, 208 92 C194 74, 218 58, 224 44"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4"
      />
      {/* Blossoms */}
      <g stroke="var(--ink)" strokeWidth="1.6">
        <circle cx="102" cy="176" r="8" fill="var(--honeysuckle)" />
        <circle cx="110" cy="180" r="5" fill="var(--butter)" />
        <circle cx="222" cy="68" r="7" fill="var(--butter)" />
        <circle cx="228" cy="74" r="5" fill="var(--honeysuckle)" />
        <circle cx="316" cy="178" r="8" fill="var(--honeysuckle)" />
        <circle cx="324" cy="182" r="5" fill="var(--butter)" />
      </g>

      {/* Curious hen peering out from the hedge */}
      <g transform="translate(248, 168)" stroke="var(--ink)" strokeWidth="2.2">
        <circle cx="22" cy="24" r="14" fill="var(--honeysuckle)" />
        <path d="M16 10 C18 3, 25 3, 27 10 C30 5, 35 8, 32 14" fill="var(--honeysuckle)" />
        <path d="M35 22 L46 26 L35 30 Z" fill="var(--butter)" />
        <circle cx="26" cy="22" r="2.2" fill="var(--ink)" />
      </g>

      {/* Ground line */}
      <path d="M16 230 H404" stroke="var(--ink)" strokeWidth="2.4" />
    </svg>
  );
}
