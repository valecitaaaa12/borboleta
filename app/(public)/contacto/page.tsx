import type { Metadata } from 'next'
import { ContactoClient } from '@/components/contacto-client'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => <div className="w-full h-64 rounded-2xl bg-muted animate-pulse" />,
})

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para cotizar tu evento o agendar una visita al salón Borboleta en Sucre, Bolivia.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Hablemos
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Contacto</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ¿Tienes preguntas o quieres visitar el salón? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ContactoClient />
          <div className="space-y-6">
            <MapComponent />
            <div className="grid grid-cols-1 gap-4">
              <a
                href="https://wa.me/59175791516"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+591 75791516</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">Respuesta inmediata</p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-sm text-muted-foreground">Sucre, Chuquisaca, Bolivia</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
                <span className="text-3xl">🕐</span>
                <div>
                  <p className="font-semibold">Horarios</p>
                  <p className="text-sm text-muted-foreground">Lun-Vie: 9:00-19:00 | Sáb-Dom: 9:00-15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
