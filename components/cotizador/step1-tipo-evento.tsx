'use client'

import { useCotizadorStore, type TipoEvento } from '@/lib/cotizador-store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const eventTypes = [
  { id: 'BODA', label: 'Boda', emoji: '💍', description: 'Celebra tu amor en grande' },
  { id: 'QUINCEANERA', label: 'Quinceañera', emoji: '👑', description: 'Un momento único y especial' },
  { id: 'CORPORATIVO', label: 'Corporativo', emoji: '💼', description: 'Profesionalismo y elegancia' },
  { id: 'INFANTIL', label: 'Infantil', emoji: '🎈', description: 'Magia para los pequeños' },
  { id: 'OTRO', label: 'Otro evento', emoji: '🎊', description: 'Cualquier celebración especial' },
]

const packages = [
  { id: 'economico', label: 'Económico', desc: 'Hasta 100 personas', price: 'Desde Bs. 5,000' },
  { id: 'estandar', label: 'Estándar', desc: 'Hasta 200 personas', price: 'Desde Bs. 12,000', highlighted: true },
  { id: 'premium', label: 'Premium', desc: 'Hasta 300 personas', price: 'Desde Bs. 25,000' },
  { id: 'personalizado', label: 'Personalizado', desc: 'A tu medida', price: 'Cotización libre' },
]

export function Step1TipoEvento() {
  const { tipoEvento, paqueteId, setTipoEvento, setPaqueteId, setStep } = useCotizadorStore()

  const canContinue = tipoEvento !== ''

  return (
    <div className="rounded-3xl bg-card border shadow-xl p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">¿Qué tipo de evento planeas?</h2>
      <p className="text-muted-foreground mb-6">Selecciona el tipo de celebración para personalizar tu cotización.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {eventTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setTipoEvento(type.id as TipoEvento)}
            className={`rounded-2xl border-2 p-4 text-left transition-all hover:border-borboleta-purple-400 ${
              tipoEvento === type.id
                ? 'border-borboleta-purple-600 bg-borboleta-purple-50 dark:bg-borboleta-purple-900/30'
                : 'border-border'
            }`}
            aria-pressed={tipoEvento === type.id}
          >
            <span className="text-3xl block mb-1" role="img" aria-hidden="true">{type.emoji}</span>
            <p className="font-medium text-sm">{type.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-3">¿Tienes un paquete en mente? <span className="text-muted-foreground font-normal text-sm">(opcional)</span></h3>
        <div className="grid grid-cols-2 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setPaqueteId(pkg.id === paqueteId ? '' : pkg.id)}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                paqueteId === pkg.id
                  ? 'border-borboleta-gold-500 bg-borboleta-gold-50 dark:bg-borboleta-gold-900/20'
                  : 'border-border hover:border-borboleta-gold-300'
              } ${pkg.highlighted ? 'relative' : ''}`}
              aria-pressed={paqueteId === pkg.id}
            >
              {pkg.highlighted && (
                <span className="absolute -top-2 left-3 rounded-full bg-borboleta-purple-600 px-2 py-0.5 text-xs text-white">
                  Popular
                </span>
              )}
              <p className="font-medium text-sm">{pkg.label}</p>
              <p className="text-xs text-muted-foreground">{pkg.desc}</p>
              <p className="text-xs font-semibold text-borboleta-purple-600 mt-1">{pkg.price}</p>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setStep(2)}
        disabled={!canContinue}
        variant="gradient"
        size="lg"
        className="w-full"
      >
        Continuar →
      </Button>
    </div>
  )
}
