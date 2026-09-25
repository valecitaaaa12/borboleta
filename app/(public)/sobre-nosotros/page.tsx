import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Star, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce la historia de Borboleta, el salón de eventos más elegante de Sucre, Bolivia.',
}

const values = [
  { icon: Heart, title: 'Pasión', desc: 'Cada evento es único para nosotros. Ponemos el corazón en cada detalle.' },
  { icon: Star, title: 'Excelencia', desc: 'Más de 10 años perfeccionando el arte de hacer eventos memorables.' },
  { icon: Shield, title: 'Confianza', desc: 'Tu sueño es seguro con nosotros. Cumplimos cada promesa.' },
  { icon: Users, title: 'Familia', desc: 'Tratamos a cada cliente como parte de la familia Borboleta.' },
]

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-borboleta-purple-900 to-borboleta-purple-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-[200px]">🦋</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-borboleta-gold-400 font-semibold uppercase tracking-widest text-sm mb-3">Nuestra historia</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              Sobre<br />
              <span className="italic text-borboleta-gold-400">Borboleta</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Nacimos del sueño de crear un espacio donde los momentos más importantes de la vida 
              se conviertan en recuerdos eternos. En Sucre, la ciudad que nos inspira con su historia 
              y belleza, construimos Borboleta con amor y dedicación.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-3">
                2014 — Presente
              </p>
              <h2 className="font-serif text-4xl font-semibold mb-6">
                Una historia tejida de celebraciones
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Borboleta nació en 2014 con una visión clara: ser el espacio donde los sueños se hacen 
                  realidad en Sucre. Como la mariposa que simboliza nuestro nombre, cada evento que 
                  organizamos es una transformación, una metamorfosis de lo ordinario a lo extraordinario.
                </p>
                <p>
                  Con más de 500 eventos realizados y una calificación de 4.9 estrellas, nos hemos 
                  consolidado como el salón de referencia en Chuquisaca. Nuestro equipo de más de 
                  20 profesionales trabaja incansablemente para que cada detalle sea perfecto.
                </p>
                <p>
                  Desde íntimas bodas civiles hasta grandes recepciones de 300 personas, pasando por 
                  quinceañeras de ensueño y eventos corporativos de alto nivel, en Borboleta cada 
                  celebración recibe el mismo nivel de atención y cariño.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-borboleta-purple-100 dark:bg-borboleta-purple-900/30 p-8 text-center">
                <p className="font-display text-5xl font-bold text-borboleta-purple-600">500+</p>
                <p className="text-sm text-muted-foreground mt-2">Eventos realizados</p>
              </div>
              <div className="rounded-3xl bg-borboleta-gold-100 dark:bg-borboleta-gold-900/30 p-8 text-center">
                <p className="font-display text-5xl font-bold text-borboleta-gold-600">10+</p>
                <p className="text-sm text-muted-foreground mt-2">Años de experiencia</p>
              </div>
              <div className="rounded-3xl bg-pink-100 dark:bg-pink-900/30 p-8 text-center">
                <p className="font-display text-5xl font-bold text-pink-600">4.9★</p>
                <p className="text-sm text-muted-foreground mt-2">Calificación promedio</p>
              </div>
              <div className="rounded-3xl bg-blue-100 dark:bg-blue-900/30 p-8 text-center">
                <p className="font-display text-5xl font-bold text-blue-600">20+</p>
                <p className="text-sm text-muted-foreground mt-2">Profesionales en el equipo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-semibold mb-3">Nuestros valores</h2>
            <p className="text-muted-foreground">Los principios que guían cada uno de nuestros eventos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={value.title} className="text-center rounded-3xl bg-card border p-8 hover:shadow-lg transition-shadow">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-borboleta-purple-100 dark:bg-borboleta-purple-900/30 mb-4">
                  <value.icon className="h-7 w-7 text-borboleta-purple-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="aliados" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-semibold mb-3">Alianzas y certificaciones</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Trabajamos con los mejores proveedores y cumplimos con todas las normativas de bioseguridad
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Certificación Bioseguridad', emoji: '🛡️' },
              { label: 'Asociación de Hoteles de Sucre', emoji: '🏨' },
              { label: 'Cámara de Comercio Chuquisaca', emoji: '🏛️' },
              { label: 'Red de Turismo Bolivia', emoji: '🇧🇴' },
            ].map((cert) => (
              <div key={cert.label} className="rounded-2xl border bg-card p-6 text-center hover:shadow-md transition-shadow">
                <span className="text-4xl block mb-2">{cert.emoji}</span>
                <p className="text-sm font-medium">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-borboleta-purple-900 to-borboleta-purple-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-semibold mb-4">¿Listo para crear algo especial?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Contáctanos y comencemos a planificar el evento de tus sueños juntos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cotizador">
              <Button size="xl" variant="gold">Cotizar mi evento</Button>
            </Link>
            <Link href="/contacto">
              <Button size="xl" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                Contactar equipo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
