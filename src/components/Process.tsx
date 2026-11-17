import { useEffect, useRef, useState } from 'react'
import { process, type Media } from '../content/site'
import { Icon } from './Icon'
import { AutoVideo, PawOutline, SectionHeading, useReveal } from './ui'

/**
 * La línea vertical se completa con el scroll, cada paso se ilumina al pasar por el centro de la pantalla
 * y devuelve el índice del paso activo para cambiar la foto del panel.
 */
function useProcessProgress() {
  const list = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const el = list.current
    if (!el) return
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.process-step'))
    let frame = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.6
      const progress = Math.min(1, Math.max(0, (mid - r.top) / r.height))
      el.style.setProperty('--progress', progress.toFixed(3))
      let current = 0
      steps.forEach((step, i) => {
        const on = step.getBoundingClientRect().top < mid
        step.classList.toggle('is-active', on)
        if (on) current = i
      })
      setActive(current)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return { list, active }
}

function MediaView({ media, className }: { media: Media; className: string }) {
  return media.type === 'video' ? (
    <AutoVideo src={media.src} label={media.alt} className={className} />
  ) : (
    <img src={`${media.src}.webp`} alt={media.alt} loading="lazy" className={className} />
  )
}

export function Process() {
  const ref = useReveal<HTMLElement>()
  const { list, active } = useProcessProgress()

  return (
    <section
      ref={ref}
      id="forma-de-trabajar"
      aria-labelledby="proceso-title"
      className="relative overflow-clip bg-navy-deep py-24 text-cream sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-navy/70 blur-3xl" />
      <PawOutline className="pointer-events-none absolute -bottom-24 -left-24 w-80 -rotate-12 text-navy/60" />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="proceso-title"
              tone="dark"
              eyebrow="Nuestra forma de trabajar"
              title="Cada paso cuenta."
              accent="Cada paciente importa."
              text="Entendemos que cada paciente es único y que detrás de cada animal hay una familia que busca respuestas, tranquilidad y soluciones."
            />
          </div>
          <p className="reveal max-w-md border-l-2 border-orange/60 pl-5 text-[0.98rem] leading-relaxed text-cream/70 lg:col-span-5">
            Trabajamos con atención personalizada, evaluación cuidadosa y el tratamiento más adecuado para cada caso,
            con responsabilidad, dedicación y criterio profesional.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Panel fijo: la imagen cambia según el paso que se está leyendo */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <figure className="relative aspect-[4/5] max-h-[68vh] w-full overflow-hidden rounded-[2rem] bg-navy-ink shadow-lift ring-1 ring-white/10">
                {process.map((step, i) => (
                  <MediaView
                    key={step.title}
                    media={step.media}
                    className={`process-media absolute inset-0 size-full object-cover ${i === active ? 'is-current' : ''}`}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-ink/90 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <span key={active} className="caption-in text-[0.95rem] font-medium text-paper">
                    {process[active].media.caption}
                  </span>
                  <span className="shrink-0 text-[0.8rem] font-semibold text-orange tabular-nums">
                    0{active + 1} / 0{process.length}
                  </span>
                </figcaption>
                {/* Indicador de pasos */}
                <div className="absolute top-5 left-6 flex gap-1.5" aria-hidden="true">
                  {process.map((step, i) => (
                    <span
                      key={step.title}
                      className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-orange' : 'w-3 bg-white/35'}`}
                    />
                  ))}
                </div>
              </figure>
            </div>
          </div>

          <ol ref={list} className="relative lg:col-span-7">
            {/* Línea de progreso */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.6rem] w-0.5 rounded-full bg-white/10" />
            <span
              aria-hidden="true"
              className="process-line absolute top-2 bottom-2 left-[1.6rem] w-0.5 rounded-full bg-gradient-to-b from-orange to-peach"
            />

            {process.map((step, i) => (
              <li key={step.title} className="process-step relative flex gap-5 pb-10 last:pb-0 sm:gap-8 lg:min-h-[44vh] lg:last:min-h-0">
                <span className="process-dot relative z-10 grid size-[3.25rem] shrink-0 place-items-center rounded-full border border-white/15 bg-navy text-cream">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <div className="process-card h-fit flex-1 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                  {/* En celular la imagen va dentro de cada paso */}
                  <div className="relative aspect-[16/10] overflow-hidden lg:hidden">
                    <MediaView media={step.media} className="size-full object-cover" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-peach uppercase">Paso {i + 1}</p>
                    <h3 className="mt-2 text-[1.35rem] text-paper sm:text-[1.5rem]">{step.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/70">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
