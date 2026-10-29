import { useEffect, useState } from 'react'
import { generalMessage, nav, site, whatsappUrl } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { Editable, Logo, Photo, useReveal } from './ui'

export function FinalCta() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="cta-final" aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep sm:rounded-[2.5rem]">
        <Photo
          name="cta"
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover object-[65%_45%] opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/30 md:bg-gradient-to-r md:from-navy-deep md:via-navy-deep/75 md:to-navy-deep/10"
        />

        <div className="container-page py-20 sm:py-28 lg:py-32">
          <div className="reveal max-w-2xl">
            <p className="eyebrow text-peach">Estamos para vos</p>
            <h2 id="cta-title" className="mt-5 text-[2.3rem] leading-[1.06] font-bold text-paper sm:text-[3.5rem]">
              Estamos para acompañarte en el cuidado de tu <em className="text-orange not-italic">mascota</em>.
            </h2>
            <p className="mt-6 text-lg text-cream/80">Escribinos y contanos cómo podemos ayudarte.</p>
            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand mt-10 min-h-14 px-8 text-base"
            >
              <WhatsAppIcon />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="pie" className="pt-16 pb-28 sm:pb-12">
      <div className="container-page">
        <div className="grid gap-12 border-b border-ink/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo surface="light" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
              Atención veterinaria con compromiso, dedicación y cariño en {site.city}, {site.region}.
            </p>
          </div>

          <nav aria-label="Secundaria" className="md:col-span-3">
            <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.18em] text-ink uppercase">Navegación</h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 md:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.95rem] text-ink-soft transition-colors hover:text-navy">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.18em] text-ink uppercase">Contacto</h2>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-soft">
              <li>
                <a
                  href={whatsappUrl(generalMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-navy"
                >
                  <WhatsAppIcon className="size-4 text-whatsapp" />
                  {site.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-navy" />
                <span>
                  <Editable>{site.address}</Editable>, {site.addressNote}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="chat" className="mt-0.5 size-4 shrink-0 text-navy" />
                <Editable>{site.email}</Editable>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[0.82rem] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veterinaria Castán. Todos los derechos reservados.</p>
          <p className="text-ink-soft/80">Diseño web por Web Wisse</p>
        </div>
      </div>
    </footer>
  )
}

/** Botón flotante: aparece después del hero y se oculta en el cierre para no tapar contenido. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const end = document.getElementById('cta-final')
    if (!hero || !end) return
    let heroVisible = true
    let endVisible = false
    const update = () => setVisible(!heroVisible && !endVisible)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting
        if (e.target === end) endVisible = e.isIntersecting
      }
      update()
    })
    io.observe(hero)
    io.observe(end)
    return () => io.disconnect()
  }, [])

  return (
    <a
      href={whatsappUrl(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-lift transition-all duration-500 hover:bg-whatsapp-deep sm:right-6 sm:bottom-6 sm:py-3.5 sm:pr-5 sm:pl-4 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden text-[0.92rem] font-semibold sm:inline">Consultar</span>
    </a>
  )
}
