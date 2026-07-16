import { useState } from 'react'
import { ArrowUpRight, Award, Crown, X } from 'lucide-react'

const WHATSAPP = 'https://wa.me/526143795377?text=Hola%20locos%2C%20quiero%20cotizar%20una%20impresi%C3%B3n%203D%20%F0%9F%9A%80'
const SITIO = 'https://l59914095-ui.github.io'

const NAV_LINKS = [
  { label: 'Tendencias', href: `${SITIO}/#tendencia` },
  { label: 'Servicios', href: `${SITIO}/#servicios` },
  { label: 'Somos', href: `${SITIO}/#somos` },
  { label: 'Preguntas', href: `${SITIO}/#faq` },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}printer-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Oscurecedor para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        <a href="#" className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
          LOCOS <span className="text-[#FF847C]">3D</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-all hover:border-white/60 hover:bg-white/10 md:flex"
        >
          Cotiza ahora
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          className="space-y-1.5 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-4 bg-white" />
        </button>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white">
            LOCOS <span className="text-[#FF847C]">3D</span>
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <X className="h-7 w-7 text-white" />
          </button>
        </div>

        <nav className="flex h-[70%] flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center gap-2 border border-white/30 px-8 py-4 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:bg-white/10"
            style={{
              transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Cotiza ahora
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>

      {/* Contenido del hero */}
      <main className="relative z-10 flex h-[calc(100%-88px)] flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
          <Crown className="h-4 w-4 text-white/70" />
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
            Taller de impresión 3D · Chihuahua
          </span>
        </div>

        <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
          <span className="block text-[clamp(2.8rem,8vw,7rem)]">Imagina.</span>
          <span className="block text-[clamp(2.8rem,8vw,7rem)]">Imprime.</span>
          <span className="block text-[clamp(2.8rem,8vw,7rem)] text-[#FF847C]">Presume.</span>
        </h1>

        <p className="animate-fade-up-delay-2 mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
          Convertimos ideas locas en piezas reales
          <br />
          que no solo llaman la atención —{' '}
          <span className="font-bold text-white">la roban.</span>
        </p>

        <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs"
          >
            Cotiza tu idea
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="hidden items-center gap-3 sm:flex">
            <Award className="h-8 w-8 text-white/50" />
            <div className="font-inter text-xs uppercase tracking-wider text-white/60">
              <div>Hecho con orgullo</div>
              <div>en Chihuahua, MX</div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16">
          {[
            { valor: '100%', label: 'Personalizado' },
            { valor: '2-5', label: 'Días de entrega' },
            { valor: '∞', label: 'Ideas posibles' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {stat.valor}
              </div>
              <div className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
