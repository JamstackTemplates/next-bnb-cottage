import type { StitchMotif } from '../../content/house-rules';

/** Cross-stitch alphabet top/bottom border strip for the house-rules sampler. */
export function SamplerAlphabetBand({ text }: { text: string }) {
  return (
    <p
      aria-hidden="true"
      className="select-none overflow-hidden text-center font-sc text-[0.78rem] tracking-[0.38em] text-muted"
    >
      {text}
    </p>
  );
}

/** Stitched cottage and two birds header motif for the sampler cloth. */
export function SamplerCottageMotif({ className = 'mx-auto h-20 w-64' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 84"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Left bird */}
      <g fill="var(--honeysuckle)">
        <rect x="34" y="42" width="6" height="6" />
        <rect x="40" y="36" width="6" height="6" />
        <rect x="46" y="42" width="12" height="12" />
        <rect x="58" y="48" width="12" height="6" />
        <rect x="40" y="54" width="6" height="6" fill="var(--ink)" />
        <rect x="52" y="54" width="6" height="6" fill="var(--ink)" />
      </g>

      {/* Small cross-stitch cottage */}
      <g>
        {/* Roof */}
        <rect x="116" y="16" width="48" height="6" fill="var(--river)" />
        <rect x="108" y="22" width="64" height="6" fill="var(--river)" />
        <rect x="100" y="28" width="80" height="6" fill="var(--river)" />
        {/* Chimney */}
        <rect x="118" y="6" width="10" height="10" fill="var(--honeysuckle)" />
        {/* Stone walls */}
        <rect x="106" y="34" width="68" height="34" fill="var(--stone)" />
        {/* Lit windows */}
        <rect x="114" y="42" width="12" height="12" fill="var(--butter)" />
        <rect x="154" y="42" width="12" height="12" fill="var(--butter)" />
        {/* Green door */}
        <rect x="134" y="46" width="12" height="22" fill="var(--primary)" />
      </g>

      {/* Right bird (mirrored) */}
      <g fill="var(--honeysuckle)">
        <rect x="240" y="42" width="6" height="6" />
        <rect x="234" y="36" width="6" height="6" />
        <rect x="222" y="42" width="12" height="12" />
        <rect x="210" y="48" width="12" height="6" />
        <rect x="234" y="54" width="6" height="6" fill="var(--ink)" />
        <rect x="222" y="54" width="6" height="6" fill="var(--ink)" />
      </g>

      {/* Stitched baseline */}
      <line x1="16" y1="74" x2="264" y2="74" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}

/** Pixel cross-stitch icons for individual rules on the sampler. */
export function CrossStitchIcon({
  motif,
  className = 'h-6 w-6 shrink-0',
}: {
  motif: StitchMotif;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {motif === 'clock' && (
        <g fill="var(--primary)">
          <rect x="8" y="3" width="8" height="3" />
          <rect x="5" y="6" width="3" height="3" />
          <rect x="16" y="6" width="3" height="3" />
          <rect x="3" y="9" width="3" height="6" />
          <rect x="18" y="9" width="3" height="6" />
          <rect x="5" y="15" width="3" height="3" />
          <rect x="16" y="15" width="3" height="3" />
          <rect x="8" y="18" width="8" height="3" />
          <rect x="11" y="7" width="2" height="6" fill="var(--honeysuckle)" />
          <rect x="11" y="11" width="5" height="2" fill="var(--honeysuckle)" />
        </g>
      )}
      {motif === 'key' && (
        <g fill="var(--honeysuckle)">
          <rect x="3" y="8" width="3" height="8" />
          <rect x="6" y="6" width="4" height="3" />
          <rect x="6" y="15" width="4" height="3" />
          <rect x="9" y="9" width="3" height="6" />
          <rect x="12" y="11" width="9" height="2" fill="var(--ink)" />
          <rect x="16" y="13" width="2" height="4" fill="var(--ink)" />
          <rect x="19" y="13" width="2" height="3" fill="var(--ink)" />
        </g>
      )}
      {motif === 'moon' && (
        <g fill="var(--butter)">
          <rect x="10" y="4" width="6" height="3" />
          <rect x="7" y="7" width="5" height="3" />
          <rect x="6" y="10" width="4" height="5" />
          <rect x="7" y="15" width="5" height="3" />
          <rect x="10" y="18" width="6" height="3" />
          <rect x="17" y="6" width="2" height="2" fill="var(--honeysuckle)" />
          <rect x="19" y="12" width="2" height="2" fill="var(--honeysuckle)" />
        </g>
      )}
      {motif === 'pawprint' && (
        <g fill="var(--honeysuckle)">
          <rect x="5" y="7" width="3" height="3" />
          <rect x="9" y="4" width="3" height="3" />
          <rect x="13" y="5" width="3" height="3" />
          <rect x="17" y="8" width="3" height="3" />
          <rect x="8" y="11" width="8" height="7" fill="var(--primary)" />
        </g>
      )}
      {motif === 'kettle' && (
        <g fill="var(--primary)">
          <rect x="9" y="4" width="6" height="2" />
          <rect x="7" y="6" width="2" height="4" />
          <rect x="15" y="6" width="2" height="4" />
          <rect x="6" y="10" width="12" height="9" fill="var(--honeysuckle)" />
          <rect x="18" y="11" width="3" height="3" fill="var(--ink)" />
          <rect x="3" y="12" width="3" height="5" fill="var(--ink)" />
        </g>
      )}
      {motif === 'boot' && (
        <g fill="var(--primary)">
          <rect x="7" y="4" width="6" height="10" />
          <rect x="7" y="14" width="12" height="5" fill="var(--stone-deep)" />
          <rect x="6" y="18" width="14" height="2" fill="var(--ink)" />
        </g>
      )}
      {motif === 'smoke' && (
        <g>
          <rect x="4" y="13" width="13" height="3" fill="var(--stone-deep)" />
          <rect x="17" y="13" width="3" height="3" fill="var(--honeysuckle)" />
          <rect x="5" y="5" width="3" height="3" fill="var(--honeysuckle)" />
          <rect x="8" y="8" width="3" height="3" fill="var(--honeysuckle)" />
          <rect x="11" y="11" width="3" height="3" fill="var(--honeysuckle)" />
          <rect x="14" y="14" width="3" height="3" fill="var(--honeysuckle)" />
          <rect x="17" y="17" width="3" height="3" fill="var(--honeysuckle)" />
        </g>
      )}
      {motif === 'child' && (
        <g>
          <rect x="10" y="4" width="4" height="4" fill="var(--honeysuckle)" />
          <rect x="8" y="9" width="8" height="6" fill="var(--primary)" />
          <rect x="5" y="10" width="3" height="2" fill="var(--primary)" />
          <rect x="16" y="10" width="3" height="2" fill="var(--primary)" />
          <rect x="9" y="15" width="2" height="5" fill="var(--ink)" />
          <rect x="13" y="15" width="2" height="5" fill="var(--ink)" />
        </g>
      )}
    </svg>
  );
}
