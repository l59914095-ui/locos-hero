import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Award, Crown, Facebook, MapPin, Phone, Plus, X } from 'lucide-react'

const WHATSAPP = 'https://wa.me/526143795377'
const WA_GENERAL = `${WHATSAPP}?text=Hola%20locos%2C%20quiero%20cotizar%20una%20impresi%C3%B3n%203D%20%F0%9F%9A%80`
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61591597239579'
const BASE = import.meta.env.BASE_URL

const NAV_LINKS = [
  { label: 'Tendencias', href: '#tendencias' },
  { label: 'Foto a 3D', href: '#foto-a-3d' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Somos', href: '#somos' },
  { label: 'Preguntas', href: '#preguntas' },
]

const PASOS_FOTO = [
  { num: '01', titulo: 'Mándanos tu foto', desc: 'Por WhatsApp, la que quieras: una selfie, tu mascota, tus hijos, tu carro…' },
  { num: '02', titulo: 'Diseñamos tu modelo 3D', desc: 'Nuestro equipo esculpe el modelo digital con todos sus detalles y te lo mostramos antes de imprimir.' },
  { num: '03', titulo: 'La imprimimos a todo color', desc: 'Capa por capa, con los colores impresos en el material. Lista para regalar o presumir.' },
]

const PASOS_PROCESO = [
  { num: '01', titulo: 'Escríbenos', desc: 'Mándanos por WhatsApp tu idea, foto o pieza que necesitas.' },
  { num: '02', titulo: 'Recibe tu cotización', desc: 'Precio y tiempo de entrega, sin compromiso y sin letras chiquitas.' },
  { num: '03', titulo: 'Aprobamos el diseño', desc: 'Te mostramos una vista previa del modelo antes de imprimir. Tú das el visto bueno.' },
  { num: '04', titulo: '¡Lista tu pieza!', desc: 'Entrega en Chihuahua capital o coordinamos envío a donde estés.' },
]

const PRODUCTOS = [
  {
    nombre: 'Dragón articulado',
    desc: 'Figura coleccionable flexible que se mueve de verdad. El favorito de grandes y niños.',
    precio: 250,
    img: 'prod-dragon.webp',
    badge: '★ Más pedido',
    wa: 'el%20Drag%C3%B3n%20articulado%20%F0%9F%90%89',
  },
  {
    nombre: 'Huevo de dragón fidget',
    desc: 'Antiestrés que gira, se enrosca y se transforma. Imposible soltarlo.',
    precio: 150,
    img: 'prod-egg.webp',
    badge: 'Viral en redes',
    wa: 'el%20Huevo%20de%20drag%C3%B3n%20fidget%20%F0%9F%A5%9A',
  },
  {
    nombre: 'Pingüino tambaleante',
    desc: 'Se tambalea, se cae… y siempre vuelve a levantarse. El regalo más tierno.',
    precio: 120,
    img: 'prod-penguin.webp',
    badge: 'Ideal para regalar',
    wa: 'el%20Ping%C3%BCino%20tambaleante%20%F0%9F%90%A7',
  },
  {
    nombre: 'Tela articulada',
    desc: 'Una "tela" de eslabones impresos que fluye entre tus manos. Hipnótica.',
    precio: 180,
    img: 'prod-fabric.webp',
    wa: 'la%20Tela%20articulada%20fidget',
  },
  {
    nombre: 'Porta-lentes para visera',
    desc: 'Tus lentes de sol siempre a la mano en el carro. Práctico y discreto.',
    precio: 90,
    img: 'prod-lentes.webp',
    wa: 'el%20Porta-lentes%20para%20visera%20%F0%9F%95%B6',
  },
  {
    nombre: 'Pastillero semanal',
    desc: '7 días, mañana y noche. Organiza tus medicinas con estilo y a tu color.',
    precio: 110,
    img: 'prod-pastillero.webp',
    wa: 'el%20Pastillero%20semanal%20%F0%9F%92%8A',
  },
]

const SERVICIOS = [
  { nombre: 'Figuras y coleccionables', desc: 'Personajes, vehículos y modelos a escala con detalle de exhibición.', img: 'serv-figuras.webp' },
  { nombre: 'Regalos personalizados', desc: 'Kits para armar, letreros con nombre, llaveros y detalles únicos.', img: 'serv-regalos.webp' },
  { nombre: 'Piezas y refacciones', desc: 'Reproducimos la pieza rota: soportes, tapas, ganchos, engranes.', img: 'serv-piezas.webp' },
  { nombre: 'Prototipos y maquetas', desc: 'Tu invento o proyecto, hecho realidad antes de fabricarlo en serie.', img: 'serv-prototipos.webp' },
  { nombre: 'Hogar y organización', desc: 'Destapadores, organizadores y accesorios prácticos para tu casa.', img: 'serv-hogar.webp' },
  { nombre: 'Diseño a medida', desc: '¿No existe lo que buscas? Lo diseñamos desde cero, como lo necesitas.', img: 'serv-medida.webp' },
]

const FAQS = [
  { q: '¿Cuánto cuesta imprimir algo en 3D?', a: 'Depende del tamaño, los colores y el detalle. Mándanos tu idea por WhatsApp y te cotizamos gratis en minutos — sin compromiso.' },
  { q: '¿Cuánto tardan en entregar?', a: 'La mayoría de las piezas están listas en 2 a 5 días, dependiendo del tamaño y la fila de pedidos. Te damos fecha exacta al cotizar.' },
  { q: '¿Pueden imprimir algo que vi en internet?', a: '¡Sí! Mándanos la foto, el video o el enlace y lo buscamos o lo diseñamos para imprimírtelo en los colores que quieras.' },
  { q: '¿Hacen envíos fuera de Chihuahua?', a: 'Sí, entregamos en Chihuahua capital y coordinamos envíos por paquetería a cualquier parte de México.' },
  { q: '¿De qué material son las piezas?', a: 'Usamos PLA y PETG de alta calidad: plásticos rígidos, ligeros y duraderos. El color va impreso en el material, así que no se despinta.' },
]

/* Aparece al hacer scroll */
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* Encabezado de sección estilo editorial */
function SectionHead({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal className="mb-12 lg:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-[#FF847C]" />
        <span className="font-inter text-xs uppercase tracking-[0.3em] text-white/50">{label}</span>
      </div>
      <h2 className="font-podium text-[clamp(2.2rem,6vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-white">
        {children}
      </h2>
    </Reveal>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-black font-inter">
      {/* ============ NAVBAR ============ */}
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10 lg:px-16 lg:py-7 ${
          scrolled ? 'bg-black/85 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-3">
          <img src={`${BASE}img/logo-azul-icono.png`} alt="" className="h-10 w-10 object-contain sm:h-11 sm:w-11" />
          <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            LOCOS <span className="text-[#FF847C]">3D</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] uppercase tracking-widest text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white transition-all hover:border-white/60 hover:bg-white/10 md:flex"
        >
          Cotiza ahora
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button className="space-y-1.5 md:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-6 bg-white" />
          <div className="h-0.5 w-4 bg-white" />
        </button>
      </header>

      {/* ============ MENÚ MÓVIL ============ */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="flex items-center gap-3">
            <img src={`${BASE}img/logo-azul-icono.png`} alt="" className="h-10 w-10 object-contain" />
            <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white">
              LOCOS <span className="text-[#FF847C]">3D</span>
            </span>
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
            <X className="h-7 w-7 text-white" />
          </button>
        </div>

        <nav className="flex h-[75%] flex-col items-center justify-center gap-5 sm:gap-7">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-podium text-3xl uppercase text-white transition-all duration-500 sm:text-4xl"
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
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center gap-2 border border-white/30 px-8 py-4 text-xs uppercase tracking-widest text-white transition-all duration-500 hover:bg-white/10"
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

      {/* ============ HERO ============ */}
      <section id="inicio" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={`${BASE}printer-bg.mp4`}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black" />

        <main className="relative z-10 flex h-full flex-col justify-center px-6 pt-20 sm:px-10 lg:px-16">
          <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
            <Crown className="h-4 w-4 text-white/70" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              Taller de impresión 3D · Chihuahua
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
            <span className="block text-[clamp(2.8rem,8vw,7rem)]">Imagina.</span>
            <span className="block text-[clamp(2.8rem,8vw,7rem)]">Imprime.</span>
            <span className="block text-[clamp(2.8rem,8vw,7rem)] text-[#FF847C]">Presume.</span>
          </h1>

          <p className="animate-fade-up-delay-2 mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
            Convertimos ideas locas en piezas reales
            <br />
            que no solo llaman la atención —{' '}
            <span className="font-bold text-white">la roban.</span>
          </p>

          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
            <a
              href="#tendencias"
              className="group flex items-center gap-2 bg-white px-5 py-3 text-[11px] uppercase tracking-widest text-black transition-colors hover:bg-neutral-200 sm:px-7 sm:py-4 sm:text-xs"
            >
              Ver tendencias
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="hidden items-center gap-3 sm:flex">
              <Award className="h-8 w-8 text-white/50" />
              <div className="text-xs uppercase tracking-wider text-white/60">
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
                <div className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{stat.valor}</div>
                <div className="mt-1 text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </main>
      </section>

      {/* ============ TENDENCIAS ============ */}
      <section id="tendencias" className="scroll-mt-24 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead label="Repositorio estrella">
            Productos en <span className="text-[#FF847C]">tendencia</span>
          </SectionHead>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTOS.map((p, i) => (
              <Reveal key={p.nombre} delay={(i % 3) * 100}>
                <article className="group flex h-full flex-col border border-white/10 bg-neutral-950 transition-colors hover:border-white/30">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={`${BASE}img/${p.img}`}
                      alt={p.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    {p.badge && (
                      <span className="absolute left-4 top-4 bg-[#FF847C] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-podium text-xl uppercase tracking-wide text-white">{p.nombre}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.desc}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div className="text-white">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">desde</span>{' '}
                        <span className="text-2xl font-bold">${p.precio}</span>{' '}
                        <span className="text-[10px] uppercase tracking-widest text-white/50">MXN*</span>
                      </div>
                      <a
                        href={`${WHATSAPP}?text=Hola%2C%20quiero%20cotizar%20${p.wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-1.5 border border-white/30 px-4 py-2.5 text-[10px] uppercase tracking-widest text-white transition-all hover:border-[#FF847C] hover:bg-[#FF847C] hover:text-black"
                      >
                        Cotizar
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="text-center text-xs tracking-wider text-white/40">
              *Precios estimados. La cotización final depende del tamaño, colores y material.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="flex flex-col items-center justify-between gap-6 border border-white/10 bg-neutral-950 px-8 py-10 text-center md:flex-row md:text-left">
              <div>
                <h3 className="font-podium text-2xl uppercase tracking-wide text-white sm:text-3xl">
                  ¿Viste algo en internet que te encantó?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/60">
                  Mándanos la foto, el video o el enlace por WhatsApp y te decimos cuánto costaría imprimirlo en tus colores.
                </p>
              </div>
              <a
                href={`${WHATSAPP}?text=Hola%2C%20vi%20algo%20en%20internet%20que%20quiero%20imprimir%20en%203D%20%F0%9F%94%A5`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 bg-[#FF847C] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#ffa19b]"
              >
                Cotizar lo que vi
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOTO A 3D ============ */}
      <section id="foto-a-3d" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead label="Foto a 3D">
            De tu foto a algo que puedes <span className="text-[#FF847C]">tocar</span>
          </SectionHead>

          <Reveal className="-mt-6 mb-12 lg:-mt-10 lg:mb-16">
            <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              ¿Una foto especial? Nosotros la convertimos en una figura real: tu familia, tu mascota,
              tu carro o tu personaje favorito.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PASOS_FOTO.map((paso, i) => (
              <Reveal key={paso.num} delay={i * 100}>
                <article className="h-full border border-white/10 bg-neutral-950 p-8 transition-colors hover:border-white/30">
                  <span className="font-podium text-5xl text-[#FF847C]/80">{paso.num}</span>
                  <h3 className="mt-4 font-podium text-xl uppercase tracking-wide text-white">{paso.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{paso.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="flex flex-col items-center justify-between gap-6 border border-white/10 bg-neutral-950 px-8 py-10 text-center md:flex-row md:text-left">
              <div>
                <h3 className="font-podium text-2xl uppercase tracking-wide text-white sm:text-3xl">
                  El regalo que nadie más puede dar
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/60">
                  Cumpleaños, aniversarios, graduaciones, Día de las Madres… una figura de esa persona
                  especial es un recuerdo que se queda para siempre.
                </p>
              </div>
              <a
                href={`${WHATSAPP}?text=Hola%2C%20quiero%20convertir%20una%20foto%20en%20figura%203D%20%F0%9F%93%B8`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 bg-[#FF847C] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#ffa19b]"
              >
                Quiero mi figura
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICIOS ============ */}
      <section id="servicios" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead label="Todo lo que imprimimos">
            Si lo imaginas, <span className="text-[#FF847C]">lo imprimimos</span>
          </SectionHead>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map((s, i) => (
              <Reveal key={s.nombre} delay={(i % 3) * 100}>
                <article className="group relative aspect-[16/11] overflow-hidden border border-white/10">
                  <img
                    src={`${BASE}img/${s.img}`}
                    alt={s.nombre}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-podium text-xl uppercase tracking-wide text-white">{s.nombre}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESO ============ */}
      <section id="proceso" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead label="Así de fácil">
            De WhatsApp a tus manos en <span className="text-[#FF847C]">4 pasos</span>
          </SectionHead>

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS_PROCESO.map((paso, i) => (
              <Reveal key={paso.num} delay={i * 100}>
                <div className="border-t-2 border-[#FF847C]/70 pt-6">
                  <span className="font-podium text-4xl text-white/25">{paso.num}</span>
                  <h3 className="mt-3 font-podium text-lg uppercase tracking-wide text-white">{paso.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{paso.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOMOS ============ */}
      <section id="somos" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <img
              src={`${BASE}img/logo-azul.png`}
              alt="Locos Diseños E Impresiones 3D"
              loading="lazy"
              className="mx-auto w-full max-w-sm drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHead label="Nuestra marca">
              Los <span className="text-[#FF847C]">locos</span> detrás de tus ideas
            </SectionHead>
            <Reveal delay={100}>
              <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                Somos un taller chihuahuense que cree que ninguna idea es demasiado rara, demasiado grande ni demasiado
                "imposible" para imprimirse. Por eso nos llamamos{' '}
                <span className="font-bold text-[#FF847C]">Locos</span>: porque decimos que sí cuando otros dicen que no
                se puede.
              </p>
              <blockquote className="mt-8 border-l-2 border-[#FF847C] pl-6 font-podium text-xl uppercase leading-snug tracking-wide text-white sm:text-2xl">
                "Transformamos tus ideas en realidad"
              </blockquote>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`${WHATSAPP}?text=Hola%20locos%2C%20tengo%20una%20idea%20para%20ustedes%20%F0%9F%A4%AA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#FF847C] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#ffa19b]"
                >
                  Cuéntanos tu idea loca
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/30 px-7 py-4 text-xs uppercase tracking-widest text-white transition-all hover:border-white/60 hover:bg-white/10"
                >
                  <Facebook className="h-4 w-4" />
                  Síguenos
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PREGUNTAS ============ */}
      <section id="preguntas" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionHead label="Preguntas frecuentes">
            Lo que todos <span className="text-[#FF847C]">nos preguntan</span>
          </SectionHead>

          <Reveal>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {FAQS.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:text-[#FF847C] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="h-5 w-5 shrink-0 text-[#FF847C] transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-16 text-center" delay={100}>
            <h3 className="font-podium text-[clamp(1.8rem,4.5vw,3rem)] uppercase leading-tight text-white">
              ¿Listo para ver tu idea <span className="text-[#FF847C]">hecha realidad</span>?
            </h3>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/50">
              Por muy loca que sea, la imprimimos
            </p>
            <a
              href={`${WHATSAPP}?text=Hola%2C%20vengo%20de%20su%20p%C3%A1gina%20y%20quiero%20cotizar%20%F0%9F%9A%80`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-neutral-200 sm:px-10 sm:py-5"
            >
              <Phone className="h-4 w-4" />
              Escríbenos: 614 379 5377
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/10 px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
          <img
            src={`${BASE}img/logo-azul.png`}
            alt="Locos Diseños E Impresiones 3D"
            loading="lazy"
            className="h-24 w-auto object-contain"
          />
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-white/60">
            <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-4 w-4" /> 614 379 5377
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Chihuahua, MX
            </span>
          </div>
        </div>
        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-white/30">
          © 2026 Locos Diseños E Impresiones 3D · Hecho con orgullo en Chihuahua
        </p>
      </footer>
    </div>
  )
}
