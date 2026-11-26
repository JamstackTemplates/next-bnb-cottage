/** Linocut honeysuckle roundel for the header wordmark and small accents. */
export function FlowerMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Slight misregistered stone block */}
      <path
        d="M34 4 C50 5, 61 17, 60 33 C59 49, 47 60, 31 59 C15 58, 5 46, 6 31 C7 15, 19 3, 34 4 Z"
        fill="var(--stone)"
        transform="translate(1.5, 1.5)"
      />
      <path
        d="M32 4 C48 4, 59 16, 59 32 C59 48, 46 59, 31 59 C15 59, 5 47, 5 32 C5 16, 17 4, 32 4 Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      {/* Stem */}
      <path
        d="M17 46 C22 37, 27 30, 34 22"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Paired leaves */}
      <path
        d="M21 38 C13 35, 13 26, 21 26 C24 30, 24 34, 21 38 Z"
        fill="var(--primary)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <path
        d="M28 33 C37 35, 42 42, 34 45 C30 41, 28 36, 28 33 Z"
        fill="var(--primary)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      {/* Tubular honeysuckle trumpets */}
      <path
        d="M33 23 C36 14, 46 12, 49 18 C45 21, 40 22, 35 25 Z"
        fill="var(--honeysuckle)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <path
        d="M34 24 C42 20, 50 24, 47 31 C42 30, 38 28, 34 25 Z"
        fill="var(--butter)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <path
        d="M32 22 C28 14, 34 8, 40 12 C38 16, 35 19, 32 22 Z"
        fill="var(--honeysuckle)"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      {/* Gouge highlight */}
      <path
        d="M19 31 L22 33 M38 17 L44 16"
        stroke="var(--linen)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Climbing linocut honeysuckle vine for page heads, hero edges and postcards. */
export function HoneysuckleVine({
  className = 'h-48 w-28',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {/* Main twining stem */}
      <path
        d="M84 256 C78 214, 46 186, 62 142 C76 102, 92 78, 54 34 C46 24, 38 14, 28 8"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M84 256 C78 214, 46 186, 62 142 C76 102, 92 78, 54 34 C46 24, 38 14, 28 8"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeDasharray="18 6"
        strokeLinecap="round"
      />

      {/* Secondary tendril */}
      <path
        d="M62 142 C42 132, 26 112, 18 90"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Paired leaves along the vine */}
      <g fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.8">
        <path d="M74 216 C92 204, 108 212, 102 226 C92 230, 80 225, 74 216 Z" />
        <path d="M68 206 C48 202, 34 214, 42 224 C54 226, 63 218, 68 206 Z" />
        <path d="M59 164 C40 156, 26 168, 34 180 C45 182, 54 174, 59 164 Z" />
        <path d="M68 154 C88 146, 104 156, 98 170 C86 173, 75 166, 68 154 Z" />
        <path d="M73 108 C92 98, 110 108, 104 122 C92 126, 80 119, 73 108 Z" />
        <path d="M66 64 C46 56, 32 68, 40 79 C51 82, 60 74, 66 64 Z" />
        <path d="M44 36 C60 24, 76 30, 72 44 C62 48, 51 44, 44 36 Z" />
      </g>

      {/* Carved leaf veins */}
      <g stroke="var(--linen)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <path d="M78 217 L96 218" />
        <path d="M63 209 L46 216" />
        <path d="M55 166 L39 173" />
        <path d="M72 156 L92 162" />
        <path d="M77 110 L98 114" />
      </g>

      {/* Flower cluster 1 (top) — misregistered accent */}
      <g transform="translate(2, 1.5)">
        <path d="M29 18 C16 8, 6 14, 10 24 C18 25, 24 23, 29 18 Z" fill="var(--honeysuckle)" />
        <path d="M31 20 C24 30, 14 34, 14 42 C24 40, 30 32, 31 20 Z" fill="var(--butter)" />
        <path d="M32 16 C32 4, 44 2, 48 10 C42 15, 37 16, 32 16 Z" fill="var(--honeysuckle)" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1.8">
        <path d="M29 18 C16 8, 6 14, 10 24 C18 25, 24 23, 29 18 Z" />
        <path d="M31 20 C24 30, 14 34, 14 42 C24 40, 30 32, 31 20 Z" />
        <path d="M32 16 C32 4, 44 2, 48 10 C42 15, 37 16, 32 16 Z" />
      </g>

      {/* Flower cluster 2 (mid-left tendril) */}
      <g transform="translate(1.5, 1.5)">
        <path d="M22 94 C10 86, 4 94, 8 104 C15 104, 19 100, 22 94 Z" fill="var(--honeysuckle)" />
        <path d="M24 96 C18 108, 24 118, 32 114 C32 106, 29 101, 24 96 Z" fill="var(--butter)" />
        <path d="M24 92 C26 80, 38 78, 40 86 C35 90, 30 92, 24 92 Z" fill="var(--honeysuckle)" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1.8">
        <path d="M22 94 C10 86, 4 94, 8 104 C15 104, 19 100, 22 94 Z" />
        <path d="M24 96 C18 108, 24 118, 32 114 C32 106, 29 101, 24 96 Z" />
        <path d="M24 92 C26 80, 38 78, 40 86 C35 90, 30 92, 24 92 Z" />
      </g>

      {/* Flower cluster 3 (lower right) */}
      <g transform="translate(1.5, 1.5)">
        <path d="M84 184 C96 176, 108 182, 104 192 C96 194, 90 190, 84 184 Z" fill="var(--butter)" />
        <path d="M82 186 C90 198, 86 208, 76 206 C76 198, 78 192, 82 186 Z" fill="var(--honeysuckle)" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1.8">
        <path d="M84 184 C96 176, 108 182, 104 192 C96 194, 90 190, 84 184 Z" />
        <path d="M82 186 C90 198, 86 208, 76 206 C76 198, 78 192, 82 186 Z" />
      </g>
    </svg>
  );
}
