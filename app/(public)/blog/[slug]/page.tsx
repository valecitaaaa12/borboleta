import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

const posts: Record<string, {
  titulo: string; resumen: string; contenido: string;
  foto_portada: string; autor: string; fecha: Date; etiquetas: string[]
}> = {
  'como-planificar-boda-sucre': {
    titulo: 'Cómo planificar tu boda en Sucre: guía completa 2026',
    resumen: 'Desde elegir la fecha hasta el último detalle de la decoración.',
    contenido: `## ¿Por qué casarte en Sucre?

Sucre, la ciudad blanca de Bolivia, ofrece un escenario incomparable para bodas. Sus calles coloniales, el clima agradable y la hospitalidad de su gente la convierten en el destino ideal.

## Paso 1: Elige la fecha con anticipación

La temporada alta para bodas en Sucre es de junio a agosto y de noviembre a enero. Recomendamos reservar con al menos 6 meses de anticipación para asegurar el salón y los proveedores de tu preferencia.

## Paso 2: Define tu presupuesto

Antes de tomar cualquier decisión, establece un presupuesto realista. En Borboleta ofrecemos paquetes desde Bs. 5,000 hasta paquetes premium completos.

## Paso 3: El salón es la base

El salón determina la capacidad de invitados y marca el tono del evento. Visítalo en persona para imaginar cómo se verá el día de tu boda.

## Paso 4: Proveedores clave

- Fotógrafo/Videógrafo: Reserva con meses de anticipación, los buenos se agotan rápido
- Catering: Define el menú 3 meses antes
- DJ o banda: Al menos 2 meses antes
- Decoración: Define el estilo y colores con anticipación

## Paso 5: Los detalles finales

Confirma la lista de invitados, diseña las invitaciones, coordina el protocolo del día y crea una línea de tiempo detallada.`,
    foto_portada: '/images/bodas/boda-1.jpg',
    autor: 'Equipo Borboleta',
    fecha: new Date('2026-01-15'),
    etiquetas: ['Bodas', 'Planificación', 'Sucre'],
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Post no encontrado' }
  return { title: post.titulo, description: post.resumen }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.etiquetas.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 leading-tight">{post.titulo}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
          <span>{post.autor}</span>
          <span>•</span>
          <span>{formatDate(post.fecha)}</span>
        </div>
        <Image src={post.foto_portada} alt={post.titulo} width={900} height={450} className="w-full rounded-3xl object-cover mb-8" />
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {post.contenido.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-semibold mt-8 mb-3">{line.slice(3)}</h2>
            if (line.startsWith('- ')) return <li key={i} className="text-muted-foreground ml-4">{line.slice(2)}</li>
            if (line.trim()) return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{line}</p>
            return null
          })}
        </div>
        <div className="mt-12 rounded-3xl bg-borboleta-purple-50 dark:bg-borboleta-purple-900/20 p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold mb-3">¿Listo para planificar tu evento?</h3>
          <Link href="/cotizador">
            <Button variant="gradient" size="lg">Cotizar gratis →</Button>
          </Link>
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-primary hover:underline text-sm">← Volver al blog</Link>
        </div>
      </div>
    </div>
  )
}
