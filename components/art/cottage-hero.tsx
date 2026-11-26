import { asset } from '../../lib/paths';

/**
 * Editorial gouache-and-ink illustration of Honeysuckle Cottage in Bibury:
 * Cotswold honey-stone walls, stone-slate roof with two chimneys, arched ivy-green
 * stable door wreathed in climbing honeysuckle, glowing leaded casements, drystone
 * wall, hens on the flagstone path, old stone dovecote, River Coln and Arlington Row.
 * Crossfades seamlessly between morning light and dusk dark-mode illustrations.
 */
export function CottageHero({ className = 'w-full' }: { className?: string }) {
  return (
    <div className={`hero-illustration relative isolate ${className}`}>
      <img
        src={asset('/hero-light.webp')}
        alt="Editorial gouache and ink illustration of Honeysuckle Cottage in Bibury, showing the 17th-century Cotswold stone walls, stone-slate roof, leaded casement windows, honeysuckle-wreathed green stable door, drystone garden wall, two hens on the flagstone path, stone dovecote and the River Coln with Arlington Row beyond."
        width={1600}
        height={1194}
        fetchPriority="high"
        decoding="async"
        className="hero-img-light block h-auto w-full select-none"
      />
      <img
        src={asset('/hero-dark.webp')}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1194}
        decoding="async"
        className="hero-img-dark pointer-events-none absolute inset-0 block h-full w-full select-none object-cover"
      />
    </div>
  );
}
