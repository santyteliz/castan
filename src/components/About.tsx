import { team } from '../content/site'
import { Icon } from './Icon'
import { DemoNote, Editable, Photo, SectionHeading, useReveal } from './ui'

const values = [
  { icon: 'heart', label: 'Cercanía' },
  { icon: 'leaf', label: 'Responsabilidad' },
  { icon: 'paw', label: 'Cariño' },
] as const

export function About() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="nosotros" aria-labelledby="nosotros-title" className="bg-paper py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="reveal relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
            <Photo
              name="tutora-gato"
              alt="Tutora acariciando a su gato junto a una ventana luminosa"
              sizes="(min-width: 1024px) 30rem, 92vw"
              className="size-full object-cover object-[40%_50%]"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 hidden max-w-[15rem] rounded-2xl bg-navy p-5 text-cream shadow-lift sm:block lg:-right-10">
            <p className="text-[1.3rem] leading-snug">“Parte de tu familia, también de la nuestra.”</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            id="nosotros-title"
            eyebrow="Nosotros"
            title={
              <>
                Una atención <em className="text-orange-ink not-italic">cercana</em>, como la que ellos merecen
              </>
            }
          />
          <div className="reveal mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Cada mascota merece una atención cercana, responsable y llena de cariño. En Castán trabajamos para
              acompañarte en el cuidado de quienes forman parte de tu familia.
            </p>
            <p>
              <Editable>[Completar con la historia de la veterinaria: cómo nació, quiénes la llevan adelante y qué la hace distinta.]</Editable>
            </p>
          </div>

          <ul className="reveal mt-9 flex flex-wrap gap-3">
            {values.map((v) => (
              <li
                key={v.label}
                className="inline-flex items-center gap-2.5 rounded-full bg-ice px-4 py-2.5 text-[0.92rem] font-semibold text-navy-deep"
              >
                <Icon name={v.icon} className="size-4 text-navy" />
                {v.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Equipo */}
      <div id="equipo" className="container-page mt-28 sm:mt-36">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="El equipo"
            title={
              <>
                Las personas que <em className="text-orange-ink not-italic">cuidan</em> de tu mascota
              </>
            }
            text="Conocé a quienes te van a atender: su formación, su experiencia y su forma de trabajar."
          />
          <div className="reveal lg:max-w-xs">
            <DemoNote>Perfiles provisionales: se completan con fotos y datos reales del equipo.</DemoNote>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <li
              key={i}
              className="reveal group overflow-hidden rounded-[1.75rem] bg-cream ring-1 ring-ink/5"
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              <div className="relative grid aspect-[4/3.6] place-items-center overflow-hidden bg-gradient-to-br from-mist via-ice to-cream">
                <div aria-hidden="true" className="absolute -bottom-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-paper/50" />
                <div className="relative flex flex-col items-center gap-3 text-navy/70">
                  <span className="grid size-20 place-items-center rounded-full border border-navy/15 bg-paper/70">
                    <Icon name="user" className="size-9" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-wide uppercase">
                    <Icon name="camera" className="size-4" />
                    Foto del profesional
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-[1.35rem] font-semibold text-ink">
                  <Editable>[Nombre y apellido]</Editable>
                </h3>
                <p className="mt-2 text-[0.92rem] font-semibold text-navy">
                  <Editable>{member.role}</Editable>
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  <Editable>[Breve presentación: formación, experiencia y forma de trabajar.]</Editable>
                </p>
                <p className="mt-4 border-t border-ink/8 pt-4 text-[0.85rem] text-ink-soft">
                  Matrícula: <Editable>[Completar]</Editable>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
