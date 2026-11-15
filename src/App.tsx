import { About } from './components/About'
import { FinalCta, FloatingWhatsApp, Footer } from './components/Closing'
import { Contact } from './components/Contact'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Process } from './components/Process'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'
import { Team } from './components/Team'

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-orange px-5 py-3 text-navy-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Process />
        <Team />
        <Gallery />
        <Reviews />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
