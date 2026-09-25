import type { Metadata } from 'next'
import { FAQClient } from '@/components/faq-client'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description: 'Respuestas a las preguntas más comunes sobre nuestros eventos, cancelaciones, horarios y más.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Dudas frecuentes
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-muted-foreground">
            Encuentra respuestas rápidas a las preguntas más comunes. 
            Si no encuentras lo que buscas, <a href="/contacto" className="text-primary underline">contáctanos</a>.
          </p>
        </div>
        <FAQClient />
      </div>
    </div>
  )
}
