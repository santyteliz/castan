import { generalMessage, site, whatsappUrl } from '../content/site'
import { Icon, WhatsAppIcon } from './Icon'
import { LogoIllustration, PawOutline, Photo } from './ui'

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-navy-ink via-navy-deep to-navy pt-[4.5rem] text-paper"
    >
      {/* Huellas en contorno, como en la identidad de la marca */}
      <PawOutline className="pointer-events-none absolute bottom-6 -left-20 w-56 -rotate-12 text-navy/80 lg:bottom-10 lg:-left-16 lg:w-64" />
      <PawOutline className="pointer-events-none absolute -right-16 -bottom-20 w-72 rotate-12 text-navy/70" />

      <div className="container-page relative grid items-center gap-14 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-28">
        <div className="lg:col-span-6 lg:pr-4">
          <p className="hero-in eyebrow text-peach" style={{ ['--d' as string]: '0ms' }}>
            Veterinaria en {site.city}
          </p>
          <h1
            id="hero-title"
            className="hero-in mt-6 text-[2.6rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.1rem]"
            style={{ ['--d' as string]: '80ms' }}
          >
            Su bienestar es <span className="text-orange">nuestra prioridad.</span>
          </h1>
          <span aria-hidden="true" className="hero-in mt-7 block h-1 w-16 rounded-full bg-orange" style={{ ['--d' as string]: '120ms' }} />
          <p
            className="hero-in mt-7 max-w-[33rem] text-[1.05rem] leading-relaxed font-light text-cream/80 sm:text-lg"
            style={{ ['--d' as string]: '160ms' }}
          >
            Atención veterinaria con compromiso, dedicación y cariño por quienes forman parte de tu familia.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ['--d' as string]: '240ms' }}
          >
            <a href={whatsappUrl(generalMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-brand">
              <WhatsAppIcon />
              Consultar por WhatsApp
            </a>
            <a href="#servicios" className="btn btn-ghost-dark group">
              Conocé nuestros servicios
              <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="hero-in mt-10 flex items-center gap-4" style={{ ['--d' as string]: '320ms' }}>
            <div className="flex -space-x-3">
              <Photo
                name="gato-verde"
                alt=""
                sizes="48px"
                className="size-12 rounded-full border-[3px] border-navy-deep object-cover"
              />
              <Photo
                name="consultas"
                alt=""
                sizes="48px"
                className="size-12 rounded-full border-[3px] border-navy-deep object-cover"
              />
              <span className="grid size-12 place-items-center rounded-full border-[3px] border-navy-deep bg-orange text-navy-ink">
                <Icon name="heart" className="size-5" />
              </span>
            </div>
            <p className="text-[0.9rem] leading-snug font-light text-cream/70">
              <span className="block text-[1rem] font-semibold text-paper">Cuidamos de quienes más querés.</span>
              Perros y gatos de {site.city} y la zona.
            </p>
          </div>
        </div>

        {/* Composición: foto en arco + ilustración del logo como sticker */}
        <div className="relative lg:col-span-6">
          <div className="hero-photo relative mx-auto max-w-[32rem] lg:mr-0">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] bg-navy shadow-lift ring-8 ring-white/5">
              <Photo
                name="hero"
                alt="Perro de pelaje rojizo descansando en su cama, en un ambiente luminoso con plantas"
                sizes="(min-width: 1024px) 32rem, 92vw"
                priority
                className="size-full object-cover object-[50%_70%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/40 to-transparent" />
            </div>

            <div className="hero-sticker absolute -right-2 -bottom-10 w-[12rem] sm:-right-8 sm:w-[15rem] lg:-right-12 lg:w-[18rem]">
              <LogoIllustration
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 15rem, 12rem"
                className="h-auto w-full drop-shadow-[0_18px_24px_rgb(10_15_30/0.45)]"
              />
            </div>

            <a
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[14%] -left-1 flex items-center gap-2 rounded-full bg-paper py-2 pr-4 pl-2 text-[0.85rem] font-semibold text-ink shadow-soft transition hover:shadow-lift sm:-left-5"
            >
              <span className="grid size-8 place-items-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon className="size-4" />
              </span>
              Escribinos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
