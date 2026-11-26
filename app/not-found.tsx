import { LostInTheHedge } from '../components/art/lost-in-the-hedge';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-16 text-center sm:py-20">
      <LostInTheHedge />
      <p className="kicker mt-6">404 · Off the footpath</p>
      <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.4rem)] text-ink">
        This path leads into the hedge.
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        We couldn’t find that page—try heading back to the cottage door or looking at the four
        rooms.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <SiteLink href="/" className="button">
          ← Back to the cottage
        </SiteLink>
        <SiteLink href="/rooms/" className="button button-quiet">
          See the rooms →
        </SiteLink>
      </div>
    </section>
  );
}
