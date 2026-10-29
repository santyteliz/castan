import { trustPoints } from '../content/site'
import { Icon } from './Icon'
import { useReveal } from './ui'

export function Trust() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="confianza-title" className="relative overflow-hidden bg-navy-deep py-24 text-cream sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-navy/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 size-[28rem] rounded-full bg-navy-soft/15 blur-3xl" />

      <div className="container-page relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow text-peach">Nuestra forma de trabajar</p>
          <h2 id="confianza-title" className="mt-4 text-[2.1rem] leading-[1.08] font-bold text-paper sm:text-5xl">
            Tranquilidad para vos, <em className="text-orange not-italic">cuidado</em> para ellos
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-cream/75">
            Sabemos lo importante que es tu mascota. Por eso cuidamos cada detalle de la atención, desde la primera
            consulta.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] bg-cream/10 sm:grid-cols-2 lg:col-span-7">
          {trustPoints.map((point, i) => (
            <li
              key={point.title}
              className="reveal bg-navy-deep p-7 sm:p-8"
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-cream/8 text-mist ring-1 ring-cream/10">
                <Icon name={point.icon} className="size-[1.35rem]" />
              </span>
              <h3 className="mt-6 text-[1.35rem] font-semibold text-paper">{point.title}</h3>
              <p className="mt-2.5 text-[0.97rem] leading-relaxed text-cream/70">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
