import { useEffect, useState } from 'react'
import { LogoIllustration, PawOutline } from './ui'

/** Duración total de la animación de entrada (ms). El hero arranca cuando la cortina empieza a subir. */
const EXIT_AT = 2300
const DONE_AT = 3300

/**
 * Animación de entrada con el logo de Castán. Se muestra al abrir la página
 * (salvo con "reducir movimiento") y se puede saltear con un clic o una tecla.
 */
export function Intro() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>(() =>
    document.documentElement.classList.contains('has-intro') ? 'in' : 'done',
  )

  useEffect(() => {
    if (phase === 'done') return
    document.body.style.overflow = 'hidden'
    const out = window.setTimeout(() => setPhase((p) => (p === 'in' ? 'out' : p)), EXIT_AT)
    const done = window.setTimeout(() => setPhase('done'), DONE_AT)
    const skip = () => setPhase((p) => (p === 'in' ? 'out' : p))
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(out)
      window.clearTimeout(done)
      window.removeEventListener('keydown', skip)
    }
    // Solo al montar: las fases siguientes las manejan los timers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase === 'out') {
      const t = window.setTimeout(() => setPhase('done'), 1000)
      return () => window.clearTimeout(t)
    }
    if (phase === 'done') document.body.style.overflow = ''
  }, [phase])

  if (phase === 'done') return null

  const word = 'castán'
  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase((p) => (p === 'in' ? 'out' : p))}
      className={`intro fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-navy-ink via-navy-deep to-navy ${
        phase === 'out' ? 'is-leaving' : ''
      }`}
    >
      <PawOutline className="intro-paw pointer-events-none absolute -top-10 -left-16 w-64 -rotate-12 text-navy/70" />
      <PawOutline className="intro-paw pointer-events-none absolute -right-20 -bottom-16 w-80 rotate-12 text-navy/60 [animation-delay:150ms]" />
      <div aria-hidden="true" className="intro-glow pointer-events-none absolute size-[34rem] rounded-full bg-orange/15 blur-[110px]" />

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
