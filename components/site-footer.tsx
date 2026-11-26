import { business } from '../content/business';
import { StoneCourse } from './art/dividers';
import { FlowerMark } from './art/honeysuckle-vine';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const FOOTER_LINKS = [
  { href: '/rooms/', label: 'Rooms' },
  { href: '/breakfast/', label: 'Breakfast' },
  { href: '/local-guide/', label: 'Local guide' },
  { href: '/house-rules/', label: 'House rules' },
  { href: '/contact/', label: 'Enquire' },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16">
      <StoneCourse className="h-7 w-full" />
      <div className="bg-ivy-night text-ivy-ink">
        <div className="wrap grid gap-10 py-14 md:grid-cols-3">
          {/* Column 1: Address & directions */}
          <div>
            <div className="flex items-center gap-3">
              <FlowerMark className="h-8 w-8 shrink-0" />
              <p className="font-display text-2xl text-ivy-ink">{business.name}</p>
            </div>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ivy-muted">
              {business.address.formatted}
            </address>
            <p className="mt-3 text-sm leading-relaxed text-ivy-muted">
              Two minutes’ walk upstream from Arlington Row beside the River Coln.
            </p>
            <p className="mt-4 flex flex-col gap-1 text-sm">
              <a
                className="text-ivy-butter underline decoration-ivy-butter/50 hover:decoration-ivy-butter"
                href={`mailto:${business.email}`}
              >
                {business.email}
              </a>
              <a
                className="text-ivy-ink hover:text-ivy-butter"
                href={`tel:${business.phoneSchema.replace(/[^\d+]/g, '')}`}
              >
                {business.phone}
              </a>
            </p>
          </div>

          {/* Column 2: Times & phone-line badge */}
          <div>
            <h2 className="font-sc text-sm tracking-[0.14em] text-ivy-butter">
              Cottage times
            </h2>
            <dl className="mt-4 space-y-2 text-sm text-ivy-muted">
              <div className="flex justify-between gap-4 border-b border-ivy-line pb-1.5">
                <dt>Check-in</dt>
                <dd className="text-ivy-ink">
                  {business.times.checkIn}–{business.times.checkInEnd}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-ivy-line pb-1.5">
                <dt>Check-out</dt>
                <dd className="text-ivy-ink">By {business.times.checkOut}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-ivy-line pb-1.5">
                <dt>Breakfast</dt>
                <dd className="text-ivy-ink">
                  {business.times.breakfastWeekday} (wknd {business.times.breakfastWeekend})
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ivy-muted">{business.times.closedNote}</p>
            <div className="mt-4">
              <OpenBadge hours={business.phoneHours} onDark />
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h2 className="font-sc text-sm tracking-[0.14em] text-ivy-butter">
              Around the cottage
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    className="font-sc tracking-[0.06em] text-ivy-ink hover:text-ivy-butter"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ivy-muted">
              Enquiries are answered by email from {business.hosts}. No payment is taken on this website.
            </p>
          </div>
        </div>

        <div className="border-t border-ivy-line">
          <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-xs text-ivy-muted">
            <p>
              {business.name} · Bibury, Gloucestershire
            </p>
            <span title="Made with love by jamstacks.net">
              with{' '}
              <span role="img" aria-label="love">
                ❤️
              </span>{' '}
              <a
                className="text-ivy-ink no-underline hover:text-ivy-butter hover:underline"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
