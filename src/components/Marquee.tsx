import { marquee } from '../content/site'

/** Cinta con los servicios en movimiento continuo. Se pausa al pasar el mouse. */
export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee relative overflow-hidden border-y border-navy-ink bg-orange py-4 text-navy-ink" aria-label="Servicios">
      <ul className="marquee-track flex w-max items-center">
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-6 pr-6 text-[0.95rem] font-semibold tracking-wide whitespace-nowrap uppercase sm:text-base"
          >
            {item}
            <svg viewBox="0 0 24 24" className="size-4 opacity-60" aria-hidden="true">
              <path fill="currentColor" d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}
