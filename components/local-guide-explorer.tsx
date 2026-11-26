'use client';

import { useEffect, useState } from 'react';
import {
  GUIDE_CATEGORIES,
  formatPlaceDistance,
  guideCategoryLabels,
  type GuideCategory,
  type GuidePlace,
} from '../content/local-guide';
import { LinocutIcon } from './art/icons';
import { FurtherAfield, WalkingMap } from './art/walking-map';

export function LocalGuideExplorer({ places }: { places: readonly GuidePlace[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [category, setCategory] = useState<GuideCategory | 'all'>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visible =
    hydrated && category !== 'all'
      ? places.filter((place) => place.category === category)
      : places;

  return (
    <div className="wrap py-10 sm:py-14">
      {/* Category filter chips (progressive enhancement) */}
      {hydrated ? (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 no-print">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter local guide">
            <button
              type="button"
              className="filter-chip"
              aria-pressed={category === 'all'}
              onClick={() => setCategory('all')}
            >
              All places
            </button>
            {GUIDE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className="filter-chip"
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {guideCategoryLabels[cat]}
              </button>
            ))}
          </div>
          <p className="font-sc text-sm tracking-[0.06em] text-muted" role="status" aria-live="polite">
            Showing {visible.length} of {places.length} places
          </p>
        </div>
      ) : null}

      {/* Framed walking map (horizontally scrollable on small screens) */}
      <figure className="mb-12">
        <p className="mb-2 font-sc text-xs tracking-[0.1em] text-muted sm:hidden no-print">
          Drag the map sideways to explore →
        </p>
        <div className="linocut-frame overflow-x-auto rounded-ui p-2 sm:p-3">
          <div className="min-w-[660px]">
            <WalkingMap places={places} activeCategory={hydrated ? category : 'all'} />
          </div>
        </div>
        <figcaption className="mt-2.5 text-center font-sc text-xs tracking-[0.1em] text-muted">
          Pin numbers on the map match the gazetteer below
        </figcaption>
        <FurtherAfield places={places} activeCategory={hydrated ? category : 'all'} />
      </figure>

      {/* Two-column numbered gazetteer */}
      <ol className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        {visible.map((place) => (
          <li
            key={place.id}
            className="flex items-start gap-4 border-b border-line pb-6"
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-honeysuckle font-sc text-sm font-bold text-white shadow-[2px_2px_0_var(--ink)]">
              {place.mapPin}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl text-ink">{place.name}</h2>
                <span className="font-sc text-xs tracking-[0.1em] text-primary-ink">
                  {guideCategoryLabels[place.category]}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-muted">
                <LinocutIcon
                  name={place.travel === 'on-foot' ? 'footpath' : 'car'}
                  className="h-4 w-4 text-primary-ink"
                />
                <span>{formatPlaceDistance(place)}</span>
              </p>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-ink/90">{place.note}</p>
              {place.hostTip ? (
                <p className="mt-1.5 font-display italic text-[0.98rem] text-muted">
                  Hosts’ tip: {place.hostTip}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
