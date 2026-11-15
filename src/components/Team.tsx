import { DEMO_MODE, team, type TeamMember } from '../content/site'
import { Icon } from './Icon'
import { DemoNote, SectionHeading, useReveal, useTilt } from './ui'

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const tilt = useTilt<HTMLElement>(4)
  return (
    <li className="reveal" style={{ ['--reveal-delay' as string]: `${index * 120}ms` }}>
      <article
        ref={tilt}
        className="group relative h-full overflow-hidden rounded-[1.75rem] bg-navy-deep text-paper shadow-soft transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:shadow-lift"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={`/img/equipo/${member.photo}.webp`}
            alt={member.photoAlt}
            loading="lazy"
            className="size-full object-cover object-top transition duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/20 to-transparent" />

          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.75rem] font-semibold text-ink shadow-soft backdrop-blur">
            <Icon name="badge" className="size-3.5 text-orange-ink" />
            {member.license}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="text-[0.75rem] font-semibold tracking-[0.18em] text-peach uppercase">
              {member.role}
              {member.roleToConfirm && DEMO_MODE && <span className="text-cream/50 normal-case"> · a confirmar</span>}
            </p>
            <h3 className="mt-2 text-[1.55rem] leading-tight">{member.name}</h3>
            <span
              aria-hidden="true"
              className="mt-4 block h-1 w-10 rounded-full bg-orange transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:w-24"
            />
          </div>
        </div>
      </article>
    </li>
  )
}

export function Team() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="equipo" aria-labelledby="equipo-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="equipo-title"
            eyebrow="El equipo"
            title="Las personas que"
            accent="cuidan de tu mascota"
            text="Profesionales matriculados que acompañan cada etapa, desde el diagnóstico hasta la recuperación."
          />
          <div className="reveal lg:max-w-xs">
            <DemoNote>Falta confirmar la especialidad de Diego y de Gabriela.</DemoNote>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
