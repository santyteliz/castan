import { useRef, useState, type PointerEvent } from 'react'
import { xrays } from '../content/site'
import { Icon } from './Icon'
import { Lightbox, SectionHeading, useReveal } from './ui'

const items = xrays.map((x) => ({ ...x, alt: `Radiografía: ${x.label.toLowerCase()}` }))

/** Carrusel de radiografías: se arrastra con el mouse, se desliza con el dedo y abre el visor al hacer clic. */
export function XRays() {
  const ref = useReveal<HTMLElement>()
  const track = useRef<HTMLUListElement>(null)
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false })
  const [open, setOpen] = useState<number | null>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  // Arrastre con mouse (en táctil se usa el scroll nativo)
  const onDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return
    drag.current = { active: true, startX: e.clientX, scroll: track.current.scrollLeft, moved: false }
  }
  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d.active || !track.current) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 5) d.moved = true
    track.current.scrollLeft = d.scroll - dx
  }
  const onUp = () => {
    drag.current.active = false
  }

  return (
    <section ref={ref} aria-labelledby="rx-title" className="relative overflow-hidden bg-navy-ink py-24 text-cream sm:py-32">
      {/* Grilla sutil, como la de un negatoscopio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/4 size-[30rem] rounded-full bg-orange/10 blur-[120px]" />

      <div className="container-page relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="rx-title"
          tone="dark"
          eyebrow="Cirugía traumatológica y ortopédica"
          title="Traumatología"
          accent="en imágenes"
          text="Radiografías de cirugías realizadas con placas, tornillos, clavos y fijadores externos. Tocá una para verla en detalle."
        />
        <div className="reveal flex gap-2">
          <button
            type="button"
            aria-label="Ver radiografías anteriores"
            onClick={() => scrollBy(-1)}
            className="grid size-12 place-items-center rounded-full border border-white/15 text-cream transition hover:-translate-x-0.5 hover:border-orange hover:bg-orange hover:text-navy-ink"
          >
            <Icon name="arrowRight" className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Ver más radiografías"
            onClick={() => scrollBy(1)}
            className="grid size-12 place-items-center rounded-full border border-white/15 text-cream transition hover:translate-x-0.5 hover:border-orange hover:bg-orange hover:text-navy-ink"
          >
            <Icon name="arrowRight" className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="reveal relative mt-14 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [--gutter:1.25rem] [scrollbar-width:none] active:cursor-grabbing sm:[--gutter:2rem] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: 'max(var(--gutter), calc((100vw - 76rem) / 2 + var(--gutter)))',
          scrollPaddingInline: 'max(var(--gutter), calc((100vw - 76rem) / 2 + var(--gutter)))',
        }}
      >
        {items.map((x, i) => (
          <li key={x.src} className="w-[72vw] shrink-0 snap-start sm:w-[19rem]">
            <button
              type="button"
              onClick={() => {
                if (!drag.current.moved) setOpen(i)
              }}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-black text-left ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:ring-orange/50"
              aria-label={`Ampliar radiografía: ${x.label}`}
            >
              <img
                src={`${x.src}.webp`}
                alt={x.alt}
                loading="lazy"
                draggable={false}
                className="size-full object-cover opacity-80 grayscale transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="xray-scan" aria-hidden="true" />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span>
                  <span className="block text-[0.7rem] font-semibold tracking-[0.2em] text-orange uppercase tabular-nums">
                    Rx {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block text-[1rem] font-semibold text-paper">{x.label}</span>
                </span>
                <span className="grid size-9 shrink-0 scale-75 place-items-center rounded-full bg-orange text-navy-ink opacity-0 transition duration-500 ease-[var(--ease-spring)] group-hover:scale-100 group-hover:opacity-100">
                  <Icon name="search" className="size-4" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  )
}
