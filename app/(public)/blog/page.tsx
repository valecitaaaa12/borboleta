import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog de Eventos',
  description: 'Consejos, tendencias y guías para planificar el evento perfecto en Sucre, Bolivia.',
}

// Static blog posts (would come from DB in production)
const posts = [
  {
    slug: 'como-planificar-boda-sucre',
    titulo: 'Cómo planificar tu boda en Sucre: guía completa 2026',
    resumen: 'Desde elegir la fecha hasta el último detalle de la decoración, te guiamos paso a paso en la planificación de tu boda perfecta en la ciudad blanca.',
    foto_portada: '/images/bodas/boda-3.jpg',
    autor: 'Equipo Borboleta',
    fecha: new Date('2026-01-15'),
    etiquetas: ['Bodas', 'Planificación', 'Sucre'],
  },
  {
    slug: 'tendencias-quinceaneras-2026',
    titulo: 'Tendencias en quinceañeras 2026: lo que está en boga',
    resumen: 'Descubre los colores, temas decorativos y experiencias que están marcando las quinceañeras más memorables de este año.',
    foto_portada: '/images/quinceanos/quinceanera-3.webp',
    autor: 'María González',
    fecha: new Date('2026-02-10'),
    etiquetas: ['Quinceañeras', 'Tendencias', 'Decoración'],
  },
  {
    slug: 'eventos-corporativos-exitosos',
    titulo: '5 claves para un evento corporativo exitoso',
    resumen: 'El éxito de un evento corporativo depende de muchos factores. Te compartimos los secretos que hemos aprendido en más de 10 años de experiencia.',
    foto_portada: '/images/corporativos/corporativo-3.jpg',
    autor: 'Carlos Rodríguez',
    fecha: new Date('2026-03-05'),
    etiquetas: ['Corporativo', 'Consejos', 'Networking'],
  },
  {
    slug: 'decoracion-fiestas-infantiles',
    titulo: 'Decoración mágica para fiestas infantiles: ideas creativas',
    resumen: 'Los pequeños merecen la mejor fiesta. Ideas originales y económicas para crear un ambiente de cuento en el salón.',
    foto_portada: '/images/infantiles/infantil-3.jpg',
    autor: 'Equipo Borboleta',
    fecha: new Date('2026-04-20'),
    etiquetas: ['Infantil', 'Decoración', 'DIY'],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Consejos y tendencias
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Blog de Eventos</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tips, tendencias y guías para que tu evento sea perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-3xl overflow-hidden border bg-card shadow-md hover:shadow-xl transition-shadow">
              {/* Imagen horizontal 16:9 */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={post.foto_portada}
                  alt={post.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.etiquetas.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <h2 className="font-serif text-xl font-semibold mb-2 group-hover:text-borboleta-purple-600 transition-colors leading-snug">
                  {post.titulo}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.resumen}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.autor}</span>
                  <span>{formatDate(post.fecha)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
