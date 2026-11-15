import { useEffect, useRef } from 'react'
import { process } from '../content/site'
import { Icon } from './Icon'
import { PawOutline, SectionHeading, useReveal } from './ui'

/** La línea vertical se completa con el scroll y cada paso se ilumina al pasar por el centro de la pantalla. */
function useProcessProgress() {
  const list = useRef<HTMLOListElement>(null)
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
      for (const step of steps) step.classList.toggle('is-active', step.getBoundingClientRect().top < mid)
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
  return list
}

export function Process() {
  const ref = useReveal<HTMLElement>()
  const list = useProcessProgress()

  return (
    <section
      ref={ref}
      id="forma-de-trabajar"
      aria-labelledby="proceso-title"
      className="relative overflow-hidden bg-navy-deep py-24 text-cream sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-navy/70 blur-3xl" />
      <PawOutline className="pointer-events-none absolute -bottom-24 -left-24 w-80 -rotate-12 text-navy/60" />

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="proceso-title"
              tone="dark"
              eyebrow="Nuestra forma de trabajar"
              title="Cada paso cuenta."
              accent="Cada paciente importa."
              text="Entendemos que cada paciente es único y que detrás de cada animal hay una familia que busca respuestas, tranquilidad y soluciones. Por eso trabajamos con atención personalizada, evaluación cuidadosa y el tratamiento más adecuado para cada caso."
            />
            <p className="reveal mt-8 max-w-md border-l-2 border-orange/60 pl-5 text-[0.98rem] leading-relaxed text-cream/70">
              Nuestro compromiso es trabajar con responsabilidad, dedicación y criterio profesional, priorizando siempre
              el bienestar de nuestros pacientes.
            </p>
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
            <li key={step.title} className="process-step relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
              <span className="process-dot relative z-10 grid size-[3.25rem] shrink-0 place-items-center rounded-full border border-white/15 bg-navy text-cream">
                <Icon name={step.icon} className="size-5" />
              </span>
              <div className="process-card flex-1 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-peach uppercase">Paso {i + 1}</p>
                <h3 className="mt-2 text-[1.35rem] text-paper sm:text-[1.5rem]">{step.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
