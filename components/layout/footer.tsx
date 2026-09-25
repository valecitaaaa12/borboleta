import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Mail, Instagram, Facebook, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-borboleta-purple-950 text-white" role="contentinfo">
      {/* Newsletter strip */}
      <div className="border-b border-white/10 bg-borboleta-purple-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold">🦋 Recibe ofertas exclusivas</h3>
              <p className="mt-1 text-sm text-white/70">Suscríbete y obtén 5% de descuento en tu primera cotización</p>
            </div>
            <form action="/api/newsletter" method="POST" className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Tu correo electrónico"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-borboleta-gold-400"
              />
              <Button type="submit" variant="gold" className="shrink-0">
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10">
                <Image src="/1.webp" alt="Borboleta Logo" fill className="object-contain" />
              </div>
              <span className="font-display text-2xl font-semibold">Borboleta</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              El salón de eventos más elegante de Sucre. Convertimos tus sueños en momentos eternos.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Borboleta"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-pink-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Borboleta"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-blue-500 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Servicios">
            <h4 className="mb-4 font-semibold text-borboleta-gold-400">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Bodas', href: '/galeria?tipo=BODA' },
                { label: 'Quinceañeras', href: '/galeria?tipo=QUINCEANERA' },
                { label: 'Corporativos', href: '/galeria?tipo=CORPORATIVO' },
                { label: 'Fiestas Infantiles', href: '/galeria?tipo=INFANTIL' },
                { label: 'Cotizador', href: '/cotizador' },
                { label: 'Ver Menús', href: '/menus' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-borboleta-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <nav aria-label="Información">
            <h4 className="mb-4 font-semibold text-borboleta-gold-400">Información</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
                { label: 'Galería', href: '/galeria' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Proveedores Aliados', href: '/sobre-nosotros#aliados' },
                { label: 'Contacto', href: '/contacto' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-borboleta-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h4 className="mb-4 font-semibold text-borboleta-gold-400">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-borboleta-gold-400" />
                <span>Sucre, Chuquisaca, Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-borboleta-gold-400" />
                <a href="tel:+59175791516" className="hover:text-white transition-colors">
                  +591 75791516
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-borboleta-gold-400" />
                <a
                  href="mailto:info@borboleta.bo"
                  className="hover:text-white transition-colors"
                >
                  info@borboleta.bo
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Borboleta Salón de Eventos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 fill-pink-400 text-pink-400" /> en Bolivia
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
