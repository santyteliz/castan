import { useEffect, useState } from 'react'
import { LogoIllustration, PawOutline } from './ui'

/** Momento en que sube la cortina (ms). El hero arranca ahí mismo. */
const EXIT_AT = 1700
/** Duración de la cortina (coincide con la transición de .intro en index.css). */
const CURTAIN_MS = 800

/**
 * Animación de entrada con el logo de Castán. Se muestra solo la primera vez por sesión
 * (el script de index.html decide) y nunca con "reducir movimiento".
 * Se saltea con clic, tecla, rueda del mouse o al tocar la pantalla.
 */
export function Intro() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>(() =>
    document.documentElement.classList.contains('has-intro') ? 'in' : 'done',
  )

  // Fase 'in': bloquea el scroll, programa la salida y escucha cualquier intento de saltearla
  useEffect(() => {
    if (phase !== 'in') return
    document.body.style.overflow = 'hidden'
    const leave = () => setPhase('out')
    const timer = window.setTimeout(leave, EXIT_AT)
    const events = ['keydown', 'wheel', 'touchstart'] as const
    events.forEach((ev) => window.addEventListener(ev, leave, { passive: true, once: true }))
    return () => {
      window.clearTimeout(timer)
      events.forEach((ev) => window.removeEventListener(ev, leave))
    }
  }, [phase])

  // Fase 'out': libera el hero y el scroll en cuanto empieza a subir la cortina
  useEffect(() => {
    if (phase !== 'out') return
    const root = document.documentElement
    root.classList.remove('intro-running')
    document.body.style.overflow = ''
    const timer = window.setTimeout(() => {
      root.classList.remove('has-intro')
      setPhase('done')
    }, CURTAIN_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  if (phase === 'done') return null

  const word = 'castán'
  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase('out')}
      className={`intro fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-navy-ink via-navy-deep to-navy ${
        phase === 'out' ? 'is-leaving pointer-events-none' : ''
      }`}
    >
      <PawOutline className="intro-paw pointer-events-none absolute -top-10 -left-16 w-64 -rotate-12 text-navy/70" />
      <PawOutline className="intro-paw pointer-events-none absolute -right-20 -bottom-16 w-80 rotate-12 text-navy/60 [animation-delay:150ms]" />
      <div aria-hidden="true" className="intro-glow pointer-events-none absolute size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(232_119_46/0.24),transparent_65%)]" />

      <div className="intro-content relative flex flex-col items-center">
        <div className="intro-logo w-[15rem] sm:w-[20rem]">
          <LogoIllustration sizes="20rem" className="h-auto w-full drop-shadow-[0_24px_30px_rgb(5_10_25/0.55)]" />
        </div>

        <p className="mt-6 flex text-[4rem] leading-none font-bold tracking-[-0.04em] text-paper sm:text-[5.6rem]">
          {word.split('').map((ch, i) => (
            <span key={i} className="intro-letter inline-block" style={{ ['--i' as string]: i }}>
              {ch}
            </span>
          ))}
        </p>
        <p className="intro-sub mt-3 pl-[0.4em] text-[0.85rem] font-light text-peach uppercase sm:text-[1.1rem]">
          Veterinaria
        </p>
        <span className="intro-line mt-6 block h-1 rounded-full bg-orange" />
      </div>
    </div>
  )
}
