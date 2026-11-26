import type { BreakfastSection } from '../content/breakfast';
import { MenuCardVignette } from './art/breakfast-art';
import { DietaryRoundel } from './art/icons';

/** Single tall printed breakfast menu card with carved border and dotted leaders. */
export function BreakfastMenuCard({
  sections,
}: {
  sections: readonly BreakfastSection[];
}) {
  return (
    <section
      aria-label="Breakfast menu"
      className="linocut-frame mx-auto max-w-3xl rounded-ui p-4 sm:p-7"
    >
      <div className="stitched-border px-5 py-8 sm:px-10 sm:py-11">
        <MenuCardVignette />
        <p className="mt-2 text-center font-sc text-xs tracking-[0.18em] text-muted">
          HONEYSUCKLE COTTAGE · BIBURY
        </p>
        <h2 className="mt-1 text-center font-display text-[clamp(2rem,4vw,2.75rem)] text-ink">
          Morning Menu
        </h2>
        <p className="mt-1 text-center font-hand text-2xl text-primary-ink">
          Order the night before on the slip in your room
        </p>

        <div className="mt-9 space-y-10">
          {sections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <h3 className="font-sc text-lg tracking-[0.14em] text-primary-ink">
                  {section.title}
                </h3>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>

              <ul className="mt-5 space-y-5">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className={item.available ? '' : 'opacity-65'}
                  >
                    <div className="leader-row flex-wrap sm:flex-nowrap">
                      <span
                        className={`font-display text-[1.22rem] text-ink ${
                          item.available ? '' : 'line-through decoration-muted'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="leader-dots hidden sm:inline-block" aria-hidden="true" />
                      <span className="font-sc text-sm tracking-[0.06em] text-primary-ink">
                        {!item.available
                          ? 'Not today'
                          : item.supplementGBP > 0
                            ? `+£${item.supplementGBP}`
                            : 'Included'}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span>{item.description}</span>
                      {item.seasonal ? (
                        <span className="font-display italic text-ink/80">
                          ({item.seasonal})
                        </span>
                      ) : null}
                      {item.dietary.length > 0 ? (
                        <span className="inline-flex items-center gap-1">
                          {item.dietary.map((tag) => (
                            <DietaryRoundel key={tag} tag={tag} />
                          ))}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-line pt-4 text-center font-sc text-xs tracking-[0.12em] text-muted">
          V Vegetarian · VG Vegan · GF* Gluten-free option available
        </p>
      </div>
    </section>
  );
}
