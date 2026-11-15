import { Icon } from './Icon'
import { SectionHeading, useReveal } from './ui'

const values = [
  { icon: 'search', label: 'Conocimiento' },
  { icon: 'heart', label: 'Compromiso' },
  { icon: 'paw', label: 'Vocación' },
] as const

export function About() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="nosotros" aria-labelledby="nosotros-title" className="overflow-hidden bg-paper pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        {/* Collage con fotos reales del equipo trabajando */}
        <div className="reveal relative order-2 lg:order-1 lg:col-span-5">
          <div className="group relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem] bg-sand shadow-lift">
            <img
              src="/img/equipo/diego-ozan.webp"
              alt="Diego Alejandro Ozan en el quirófano"
              loading="lazy"
              width={674}
              height={842}
              className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105"
            />
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur">
              <Icon name="scalpel" className="size-3.5 text-orange-ink" />
              Cirugía
            </span>
          </div>
          <div className="group absolute -bottom-10 left-0 aspect-[16/10] w-[62%] overflow-hidden rounded-[1.5rem] border-[6px] border-paper bg-sand shadow-lift">
            <img
              src="/img/equipo/luis-vaudana-ecografia.webp"
              alt="Luis Vaudaña realizando una ecografía a un perro"
              loading="lazy"
              width={736}
              height={460}
              className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur">
              <Icon name="scan" className="size-3.5 text-orange-ink" />
              Ecografía
            </span>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading
            id="nosotros-title"
            eyebrow="Bienvenidos"
            title="Cirugía y rehabilitación"
            accent="veterinaria"
          />
          <div className="reveal mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Creemos que cada animal merece una atención integral, dedicada y de calidad. Nuestro objetivo es brindar
              soluciones profesionales para cuidar la salud de nuestros pacientes, acompañándolos en cada etapa de su
              recuperación.
            </p>
            <p>
              Ofrecemos servicios de cirugía veterinaria y rehabilitación, combinando conocimiento, compromiso y vocación
              para mejorar la calidad de vida de nuestros compañeros de cuatro patas.
            </p>
          </div>

          <blockquote className="reveal relative mt-9 rounded-2xl border-l-4 border-orange bg-cream py-5 pr-6 pl-6 text-[1.1rem] leading-relaxed font-medium text-ink">
            Porque detrás de cada paciente hay una familia que espera verlo bien, caminar, jugar y disfrutar nuevamente.
          </blockquote>

          <ul className="reveal mt-8 flex flex-wrap gap-3">
            {values.map((v, i) => (
              <li
                key={v.label}
                className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-navy/10 bg-ice px-4 py-2.5 text-[0.92rem] font-semibold text-navy-deep transition duration-300 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-peach-soft"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <Icon name={v.icon} className="icon-pop size-4 text-orange-ink" />
                {v.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
