import { gallery } from '../content/site'
import { DemoNote, Photo, SectionHeading, useReveal } from './ui'

// Mosaico: la primera y la cuarta foto ocupan dos filas
const spans = ['row-span-2', '', '', 'row-span-2', '', '']

export function Gallery() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="galeria-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="galeria-title"
            eyebrow="Galería"
            title={
              <>
                Nuestros <em className="text-orange-ink not-italic">pacientes</em> y el lugar
              </>
            }
          />
          <div className="reveal lg:max-w-xs">
            <DemoNote>Fotos ilustrativas: se reemplazan por fotos reales de la veterinaria.</DemoNote>
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-4">
          {gallery.map((item, i) => (
            <li
              key={item.image}
              className={`reveal group relative overflow-hidden rounded-[1.5rem] bg-sand ${spans[i]}`}
              style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}
            >
              <Photo
                name={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 19rem, 46vw"
                className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
