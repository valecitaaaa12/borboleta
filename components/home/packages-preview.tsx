'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { ButterflyHover } from '@/components/animations/butterfly'
import { formatCurrency } from '@/lib/utils'

const packages = [
  {
    id: 'economico',
    name: 'Económico',
    price: 5000,
    maxGuests: 100,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Salón principal hasta 100 personas',
      'Decoración básica',
      'Menú ejecutivo 3 tiempos',
      'Coordinador de eventos',
      'Equipo de sonido básico',
    ],
  },
  {
    id: 'estandar',
    name: 'Estándar',
    price: 12000,
    maxGuests: 200,
    highlighted: true,
    color: 'from-borboleta-purple-600 to-borboleta-purple-800',
    features: [
      'Salón completo hasta 200 personas',
      'Decoración floral incluida',
      'Menú premium 4 tiempos',
      'DJ por 5 horas',
      'Barra de bebidas 4 horas',
      'Coordinador VIP',
      'Cabina de fotos',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 25000,
    maxGuests: 300,
    color: 'from-borboleta-gold-500 to-borboleta-gold-700',
    features: [
      'Salón completo hasta 300 personas',
      'Decoración de lujo personalizada',
      'Menú gourmet 5 tiempos',
      'DJ + show musical',
      'Barra libre toda la noche',
      'Coordinador ejecutivo 24h',
      'Cabina de fotos + video',
      'Torta personalizada',
      'Transporte de novios',
    ],
  },
]

export function PackagesPreview() {
  return (
    <section className="py-24" aria-label="Paquetes de eventos">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Paquetes
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Elige tu paquete ideal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            O personaliza completamente tu evento con nuestro cotizador interactivo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl overflow-hidden border ${
                pkg.highlighted
                  ? 'shadow-2xl scale-105 border-borboleta-purple-300'
                  : 'shadow-lg border-border'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 left-0 right-0 text-center bg-gradient-to-r from-borboleta-purple-600 to-borboleta-purple-800 py-1.5 text-xs font-bold text-white uppercase tracking-widest z-10">
                  🌟 Más popular
                </div>
              )}
              <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white ${pkg.highlighted ? 'pt-10' : ''}`}>
                <h3 className="font-display text-2xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-white/70 text-sm mb-4">Hasta {pkg.maxGuests} invitados</p>
                <p className="font-display text-4xl font-bold">
                  {formatCurrency(pkg.price)}
                </p>
                <p className="text-white/60 text-xs mt-1">Precio base estimado</p>
              </div>
              <div className="p-8 bg-card">
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-borboleta-purple-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/cotizador?paquete=${pkg.id}`}>
                  <Button
                    className="w-full"
                    variant={pkg.highlighted ? 'gradient' : 'outline'}
                  >
                    Seleccionar paquete
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">¿Tienes algo diferente en mente?</p>
          <ButterflyHover>
            <Link href="/cotizador">
              <Button size="lg" variant="gradient" className="gap-2">
                🦋 Cotizador personalizado
              </Button>
            </Link>
          </ButterflyHover>
        </div>
      </div>
    </section>
  )
}
