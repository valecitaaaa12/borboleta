'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Dynamic import for SSR compatibility with Leaflet
const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 rounded-2xl bg-muted flex items-center justify-center">
      <div className="text-muted-foreground">Cargando mapa...</div>
    </div>
  ),
})

export function MapPreview() {
  return (
    <section className="py-24 bg-muted/30" aria-label="Ubicación">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Ubicación
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Encuéntranos en Sucre
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-card border p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-borboleta-purple-500" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sucre, Chuquisaca, Bolivia
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-card border p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-borboleta-purple-500" />
                <div>
                  <p className="font-semibold">Teléfono / WhatsApp</p>
                  <a
                    href="tel:+59175791516"
                    className="text-sm text-borboleta-purple-500 hover:underline mt-1 block"
                  >
                    +591 75791516
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-card border p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-borboleta-purple-500" />
                <div>
                  <p className="font-semibold">Horario de atención</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lun — Vie: 9:00 — 19:00<br />
                    Sáb — Dom: 9:00 — 15:00
                  </p>
                </div>
              </div>
            </div>
            <Link href="/contacto">
              <Button className="w-full" variant="gradient">
                Agendar visita al salón
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <MapComponent />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
