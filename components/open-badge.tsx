'use client';

import { useEffect, useState } from 'react';
import {
  PHONE_LINE_NEUTRAL,
  phoneLineStatus,
  type OpeningHours,
  type PhoneLineStatus,
} from '../lib/hours';
import { site } from '../lib/site';

/**
 * Phone-line availability badge.
 * Renders neutral static copy during SSR / no-JS; computes live status in the
 * configured IANA business time zone (Europe/London) in the browser and refreshes every minute.
 */
export function OpenBadge({
  hours,
  onDark = false,
}: {
  hours: readonly OpeningHours[];
  onDark?: boolean;
}) {
  const [status, setStatus] = useState<PhoneLineStatus>({
    open: null,
    label: PHONE_LINE_NEUTRAL,
  });

  useEffect(() => {
    const update = () => setStatus(phoneLineStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const dotClass =
    status.open === true
      ? 'bg-butter ring-2 ring-butter/40'
      : status.open === false
        ? 'bg-honeysuckle'
        : 'bg-line';

  const pillClass = onDark
    ? 'border-ivy-line bg-ivy-night/70 text-ivy-ink'
    : 'border-line bg-surface text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.84rem] leading-snug ${pillClass}`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{status.label}</span>
    </span>
  );
}
