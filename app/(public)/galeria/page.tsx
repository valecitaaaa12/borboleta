import type { Metadata } from 'next'
import { GaleriaClient } from '@/components/galeria/galeria-client'

export const metadata: Metadata = {
  title: 'Galería de Eventos',
  description: 'Descubre la magia de nuestros eventos. Bodas, quinceañeras, corporativos y más.',
}

export default function GaleriaPage({
  searchParams,
}: {
  searchParams: { tipo?: string }
}) {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Nuestros eventos
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Galería</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada imagen cuenta la historia de un momento único. 
            Descubre cómo transformamos espacios en recuerdos eternos.
          </p>
        </div>
        <GaleriaClient initialTipo={searchParams.tipo} />
      </div>
    </div>
  )
}
