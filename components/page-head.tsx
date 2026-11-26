import type { ReactNode } from 'react';
import { StitchedHem } from './art/dividers';
import { HoneysuckleVine } from './art/honeysuckle-vine';

/** Inner page head: left-aligned IM Fell heading over linen-deep band with climbing honeysuckle vine. */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="linen-band relative overflow-hidden">
      <div className="wrap relative py-12 sm:py-16">
        <div className="max-w-2xl pr-8 sm:pr-24">
          <p className="kicker">{eyebrow}</p>
          <h1
            id={id}
            className="mt-3 font-display text-[clamp(2.35rem,5.4vw,3.9rem)] leading-[1.06] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-[1.06rem] leading-relaxed text-muted">
              {children}
            </div>
          ) : null}
        </div>
        <div className="pointer-events-none absolute -top-2 right-0 hidden opacity-90 sm:block no-print">
          <HoneysuckleVine className="h-56 w-28" />
        </div>
      </div>
      <StitchedHem />
    </header>
  );
}
