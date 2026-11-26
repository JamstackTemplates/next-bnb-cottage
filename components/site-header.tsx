import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { FlowerMark } from './art/honeysuckle-vine';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/rooms/', label: 'Rooms' },
  { href: '/breakfast/', label: 'Breakfast' },
  { href: '/local-guide/', label: 'Local guide' },
  { href: '/house-rules/', label: 'House rules' },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-30 border-b-2 border-ink bg-linen">
      <div className="wrap flex min-h-20 items-center justify-between gap-3 py-3">
        <SiteLink
          href="/"
          className="group flex items-center gap-3 no-underline hover:no-underline"
        >
          <FlowerMark className="h-10 w-10 shrink-0 transition-transform duration-200 group-hover:rotate-6" />
          <span className="flex flex-col">
            <span className="font-display text-[1.4rem] leading-none text-ink sm:text-[1.65rem]">
              {business.shortName}
            </span>
            <span className="mt-0.5 font-sc text-[0.78rem] tracking-[0.14em] text-muted">
              {business.placeLine}
            </span>
          </span>
        </SiteLink>

        {/* Desktop navigation */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-5 lg:flex"
        >
          {NAV_LINKS.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              className="font-sc text-[0.98rem] tracking-[0.06em] text-ink hover:text-primary-ink"
            >
              {item.label}
            </SiteLink>
          ))}
          <SiteLink
            href="/contact/"
            markCurrent="page"
            className="button px-4 py-2 text-[0.95rem]"
          >
            Enquire
          </SiteLink>
          <div className="no-print">
            <DarkModeToggle />
          </div>
        </nav>

        {/* Mobile disclosure menu (works with or without JS) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="no-print">
            <DarkModeToggle />
          </div>
          <details className="relative">
            <summary className="list-none cursor-pointer rounded-ui border-2 border-ink bg-surface px-3.5 py-2 font-sc text-[0.95rem] tracking-[0.08em] text-ink shadow-[2px_2px_0_var(--ink)] select-none hover:bg-linen-deep [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-60 rounded-ui border-2 border-ink bg-surface p-4 shadow-[4px_4px_0_var(--ink)]"
            >
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      markCurrent="page"
                      className="block py-1 font-sc text-[1.02rem] tracking-[0.06em] text-ink"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
                <li className="mt-1 border-t border-line pt-3">
                  <SiteLink
                    href="/contact/"
                    markCurrent="page"
                    className="button w-full text-center"
                  >
                    Enquire
                  </SiteLink>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>

      {/* Carved linocut bottom edge */}
      <div
        aria-hidden="true"
        className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,var(--ink)_0_18px,transparent_18px_22px,var(--stone)_22px_36px,transparent_36px_40px)] opacity-35 no-print"
      />
    </header>
  );
}
