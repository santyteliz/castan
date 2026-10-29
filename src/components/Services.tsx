import { useMemo, useState } from 'react'
import { generalMessage, serviceMessage, services, whatsappUrl, type Service } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { DemoNote, Photo, SectionHeading, useReveal } from './ui'

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      className="reveal group flex flex-col overflow-hidden rounded-[1.75rem] bg-paper shadow-soft ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1 hover:shadow-lift"
      style={{ ['--reveal-delay' as string]: `${(index % 3) * 90}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <Photo
          name={service.image}
          alt={service.imageAlt}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="relative flex flex-1 flex-col px-6 pt-9 pb-6 sm:px-7">
        <span className="absolute -top-6 left-6 grid size-12 place-items-center rounded-2xl bg-navy text-paper shadow-soft sm:left-7">
          <Icon name={service.icon} className="size-[1.35rem]" />
        </span>
        <h3 className="text-[1.45rem] leading-tight font-semibold text-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">{service.description}</p>
        <a
          href={whatsappUrl(serviceMessage(service.messageName))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-brand mt-6 min-h-11 w-full text-[0.88rem]"
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
    return `Hola Castán, quisiera consultar por el servicio de ${service?.messageName ?? 'consultas'}. Mi mascota es un ${pet} y quería consultar por ${motivo}.`
  }, [pet, serviceId, reason])

  return (
    <div className="reveal mt-16 overflow-hidden rounded-[2rem] bg-navy text-cream shadow-lift sm:mt-20">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 p-7 sm:p-10 lg:p-12">
          <p className="eyebrow text-peach before:bg-orange">Consulta rápida</p>
          <h3 className="mt-4 text-[1.9rem] leading-tight font-bold text-paper sm:text-[2.3rem]">
            Armá tu mensaje en segundos
          </h3>
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
                  <span className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 text-[0.92rem] font-medium capitalize transition peer-checked:border-paper peer-checked:bg-paper peer-checked:text-navy-deep peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paper hover:border-cream/60">
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
                  className="min-h-12 w-full appearance-none rounded-xl border border-cream/25 bg-navy-deep/50 px-4 pr-10 text-[0.95rem] text-paper transition outline-none hover:border-cream/50 focus-visible:border-paper"
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
                placeholder="Ej.: un control anual"
                className="mt-3 min-h-12 w-full rounded-xl border border-cream/25 bg-navy-deep/50 px-4 text-[1rem] text-paper transition outline-none placeholder:text-cream/45 hover:border-cream/50 focus-visible:border-paper"
              />
            </label>
          </div>
        </div>

        <div className="relative flex min-w-0 flex-col justify-center gap-6 bg-navy-deep/60 p-7 sm:p-10 lg:p-12">
          <div aria-live="polite" className="rounded-2xl bg-[#e9e4da] p-4 shadow-inner sm:p-5">
            <p className="mb-3 flex items-center gap-2 text-[0.75rem] font-semibold tracking-wide text-ink-soft uppercase">
              <WhatsAppIcon className="size-3.5 text-whatsapp" />
              Vista previa del mensaje
            </p>
            <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-[#d9fdd3] px-4 py-3 text-[0.95rem] leading-relaxed text-ink shadow-sm">
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
    <section ref={ref} id="servicios" aria-labelledby="servicios-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="servicios-title"
            eyebrow="Servicios"
            title={
              <>
                Todo lo que tu mascota necesita, <em className="text-orange-ink not-italic">en un solo lugar</em>
              </>
            }
            text="Elegí el servicio y escribinos por WhatsApp: el mensaje llega con el motivo de la consulta ya escrito."
          />
          <div className="reveal lg:max-w-xs">
            <DemoNote>Servicios de ejemplo. La lista final se confirma con la veterinaria.</DemoNote>
          </div>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}

          <article
            className="reveal flex flex-col justify-between rounded-[1.75rem] border border-dashed border-navy/25 bg-ice p-7 sm:p-8"
            style={{ ['--reveal-delay' as string]: '180ms' }}
          >
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-paper text-navy shadow-soft">
                <Icon name="chat" className="size-[1.35rem]" />
              </span>
              <h3 className="mt-6 text-[1.45rem] leading-tight font-semibold text-ink">¿Tenés otra consulta?</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">
                Si no encontrás lo que buscás, escribinos y contanos qué necesita tu mascota.
              </p>
            </div>
            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8 w-full"
            >
              <WhatsAppIcon className="size-4" />
              Escribir por WhatsApp
            </a>
          </article>
        </div>

        <QuickMessage />
      </div>
    </section>
  )
}
