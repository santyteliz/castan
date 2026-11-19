import { generalMessage, mapsDirectionsUrl, mapsEmbedUrl, site, whatsappUrl } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { SectionHeading, useReveal } from './ui'

export function Contact() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="contacto" aria-labelledby="contacto-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="contacto-title"
          eyebrow="Ubicación y horarios"
          title="Te esperamos en"
          accent={site.city}
          text="Consultá los horarios de atención y cómo llegar. Ante cualquier duda, escribinos por WhatsApp."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="reveal flex flex-col rounded-[1.75rem] bg-paper p-7 shadow-soft ring-1 ring-ink/5 sm:p-9 lg:col-span-5">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ice text-navy">
                <Icon name="pin" className="size-5" />
              </span>
              <div>
                <h3 className="font-sans text-[0.8rem] font-semibold tracking-wide text-ink-soft uppercase">Dirección</h3>
                <p className="mt-1.5 text-[1.05rem] font-semibold text-ink">
                  {site.address}
                </p>
                <p className="mt-0.5 text-[0.95rem] text-ink-soft">{site.addressNote}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ice text-navy">
                <Icon name="clock" className="size-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-sans text-[0.8rem] font-semibold tracking-wide text-ink-soft uppercase">
                  Horarios de atención
                </h3>
                <dl className="mt-2 divide-y divide-ink/8">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-[0.97rem] text-ink">{h.days}</dt>
                      <dd className="text-[0.92rem] font-semibold text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-peach-soft/70 px-3.5 py-2.5 text-[0.86rem] leading-snug text-orange-ink">
                  <Icon name="info" className="mt-px size-4 shrink-0" />
                  <span>
                    {site.hoursNote} {site.emergencies}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={whatsappUrl(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand flex-1"
              >
                <WhatsAppIcon />
                Escribir por WhatsApp
              </a>
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1">
                <Icon name="navigation" className="size-4" />
                Cómo llegar
              </a>
            </div>
          </div>

          <div className="reveal relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-sand shadow-soft ring-1 ring-ink/5 lg:col-span-7">
            <iframe
              title="Mapa: Veterinaria Castán, Calle 38 N.º 1125, Miramar"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[12%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
