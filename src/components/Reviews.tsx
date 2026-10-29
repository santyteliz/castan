import { mapsSearchUrl, sampleReviews } from '../content/site'
import { Icon } from './Icon'
import { DemoNote, Editable, SectionHeading, useReveal } from './ui'

function Stars({ className = 'size-4' }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-orange" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={className} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  )
}

export function Reviews() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="opiniones" aria-labelledby="opiniones-title" className="bg-ice py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="opiniones-title"
              eyebrow="Opiniones"
              title={
                <>
                  Lo que dicen quienes ya <em className="text-orange-ink not-italic">nos conocen</em>
                </>
              }
              text="Las reseñas que los clientes dejaron en Google, a la vista de todos."
            />
          </div>

          <div className="reveal flex flex-col gap-4 rounded-[1.5rem] bg-paper p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between lg:col-span-5">
            <div>
              <p className="text-[0.8rem] font-semibold tracking-wide text-ink-soft uppercase">Calificación en Google</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-4xl text-ink">
                  <Editable>[Puntaje]</Editable>
                </span>
                <div>
                  <Stars />
                  <p className="mt-1 text-[0.85rem] text-ink-soft">
                    <Editable>[Cantidad]</Editable> reseñas
                  </p>
                </div>
              </div>
            </div>
            <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11 text-[0.9rem]">
              Ver en Google
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {sampleReviews.map((review, i) => (
            <li
              key={review.initials}
              className="reveal flex flex-col rounded-[1.75rem] bg-paper p-7 shadow-soft ring-1 ring-ink/5 sm:p-8"
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <Stars />
                <span className="rounded-full bg-peach-soft px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-orange-ink uppercase">
                  Muestra
                </span>
              </div>
              <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink">
                “{review.text}”
              </blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-ink/8 pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-mist font-semibold text-navy-deep">
                  {review.initials}
                </span>
                <div>
                  <p className="text-[0.95rem] font-semibold text-ink">
                    <Editable>[Nombre del cliente]</Editable>
                  </p>
                  <p className="text-[0.82rem] text-ink-soft">Reseña de Google</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal mt-8">
          <DemoNote>
            Diseño de muestra: los textos no son reseñas reales. Se reemplazan por las opiniones publicadas en la ficha de
            Google de Castán.
          </DemoNote>
        </div>
      </div>
    </section>
  )
}
