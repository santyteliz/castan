import { useMemo, useState } from 'react'
import { generalMessage, serviceMessage, services, servicesIntro, whatsappUrl, type Service } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { SectionHeading, trackPointer, useReveal } from './ui'

/** Ubicación de cada tarjeta en el bento de escritorio. Las anchas muestran la foto al costado. */
const bento: Record<string, { span: string; wide?: boolean; reverse?: boolean }> = {
  cirugia: { span: 'lg:col-span-7', wide: true },
  imagenes: { span: 'lg:col-span-5' },
  cardiologia: { span: 'lg:col-span-5' },
  rehabilitacion: { span: 'lg:col-span-7', wide: true, reverse: true },
}

/** Trazo de electrocardiograma que se dibuja en loop (tarjeta de cardiología). */
function EcgLine() {
  return (
    <svg viewBox="0 0 400 80" fill="none" aria-hidden="true" className="ecg pointer-events-none absolute inset-x-0 bottom-6 h-20 w-full">
      <path
        d="M0 40h120l10-14 10 14h20l8 30 14-62 12 46 8-14h48l8-10 8 10h124"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const layout = bento[service.id] ?? { span: '' }
  const dark = !service.photo
  return (
    <article
      onPointerMove={trackPointer}
      className={`reveal spotlight group flex flex-col overflow-hidden rounded-[1.75rem] border shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift ${layout.span} ${
        layout.wide ? (layout.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row') : ''
      } ${dark ? 'border-white/10 bg-navy-deep text-paper [--spot:rgb(232_119_46/0.22)]' : 'border-ink/8 bg-paper hover:border-orange/30'}`}
      style={{ ['--reveal-delay' as string]: `${(index % 2) * 110}ms` }}
    >
      {service.photo && (
        <div
          className={`relative overflow-hidden bg-sand ${layout.wide ? 'aspect-[16/10] lg:aspect-auto lg:w-[44%] lg:shrink-0' : 'aspect-[16/9]'}`}
        >
          <img
            src={`/img/${service.photo}.webp`}
            alt={service.photoAlt ?? ''}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
            style={{ objectPosition: service.photoPosition }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-ink/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}

      <div className={`relative flex flex-1 flex-col p-7 sm:p-9 ${dark ? 'pb-28 sm:pb-32' : ''}`}>
        {dark && (
          <span className="text-orange">
            <EcgLine />
          </span>
        )}
        <div className="flex items-start justify-between gap-4">
          <span
            className={`icon-pop grid size-14 place-items-center rounded-2xl shadow-soft transition-colors duration-500 group-hover:bg-orange group-hover:text-navy-ink ${
              dark ? 'bg-white/10 text-orange' : 'bg-navy-deep text-orange'
            }`}
          >
            <Icon name={service.icon} className="size-6" />
          </span>
          <span
            className={`text-[2.6rem] leading-none font-bold tabular-nums transition-colors duration-500 group-hover:text-orange/40 ${
              dark ? 'text-white/10' : 'text-ink/8'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className={`mt-7 text-[1.5rem] leading-tight sm:text-[1.65rem] ${dark ? 'text-paper' : 'text-ink'}`}>
          {service.title}
        </h3>

        <ul className="mt-5 flex-1 space-y-2.5">
          {service.items.map((item, i) => (
            <li
              key={item}
              className={`flex items-center gap-3 text-[0.97rem] transition-transform duration-500 group-hover:translate-x-1 ${
                dark ? 'text-cream/75' : 'text-ink-soft'
              }`}
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full ${
                  dark ? 'bg-orange/20 text-orange' : 'bg-peach-soft text-orange-ink'
                }`}
              >
                <Icon name="check" className="size-3" strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl(serviceMessage(service.messageName))}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn relative mt-8 min-h-11 w-full text-[0.88rem] sm:w-auto sm:self-start ${dark ? 'btn-brand' : 'btn-outline-brand'}`}
          aria-label={`Consultar por WhatsApp sobre ${service.title}`}
        >
          <WhatsAppIcon className="size-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}

const pets = ['perro', 'gato'] as const

function QuickMessage() {
  const [pet, setPet] = useState<(typeof pets)[number]>('perro')
  const [serviceId, setServiceId] = useState(services[0].id)
  const [reason, setReason] = useState('')

  const message = useMemo(() => {
    const service = services.find((s) => s.id === serviceId)
    const motivo = reason.trim() || '[motivo]'
    return `Hola Castán, quisiera consultar por ${service?.messageName ?? 'una consulta'}. Mi mascota es un ${pet} y quería consultar por ${motivo}.`
  }, [pet, serviceId, reason])

  return (
    <div className="reveal mt-16 overflow-hidden rounded-[2rem] bg-navy-deep text-cream shadow-lift sm:mt-20">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 p-7 sm:p-10 lg:p-12">
          <p className="eyebrow text-peach">Consulta rápida</p>
          <h3 className="mt-4 text-[1.9rem] leading-tight text-paper sm:text-[2.3rem]">Armá tu mensaje en segundos</h3>
          <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-cream/75">
            Elegí tu mascota y el servicio. El mensaje llega a WhatsApp ya escrito, listo para enviar.
          </p>

          <fieldset className="mt-8">
            <legend className="text-[0.8rem] font-semibold tracking-wide text-cream/70 uppercase">Tu mascota</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {pets.map((p) => (
                <label key={p} className="cursor-pointer">
                  <input
                    type="radio"
                    name="mascota"
                    value={p}
                    checked={pet === p}
                    onChange={() => setPet(p)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 text-[0.92rem] font-medium capitalize transition duration-300 peer-checked:scale-105 peer-checked:border-orange peer-checked:bg-orange peer-checked:text-navy-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange hover:border-cream/60">
                    {p}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.8rem] font-semibold tracking-wide text-cream/70 uppercase">Servicio</span>
              <span className="relative mt-3 block">
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="min-h-12 w-full appearance-none rounded-xl border border-cream/25 bg-navy-ink/60 px-4 pr-10 text-[0.95rem] text-paper transition outline-none hover:border-cream/50 focus-visible:border-orange"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id} className="text-ink">
                      {s.title}
                    </option>
                  ))}
                </select>
                <Icon
                  name="arrowRight"
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rotate-90 text-cream/70"
                />
              </span>
            </label>
            <label className="block">
              <span className="text-[0.8rem] font-semibold tracking-wide text-cream/70 uppercase">Motivo (opcional)</span>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={140}
                placeholder="Ej.: una evaluación"
                className="mt-3 min-h-12 w-full rounded-xl border border-cream/25 bg-navy-ink/60 px-4 text-[1rem] text-paper transition outline-none placeholder:text-cream/45 hover:border-cream/50 focus-visible:border-orange"
              />
            </label>
          </div>
        </div>

        <div className="relative flex min-w-0 flex-col justify-center gap-6 bg-navy/60 p-7 sm:p-10 lg:p-12">
          <div aria-live="polite" className="rounded-2xl bg-[#e9e4da] p-4 shadow-inner sm:p-5">
            <p className="mb-3 flex items-center gap-2 text-[0.75rem] font-semibold tracking-wide text-ink-soft uppercase">
              <WhatsAppIcon className="size-3.5 text-whatsapp" />
              Vista previa del mensaje
            </p>
            <div
              key={message}
              className="bubble-in ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-[#d9fdd3] px-4 py-3 text-[0.95rem] leading-relaxed text-ink shadow-sm"
            >
              {message}
            </div>
          </div>
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-brand w-full text-center whitespace-normal"
          >
            <WhatsAppIcon />
            Abrir en WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="servicios" aria-labelledby="servicios-title" className="pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="servicios-title"
            eyebrow="Nuestros servicios"
            title="Atención veterinaria"
            accent="especializada"
            text={servicesIntro}
          />
          <a
            href={whatsappUrl(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal btn btn-primary shrink-0 self-start lg:self-end"
          >
            <WhatsAppIcon className="size-4" />
            Hacer una consulta
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <p className="reveal mx-auto mt-14 max-w-3xl text-center text-[1.05rem] leading-relaxed text-ink-soft">
          Trabajamos con un enfoque personalizado, evaluando las necesidades de cada paciente para establecer un plan
          diagnóstico y terapéutico adecuado,{' '}
          <span className="font-semibold text-ink">desde el diagnóstico hasta la recuperación.</span>
        </p>

        <QuickMessage />
      </div>
    </section>
  )
}
