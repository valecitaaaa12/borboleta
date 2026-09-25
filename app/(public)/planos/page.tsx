import type { Metadata } from 'next'
import { PlanosDesigner } from '@/components/planos/planos-designer'

export const metadata: Metadata = {
  title: 'Diseñador de Planos',
  description: 'Diseña la distribución de tu evento arrastrando mesas, pista de baile y más.',
}

export default function PlanosPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Herramienta interactiva
          </p>
          <h1 className="font-serif text-4xl font-semibold mb-3">Diseña tu plano</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Arrastra y suelta los elementos para visualizar cómo quedará la distribución de tu evento.
          </p>
        </div>
        <PlanosDesigner />
      </div>
    </div>
  )
}
