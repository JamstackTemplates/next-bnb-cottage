'use client';

import { useEffect, useState } from 'react';
import type { Room } from '../content/rooms';
import { LinocutIcon } from './art/icons';
import { RoomWindow } from './art/room-window';
import { SiteLink } from './site-link';

type RoomFilterKey = 'sleeps3' | 'dogs' | 'ground';

const FILTERS: { key: RoomFilterKey; label: string }[] = [
  { key: 'sleeps3', label: 'Sleeps 3' },
  { key: 'dogs', label: 'Dog-friendly' },
  { key: 'ground', label: 'Ground floor' },
];

function matchesFilters(room: Room, active: Record<RoomFilterKey, boolean>): boolean {
  if (active.sleeps3 && room.sleeps < 3) return false;
  if (active.dogs && !room.dogFriendly) return false;
  if (active.ground && room.floor !== 'ground') return false;
  return true;
}

export function RoomsExplorer({
  rooms,
  email,
}: {
  rooms: readonly Room[];
  email: string;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState<Record<RoomFilterKey, boolean>>({
    sleeps3: false,
    dogs: false,
    ground: false,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  const anyActive = active.sleeps3 || active.dogs || active.ground;
  const visible = hydrated && anyActive ? rooms.filter((room) => matchesFilters(room, active)) : rooms;

  function toggle(key: RoomFilterKey) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function clear() {
    setActive({ sleeps3: false, dogs: false, ground: false });
  }

  return (
    <div className="wrap py-10 sm:py-14">
      {/* Filter chips only render when JS is active (no-JS shows all rooms cleanly) */}
      {hydrated ? (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 no-print">
          <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter rooms">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="filter-chip"
                aria-pressed={active[f.key]}
                onClick={() => toggle(f.key)}
              >
                {f.label}
              </button>
            ))}
            {anyActive ? (
              <button
                type="button"
                onClick={clear}
                className="ml-1 font-sc text-sm text-primary-ink underline hover:text-ink"
              >
                Clear
              </button>
            ) : null}
          </div>
          <p className="font-sc text-sm tracking-[0.06em] text-muted" role="status" aria-live="polite">
            Showing {visible.length} of {rooms.length} rooms
          </p>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="linocut-frame rounded-ui p-8 text-center">
          <h2 className="font-display text-2xl text-ink">No single room matches all of those</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Our four rooms are each a little different—for instance, the Garden Room is ground floor
            and dog-friendly, while the Orchard Room sleeps three. Write to{' '}
            <a className="text-link" href={`mailto:${email}`}>
              {email}
            </a>{' '}
            and we’ll suggest the best fit.
          </p>
          <button type="button" onClick={clear} className="button button-quiet mt-5">
            Show all four rooms
          </button>
        </div>
      ) : (
        <div className="space-y-16 sm:space-y-20">
          {visible.map((room, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={room.id}
                id={room.id}
                className="casement-trigger grid scroll-mt-8 items-center gap-8 border-b border-line pb-14 last:border-b-0 last:pb-0 lg:grid-cols-12 lg:gap-12"
              >
                {/* Window art (~45% width = 5/12) */}
                <div
                  className={`mx-auto w-full max-w-sm lg:col-span-5 ${
                    reversed ? 'lg:order-2' : ''
                  }`}
                >
                  <RoomWindow roomId={room.id} />
                </div>

                {/* Printed linen label details (7/12) */}
                <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] text-ink">
                      {room.name}
                    </h2>
                    <span className="font-sc text-[1.12rem] tracking-[0.06em] text-primary-ink">
                      From £{room.pricePerNightGBP}/night
                    </span>
                  </div>
                  <p className="mt-2 font-display italic text-[1.12rem] text-muted">
                    {room.outlook}
                  </p>

                  {/* Dotted-leader specification table */}
                  <dl className="mt-6 space-y-2.5 border-y border-line py-4 text-[0.96rem]">
                    <div className="leader-row">
                      <dt className="font-sc text-sm tracking-[0.08em] text-muted">Bed</dt>
                      <span className="leader-dots" aria-hidden="true" />
                      <dd className="text-right text-ink">{room.bed}</dd>
                    </div>
                    <div className="leader-row">
                      <dt className="font-sc text-sm tracking-[0.08em] text-muted">Sleeps</dt>
                      <span className="leader-dots" aria-hidden="true" />
                      <dd className="text-right text-ink">
                        Up to {room.sleeps}
                        {room.extraGuestGBP !== null
                          ? ` (+£${room.extraGuestGBP}/night for 3rd guest)`
                          : ''}
                      </dd>
                    </div>
                    <div className="leader-row">
                      <dt className="font-sc text-sm tracking-[0.08em] text-muted">Size</dt>
                      <span className="leader-dots" aria-hidden="true" />
                      <dd className="text-right text-ink">{room.sizeSqM} m²</dd>
                    </div>
                    <div className="leader-row">
                      <dt className="font-sc text-sm tracking-[0.08em] text-muted">Floor</dt>
                      <span className="leader-dots" aria-hidden="true" />
                      <dd className="text-right text-ink">
                        {room.floor === 'ground' ? 'Ground floor (step-free)' : 'First floor'}
                      </dd>
                    </div>
                    <div className="leader-row">
                      <dt className="font-sc text-sm tracking-[0.08em] text-muted">Weekends</dt>
                      <span className="leader-dots" aria-hidden="true" />
                      <dd className="text-right text-ink">
                        Minimum {room.minNightsWeekend} nights
                      </dd>
                    </div>
                    {room.dogFriendly && room.dogNote ? (
                      <div className="leader-row">
                        <dt className="font-sc text-sm tracking-[0.08em] text-muted">Dogs</dt>
                        <span className="leader-dots" aria-hidden="true" />
                        <dd className="text-right text-ink">{room.dogNote}</dd>
                      </div>
                    ) : null}
                  </dl>

                  {/* Features list with linocut icons */}
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                        <LinocutIcon
                          name={
                            feature.toLowerCase().includes('bath')
                              ? 'bath'
                              : feature.toLowerCase().includes('shower')
                                ? 'shower'
                                : feature.toLowerCase().includes('dog')
                                  ? 'paw'
                                  : feature.toLowerCase().includes('step-free')
                                    ? 'stairs'
                                    : 'bed'
                          }
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary-ink"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enquiry CTA or closed-season notice */}
                  <div className="mt-7">
                    {room.openForEnquiries ? (
                      <SiteLink href="/contact/" className="button">
                        Enquire about the {room.name}
                      </SiteLink>
                    ) : (
                      <p className="inline-block rounded-ui border border-line bg-linen-deep px-4 py-2 font-sc text-sm tracking-[0.06em] text-muted">
                        Not taking enquiries this season
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
