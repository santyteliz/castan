import { useEffect, useRef } from 'react'
import { generalMessage, site, team, whatsappUrl } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { LogoIllustration, PawOutline, Photo, SplitWords, prefersReducedMotion } from './ui'

/** Parallax liviano: la foto y el sticker se desplazan a distinta velocidad al hacer scroll. */
function useParallax() {
  const photo = useRef<HTMLDivElement>(null)
  const sticker = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    let frame = 0
    const update = () => {
      const y = Math.min(window.scrollY, 900)
      if (photo.current) photo.current.style.transform = `translate3d(0, ${y * 0.06}px, 0) scale(${1 + y * 0.00012})`
      if (sticker.current) sticker.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return { photo, sticker }
}

export function Hero() {
  const { photo, sticker } = useParallax()
  const titleStart = 'Cuidar, recuperar y mejorar'

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-navy-ink via-navy-deep to-navy pt-[4.5rem] text-paper"
    >
      {/* Huellas en contorno y brillo suave, como en la identidad de la marca */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-1/3 size-[40rem] rounded-full bg-orange/10 blur-[120px]" />
      <PawOutline className="pointer-events-none absolute bottom-6 -left-20 w-56 -rotate-12 text-navy/80 lg:bottom-10 lg:-left-16 lg:w-64" />
      <PawOutline className="pointer-events-none absolute -right-16 -bottom-20 w-72 rotate-12 text-navy/70" />

      <div className="container-page relative grid items-center gap-16 pt-10 pb-24 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-28">
        <div className="lg:col-span-6 lg:pr-2">
          <p className="hero-in eyebrow text-peach" style={{ ['--d' as string]: '0ms' }}>
            Cirugía y rehabilitación · {site.city}
          </p>
          <h1
            id="hero-title"
            className="hero-title mt-6 text-[2.55rem] leading-[1.06] font-bold sm:text-6xl lg:text-[4rem]"
          >
            <SplitWords text={titleStart} />
            <SplitWords text="su calidad de vida." offset={titleStart.split(' ').length} className="text-orange" />
          </h1>
          <span
            aria-hidden="true"
            className="hero-in mt-7 block h-1 w-16 rounded-full bg-orange"
            style={{ ['--d' as string]: '520ms' }}
          />
          <p
            className="hero-in mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed font-light text-cream/80 sm:text-lg"
            style={{ ['--d' as string]: '600ms' }}
          >
            Atención veterinaria integral, dedicada y de calidad: cirugía, diagnóstico por imágenes, cardiología y
            rehabilitación para acompañar a cada paciente en su recuperación.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ['--d' as string]: '700ms' }}
          >
            <a href={whatsappUrl(generalMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
              <WhatsAppIcon />
              Consultar por WhatsApp
            </a>
            <a href="#servicios" className="btn btn-ghost-dark group">
              Conocé nuestros servicios
              <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <a
            href="#equipo"
            className="hero-in group mt-10 inline-flex items-center gap-4 rounded-full py-1 pr-4"
            style={{ ['--d' as string]: '800ms' }}
          >
            <span className="flex -space-x-3">
              {team.map((m, i) => (
                <img
                  key={m.photo}
                  src={`/img/equipo/${m.photo}.webp`}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full border-[3px] border-navy-deep object-cover object-top transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 60}ms` }}
                />
              ))}
            </span>
            <span className="text-[0.9rem] leading-snug font-light text-cream/70">
              <span className="block text-[1rem] font-semibold text-paper">Un equipo que te acompaña</span>
              Del diagnóstico a la recuperación
              <Icon
                name="arrowRight"
                className="ml-1.5 inline size-3.5 text-orange transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </a>
        </div>

        {/* Composición: foto en arco + ilustración del logo como sticker */}
        <div className="relative lg:col-span-6">
          <div className="hero-photo relative mx-auto max-w-[32rem] lg:mr-0">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] bg-navy shadow-lift ring-8 ring-white/5">
              <div ref={photo} className="size-full will-change-transform">
                <Photo
                  name="hero"
                  alt="Perro de pelaje rojizo descansando en su cama, en un ambiente luminoso con plantas"
                  sizes="(min-width: 1024px) 32rem, 92vw"
                  priority
                  className="size-full object-cover object-[50%_70%]"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/45 to-transparent" />
            </div>

            <div ref={sticker} className="absolute -right-2 -bottom-10 w-[12rem] will-change-transform sm:-right-8 sm:w-[15rem] lg:-right-12 lg:w-[18rem]">
              <div className="hero-sticker transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-105 hover:rotate-0">
                <LogoIllustration
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 15rem, 12rem"
                  className="h-auto w-full drop-shadow-[0_18px_24px_rgb(10_15_30/0.45)]"
                />
              </div>
            </div>

            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-in absolute top-[14%] -left-1 flex items-center gap-2 rounded-full bg-paper py-2 pr-4 pl-2 text-[0.85rem] font-semibold text-ink shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:-left-6"
              style={{ ['--d' as string]: '900ms' }}
            >
              <span className="relative grid size-8 place-items-center rounded-full bg-whatsapp text-white">
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.4s]" />
                <WhatsAppIcon className="relative size-4" />
              </span>
              Escribinos
            </a>

            <div
              className="hero-in absolute top-[46%] -left-3 hidden sm:-left-10 sm:block"
              style={{ ['--d' as string]: '1000ms' }}
            >
              <div className="animate-float-soft flex items-center gap-2.5 rounded-2xl border border-white/10 bg-navy-deep/80 py-2.5 pr-4 pl-2.5 text-[0.85rem] font-semibold shadow-lift backdrop-blur-md">
                <span className="grid size-9 place-items-center rounded-xl bg-orange/15 text-orange">
                  <Icon name="activity" className="size-[1.1rem]" />
                </span>
                Rehabilitación
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
