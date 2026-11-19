import { reviews, site } from '../content/site'
import { Icon } from './Icon'
import { SectionHeading, trackPointer, useReveal } from './ui'

/** Distribución de puntajes de la ficha de Google (5 a 1 estrellas) */
const breakdown = [
  { stars: 5, count: 105 },
  { stars: 4, count: 16 },
  { stars: 3, count: 4 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
]

function Stars({ className = 'size-4' }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-orange" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={`star-pop ${className}`} fill="currentColor" strokeWidth={0} style={{ ['--i' as string]: i }} />
      ))}
    </span>
  )
}

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export function Reviews() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="opiniones" aria-labelledby="opiniones-title" className="bg-ice py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="opiniones-title"
          eyebrow="Opiniones en Google"
          title="Lo que dicen quienes ya"
          accent="nos conocen"
          text="Reseñas reales de tutores que confiaron en nosotros, tal como las publicaron en Google."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Calificación general */}
          <div className="reveal lg:col-span-4">
            <div className="flex h-full flex-col rounded-[1.75rem] bg-navy-deep p-7 text-paper shadow-lift sm:p-9 lg:sticky lg:top-28 lg:h-auto">
              <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-peach uppercase">Calificación en Google</p>
              <div className="mt-4 flex items-end gap-4">
                <span className="text-[4.5rem] leading-none font-bold tracking-tight">{site.googleRating}</span>
                <div className="pb-2">
                  <Stars className="size-5" />
                  <p className="mt-1.5 text-[0.88rem] text-cream/70">{site.googleReviewCount} reseñas</p>
                </div>
              </div>

              <ul className="mt-8 space-y-2.5" aria-label="Distribución de calificaciones">
                {breakdown.map((b, i) => (
                  <li key={b.stars} className="flex items-center gap-3 text-[0.8rem] text-cream/70">
                    <span className="w-3 tabular-nums">{b.stars}</span>
                    <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="rating-bar absolute inset-y-0 left-0 rounded-full bg-orange"
                        style={{
                          width: `${(b.count / site.googleReviewCount) * 100}%`,
                          ['--reveal-delay' as string]: `${200 + i * 90}ms`,
                        }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums">{b.count}</span>
                  </li>
                ))}
              </ul>

              <a
                href={site.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand mt-9 w-full text-[0.9rem]"
              >
                Ver todas en Google
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </div>
          </div>

          {/* Reseñas */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {reviews.map((review, i) => (
              <li
                key={review.name}
                onPointerMove={trackPointer}
                className="reveal spotlight group flex flex-col rounded-[1.75rem] border border-ink/5 bg-paper p-7 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-orange/30 hover:shadow-lift sm:p-8"
                style={{ ['--reveal-delay' as string]: `${(i % 2) * 110}ms` }}
              >
                <div className="flex items-center justify-between">
                  <Stars />
                  <svg viewBox="0 0 24 24" className="size-8 text-orange/25 transition-colors duration-500 group-hover:text-orange/60" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M9.5 6C6.5 7.3 4.5 10 4.5 13.6V18h5.2v-5.3H7.3c.1-2.1 1.2-3.7 3.2-4.6L9.5 6Zm9 0c-3 1.3-5 4-5 7.6V18h5.2v-5.3h-2.4c.1-2.1 1.2-3.7 3.2-4.6L18.5 6Z"
                    />
                  </svg>
                </div>
                <blockquote className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink">{review.text}</blockquote>
                <div className="mt-7 flex items-center gap-3 border-t border-ink/8 pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-navy-deep text-[0.85rem] font-semibold text-orange transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6">
                    {initials(review.name)}
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-ink">{review.name}</p>
                    <p className="text-[0.8rem] text-ink-soft">Reseña de Google · 5 estrellas</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
