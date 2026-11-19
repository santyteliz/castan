import { useEffect, useRef, useState } from 'react'
import { generalMessage, nav, whatsappUrl } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { Logo } from './ui'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')
  const progress = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      setScrolled(window.scrollY > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current?.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Resalta en el menú la sección que se está viendo
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    // Solo bloquea el scroll mientras el menú está abierto (no pisa el bloqueo de la animación de entrada)
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'bg-navy-deep/92 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#inicio" className="rounded-lg" aria-label="Veterinaria Castán, ir al inicio">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? 'true' : undefined}
                    className="group/nav relative block rounded-full px-3 py-2 text-[0.86rem] font-medium text-cream/70 transition-colors hover:text-paper aria-[current]:text-paper xl:px-4"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-orange transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/nav:scale-x-100 group-aria-[current]/nav:scale-x-100 xl:inset-x-4"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand hidden min-h-11 px-5 text-[0.88rem] sm:inline-flex"
            >
              <WhatsAppIcon className="size-[1.05rem]" />
              <span className="lg:hidden xl:inline">Consultar por WhatsApp</span>
              <span className="hidden lg:inline xl:hidden">WhatsApp</span>
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-paper transition hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} className="size-5" />
            </button>
          </div>
        </div>
        {/* Progreso de lectura */}
        <span ref={progress} aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-orange" />

      </header>

      {/* Menú móvil: fuera del header, porque su backdrop-filter rompería el position: fixed */}
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-navy-deep transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Menú móvil" className="container-page flex h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-white/10 transition duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-[1.6rem] font-semibold tracking-tight text-paper"
                >
                  {item.label}
                  <Icon name="arrowRight" className="size-5 text-orange" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-brand mt-auto w-full"
          >
            <WhatsAppIcon />
            Consultar por WhatsApp
          </a>
        </nav>
      </div>
    </>
  )
}
