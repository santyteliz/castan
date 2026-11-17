import { useState } from 'react'
import { gallery } from '../content/site'
import { Icon } from './Icon'
import { Lightbox, SectionHeading, useReveal } from './ui'

export function Gallery() {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={ref} id="galeria" aria-labelledby="galeria-title" className="pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="container-page">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galería"
          title="Nuestro trabajo,"
          accent="día a día"
          text="Cirugías, rehabilitación y pacientes en recuperación. Tocá una foto para verla completa."
        />

        <ul className="mt-12 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:gap-4 lg:auto-rows-[16rem] lg:grid-cols-3">
          {gallery.map((item, i) => (
            <li
              key={item.src}
              className={`reveal ${item.tall ? 'row-span-2' : ''} ${i === 0 ? 'col-span-2' : ''} ${i === gallery.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
              style={{ ['--reveal-delay' as string]: `${(i % 4) * 90}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto: ${item.label}`}
                className="curtain group relative block size-full overflow-hidden rounded-[1.5rem] bg-sand text-left"
              >
                <img
                  src={`${item.src}.webp`}
                  alt={item.alt}
                  loading="lazy"
                  className="size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-ink/80 via-navy-ink/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
                  <span className="translate-y-1 text-[0.9rem] font-semibold text-paper transition duration-500 group-hover:translate-y-0 sm:text-[1rem]">
                    {item.label}
                  </span>
                  <span className="hidden size-9 shrink-0 scale-75 place-items-center rounded-full bg-orange text-navy-ink opacity-0 transition duration-500 ease-[var(--ease-spring)] group-hover:scale-100 group-hover:opacity-100 sm:grid">
                    <Icon name="search" className="size-4" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={gallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  )
}
