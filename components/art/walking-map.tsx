import type { CSSProperties } from 'react';
import type { GuideCategory, GuidePlace } from '../../content/local-guide';
import { asset } from '../../lib/paths';

/** Intrinsic size of the painted map (public/map/bibury-{light,dark}.webp). */
export const MAP_IMAGE_WIDTH = 1376;
export const MAP_IMAGE_HEIGHT = 768;

/** Where Honeysuckle Cottage sits on the painted map, as 0–100 percentages. */
const COTTAGE = { x: 48.7, y: 26 };

/** Labels near the right edge flip to the left of their pin so they stay on the map. */
const FLIP_LABEL_AFTER_X = 70;

type PinStyle = CSSProperties & { '--x': string; '--y': string };

function at(x: number, y: number): PinStyle {
  return { '--x': `${x}%`, '--y': `${y}%` };
}

/**
 * Painted gouache-and-ink walking map of Bibury & the River Coln (light: morning,
 * dark: lamplit dusk), with numbered pins for every on-foot place in
 * content/local-guide.ts placed by their `mapX`/`mapY` percentages. Pins and labels
 * are HTML set in the site fonts and scale with the map via container units.
 * Drive destinations are listed separately by `FurtherAfield`.
 */
export function WalkingMap({
  places,
  activeCategory = 'all',
  compact = false,
  className = '',
}: {
  places: readonly GuidePlace[];
  activeCategory?: GuideCategory | 'all';
  /** Pins only (no place-name tags), for small previews such as the Home page. */
  compact?: boolean;
  className?: string;
}) {
  const onFoot = places.filter((p) => p.travel === 'on-foot' && p.mapX != null && p.mapY != null);

  return (
    <div
      className={`walking-map relative isolate overflow-hidden ${compact ? 'walking-map-compact' : ''} ${className}`}
      role="img"
      aria-label={`Painted walking map of Bibury and the River Coln showing Honeysuckle Cottage and numbered pins for ${onFoot
        .map((p) => `${p.mapPin} ${p.name}`)
        .join(', ')}.`}
    >
      <img
        src={asset('/map/bibury-light.webp')}
        alt=""
        width={MAP_IMAGE_WIDTH}
        height={MAP_IMAGE_HEIGHT}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full select-none"
      />
      <img
        src={asset('/map/bibury-dark.webp')}
        alt=""
        width={MAP_IMAGE_WIDTH}
        height={MAP_IMAGE_HEIGHT}
        loading="lazy"
        decoding="async"
        className="hero-img-dark pointer-events-none absolute inset-0 block h-full w-full select-none object-cover"
      />

      <div className="absolute inset-0" aria-hidden="true">
        <span className="map-home" style={at(COTTAGE.x, COTTAGE.y)}>
          Honeysuckle Cottage
        </span>

        {onFoot.map((place) => {
          const active = activeCategory === 'all' || place.category === activeCategory;
          const flip = (place.mapX ?? 0) > FLIP_LABEL_AFTER_X;
          return (
            <span
              key={place.id}
              className={`map-pin ${flip ? 'map-pin-flip' : ''}`}
              data-active={active}
              style={at(place.mapX ?? 0, place.mapY ?? 0)}
            >
              <span className="map-pin-head">{place.mapPin}</span>
              {!compact && <span className="map-pin-label">{place.mapLabel ?? place.name}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * "Further afield" wooden signpost: drive destinations, which sit beyond the
 * edge of the walking map. Arms dim when the local-guide filter excludes them.
 */
export function FurtherAfield({
  places,
  activeCategory = 'all',
}: {
  places: readonly GuidePlace[];
  activeCategory?: GuideCategory | 'all';
}) {
  const drives = places.filter((p) => p.travel === 'drive');
  if (drives.length === 0) return null;
  return (
    <div className="mt-6">
      <p className="font-sc text-sm tracking-[0.1em] text-primary-ink">Further afield, by car</p>
      <ul className="signpost mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {drives.map((place) => {
          const active = activeCategory === 'all' || place.category === activeCategory;
          return (
            <li key={place.id} className="signpost-arm" data-active={active}>
              <div className="signpost-board">
                <div className="signpost-face">
                  <span className="signpost-pin">{place.mapPin}</span>
                  <span className="min-w-0 flex-1 truncate">{place.name}</span>
                  <span className="font-sc text-[0.82rem] tracking-[0.06em] text-muted">
                    {place.distanceMiles.toFixed(1)} mi
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
