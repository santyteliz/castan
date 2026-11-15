import { Fragment, useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { DEMO_MODE } from '../content/site'
import { Icon } from './Icon'

/** Anchos disponibles de cada foto en /public/img (nombre-ancho.webp) */
const imageWidths: Record<string, [number, number]> = {
  hero: [900, 1800],
  cta: [900, 1800],
  'tutora-gato': [700, 1300],
  'galeria-1': [600, 1100],
  'galeria-2': [600, 1100],
  'galeria-3': [600, 1100],
  'galeria-4': [600, 1100],
  'galeria-5': [600, 1100],
  'galeria-6': [600, 1100],
}

type PhotoProps = {
  name: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

export function Photo({ name, alt, sizes, className, priority = false }: PhotoProps) {
  const [small, large] = imageWidths[name] ?? [500, 900]
  return (
    <img
      src={`/img/${name}-${small}.webp`}
      srcSet={`/img/${name}-${small}.webp ${small}w, /img/${name}-${large}.webp ${large}w`}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

/** Marca los fragmentos entre corchetes como contenido provisional. */
export function Editable({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span key={i} className="placeholder">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

/** Nota discreta para el contenido de ejemplo. Desaparece con DEMO_MODE = false. */
export function DemoNote({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  if (!DEMO_MODE) return null
  return (
    <p
      className={`inline-flex items-start gap-2 rounded-xl px-3.5 py-2 text-[0.8rem] leading-snug ${
        tone === 'light' ? 'bg-peach-soft/70 text-orange-ink' : 'bg-white/10 text-cream/85'
      }`}
    >
      <Icon name="info" className="mt-px size-4 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Activa las animaciones `.reveal` de una sección cuando entran en pantalla. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = root.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((el) => io.observe(el))

    // Respaldo para saltos bruscos (anclas, scroll programático): muestra lo que ya quedó en pantalla o arriba
    let frame = 0
    const check = () => {
      const limit = window.innerHeight * 0.95
      for (const el of items) if (el.getBoundingClientRect().top < limit) el.classList.add('is-visible')
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return ref
}

/** Divide un texto en palabras que suben una a una al aparecer. */
export function SplitWords({ text, className, offset = 0 }: { text: string; className?: string; offset?: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span className={className} style={{ '--i': i + offset } as CSSProperties}>
              {word}
            </span>
          </span>{' '}
        </Fragment>
      ))}
    </>
  )
}

/** Guarda la posición del puntero en --mx / --my para el efecto de luz que sigue al cursor. */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Inclinación 3D suave que sigue al puntero (solo con mouse y sin "reducir movimiento"). */
export function useTilt<T extends HTMLElement>(max = 5) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    const move = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`
      })
    }
    const leave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(frame)
    }
  }, [max])
  return ref
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  align = 'left',
  tone = 'light',
  id,
}: {
  eyebrow: string
  title: string
  /** Parte final del título, destacada en naranja */
  accent?: string
  text?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  id?: string
}) {
  const words = title.split(' ').length
  return (
    <div className={`reveal max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${tone === 'dark' ? 'text-peach' : ''} ${align === 'center' ? 'justify-center' : ''}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-[2.1rem] leading-[1.08] font-bold sm:text-5xl ${tone === 'dark' ? 'text-paper' : 'text-ink'}`}
      >
        <SplitWords text={title} />
        {accent && (
          <SplitWords text={accent} offset={words} className={tone === 'dark' ? 'text-orange' : 'text-orange-ink'} />
        )}
      </h2>
      {text && (
        <p className={`mt-5 text-[1.05rem] leading-relaxed ${tone === 'dark' ? 'text-cream/75' : 'text-ink-soft'}`}>
          {text}
        </p>
      )}
    </div>
  )
}

/** Huella en contorno, recurso gráfico de la marca. Solo decorativa. */
export function PawOutline({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={9}
      aria-hidden="true"
      className={className}
      style={style}
    >
      <ellipse cx="100" cy="128" rx="46" ry="38" />
      <ellipse cx="48" cy="82" rx="16" ry="21" transform="rotate(-18 48 82)" />
      <ellipse cx="80" cy="50" rx="16" ry="22" transform="rotate(-6 80 50)" />
      <ellipse cx="122" cy="50" rx="16" ry="22" transform="rotate(6 122 50)" />
      <ellipse cx="154" cy="82" rx="16" ry="21" transform="rotate(18 154 82)" />
    </svg>
  )
}

/** Ilustración del logo de Castán (veterinario y animales), extraída de la identidad de la marca. */
export function LogoIllustration({ className, sizes }: { className?: string; sizes: string }) {
  return (
    <img
      src="/brand/logo-ilustracion-360.webp"
      srcSet="/brand/logo-ilustracion-360.webp 360w, /brand/logo-ilustracion-720.webp 720w"
      sizes={sizes}
      width={720}
      height={552}
      alt=""
      className={className}
    />
  )
}

/** Logo completo: ilustración + "castán" (Poppins Bold) + "VETERINARIA" (Poppins Light espaciada). */
export function Logo({ surface = 'dark' }: { surface?: 'dark' | 'light' }) {
  const main = surface === 'dark' ? 'text-paper' : 'text-navy-deep'
  const sub = surface === 'dark' ? 'text-peach' : 'text-orange-ink'
  return (
    <span className="group/logo flex items-center gap-2.5">
      <LogoIllustration
        sizes="60px"
        className="h-10 w-auto drop-shadow-sm transition-transform duration-500 ease-[var(--ease-spring)] group-hover/logo:-rotate-6 group-hover/logo:scale-110"
      />
      <span className="flex flex-col items-center leading-none">
        <span className={`text-[1.55rem] font-bold tracking-[-0.03em] ${main}`}>castán</span>
        <span className={`mt-0.5 pl-[0.4em] text-[0.5rem] font-light tracking-[0.4em] uppercase ${sub}`}>
          Veterinaria
        </span>
      </span>
    </span>
  )
}
