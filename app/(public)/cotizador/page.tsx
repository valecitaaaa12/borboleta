import type { Metadata } from 'next'
import { CotizadorWizard } from '@/components/cotizador/cotizador-wizard'

export const metadata: Metadata = {
  title: 'Cotizador de Eventos',
  description: 'Cotiza tu evento en Borboleta. Obtén un presupuesto estimado en Bolivianos en minutos.',
}

export default function CotizadorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-borboleta-purple-50 via-white to-borboleta-gold-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Presupuesto Gratuito
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            🦋 Cotiza tu evento
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Completa el formulario y obtén un presupuesto estimado en Bolivianos al instante. 
            Sin compromiso, 100% gratis.
          </p>
        </div>
        <CotizadorWizard />
      </div>
    </div>
  )
}
