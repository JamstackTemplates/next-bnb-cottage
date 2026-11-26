/** Teapot and egg-cup linocut vignette for the top of the breakfast menu card. */
export function MenuCardVignette({ className = 'mx-auto h-16 w-44' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 74"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Carved rule flanks */}
      <path d="M6 48 H44 M156 48 H194" stroke="var(--line)" strokeWidth="2" strokeDasharray="5 4" />

      {/* Teapot */}
      <g transform="translate(52, 12)" stroke="var(--ink)" strokeWidth="2">
        <ellipse cx="38" cy="36" rx="22" ry="18" fill="var(--primary)" />
        <path d="M16 32 C6 28, 6 18, 12 16" fill="none" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M60 28 C72 24, 72 44, 58 44" fill="none" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="38" cy="18" rx="12" ry="4" fill="var(--butter)" />
        <circle cx="38" cy="12" r="3.5" fill="var(--honeysuckle)" />
        <path d="M26 36 C32 32, 44 32, 50 36" fill="none" stroke="var(--linen)" strokeWidth="1.5" />
      </g>

      {/* Egg in cup */}
      <g transform="translate(124, 20)" stroke="var(--ink)" strokeWidth="2">
        <ellipse cx="14" cy="15" rx="9" ry="11" fill="var(--butter)" />
        <path d="M4 20 H24 L20 34 H8 Z" fill="var(--surface)" />
        <path d="M14 34 V40 M6 42 H22" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Linocut hen and egg-cup motif for the breakfast teaser & serving times. */
export function HenAndEggCup({ className = 'h-32 w-40' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Misregistered stone oval ground */}
      <ellipse cx="92" cy="116" rx="74" ry="16" fill="var(--stone)" transform="translate(2, 2)" />
      <ellipse cx="90" cy="114" rx="74" ry="16" fill="none" stroke="var(--ink)" strokeWidth="2" />

      {/* Plump cottage hen */}
      <g stroke="var(--ink)" strokeWidth="2.4">
        <path
          d="M36 86 C34 56, 62 42, 86 56 C100 48, 114 36, 122 54 C128 74, 112 98, 76 100 C54 102, 38 98, 36 86 Z"
          fill="var(--honeysuckle)"
        />
        {/* Wing gouges */}
        <path
          d="M58 70 C72 64, 90 68, 98 80 C84 86, 66 86, 58 76"
          fill="var(--butter)"
          strokeWidth="1.8"
        />
        <path d="M68 74 H88 M72 80 H90" stroke="var(--ink)" strokeWidth="1.4" />
        {/* Head, comb & beak */}
        <circle cx="44" cy="52" r="14" fill="var(--honeysuckle)" />
        <path d="M36 39 C38 30, 46 30, 48 38 C52 32, 58 34, 54 42" fill="var(--honeysuckle)" />
        <path d="M30 52 L19 56 L30 60 Z" fill="var(--butter)" />
        <circle cx="40" cy="50" r="2.2" fill="var(--ink)" />
        {/* Legs */}
        <path d="M68 100 V116 M84 100 V116 M62 116 H74 M78 116 H90" strokeWidth="2.2" />
      </g>

      {/* Egg in ceramic egg-cup */}
      <g transform="translate(124, 56)" stroke="var(--ink)" strokeWidth="2.2">
        <ellipse cx="20" cy="20" rx="13" ry="16" fill="var(--butter)" />
        <path d="M15 12 C18 9, 22 9, 24 12" fill="none" stroke="var(--linen)" strokeWidth="1.6" />
        <path d="M5 28 H35 L29 48 H11 Z" fill="var(--surface)" />
        <path d="M9 36 H31" stroke="var(--primary)" strokeWidth="2.4" />
        <path d="M20 48 V56 M10 58 H30" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Three-step printed frieze: hen house -> baker's van -> farm shop. */
export function SupplyFrieze({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 150"
      className={`block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Dashed footpath connecting the three steps */}
      <path
        d="M235 84 H345 M560 84 H665"
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeDasharray="7 6"
      />
      <path d="M336 77 L347 84 L336 91 M656 77 L667 84 L656 91" fill="none" stroke="var(--ink)" strokeWidth="2.2" />

      {/* 1. Hen house */}
      <g transform="translate(36, 18)" stroke="var(--ink)" strokeWidth="2.2">
        <rect x="26" y="42" width="128" height="72" fill="var(--stone)" />
        <path d="M14 46 L90 8 L166 46 Z" fill="var(--primary)" />
        <path d="M70 114 V72 C70 58, 110 58, 110 72 V114 Z" fill="var(--ink)" />
        <circle cx="90" cy="96" r="10" fill="var(--butter)" />
        <path d="M10 114 H172" strokeWidth="2.4" />
      </g>

      {/* 2. Cirencester baker's van */}
      <g transform="translate(358, 28)" stroke="var(--ink)" strokeWidth="2.2">
        <path d="M16 86 V34 H120 L144 54 H174 V86 Z" fill="var(--surface)" />
        <rect x="24" y="42" width="88" height="34" fill="var(--butter)" />
        <path d="M126 42 H142 L156 54 H126 Z" fill="var(--river)" />
        {/* Loaf silhouette */}
        <ellipse cx="68" cy="59" rx="24" ry="11" fill="var(--honeysuckle)" />
        <path d="M56 54 L62 63 M68 52 L74 63 M80 54 L85 62" stroke="var(--linen)" strokeWidth="1.6" />
        <circle cx="52" cy="90" r="14" fill="var(--ink)" />
        <circle cx="52" cy="90" r="5" fill="var(--linen)" />
        <circle cx="144" cy="90" r="14" fill="var(--ink)" />
        <circle cx="144" cy="90" r="5" fill="var(--linen)" />
      </g>

      {/* 3. Cotswold farm shop */}
      <g transform="translate(682, 20)" stroke="var(--ink)" strokeWidth="2.2">
        <rect x="20" y="46" width="144" height="66" fill="var(--stone)" />
        <path d="M10 48 L92 14 L174 48 Z" fill="var(--river)" />
        {/* Striped awning */}
        <path d="M20 56 H164 V72 H20 Z" fill="var(--honeysuckle)" />
        <path d="M44 56 V72 M68 56 V72 M92 56 V72 M116 56 V72 M140 56 V72" stroke="var(--linen)" strokeWidth="4" />
        <rect x="38" y="80" width="44" height="32" fill="var(--butter)" />
        <rect x="102" y="76" width="38" height="36" fill="var(--primary)" />
        <path d="M10 112 H174" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
