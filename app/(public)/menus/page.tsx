import type { Metadata } from 'next'
import { MenusClient } from '@/components/menus/menus-client'

export const metadata: Metadata = {
  title: 'Menús y Banquetes',
  description: 'Explora nuestra variada oferta gastronómica. Menús para bodas, quinceañeras y todo tipo de eventos.',
}

export default function MenusPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Gastronomía
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Menús y Banquetes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada celebración merece una experiencia gastronómica excepcional. 
            Nuestros chefs crean menús personalizados para tu evento.
          </p>
        </div>
        <MenusClient />
      </div>
    </div>
  )
}
