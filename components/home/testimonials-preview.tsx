'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'María Fernanda Quispe',
    event: 'Boda',
    text: 'El equipo de Borboleta hizo nuestra boda perfecta. Cada detalle fue atendido con amor y profesionalismo. El salón se veía de ensueño y nuestros invitados quedaron encantados.',
    rating: 5,
    avatar: '👰',
  },
  {
    id: 2,
    name: 'Carlos Mamani',
    event: 'Quinceañera',
    text: 'La quinceañera de mi hija superó todas las expectativas. La decoración fue espectacular, la comida deliciosa y el personal muy atento. ¡100% recomendado!',
    rating: 5,
    avatar: '🎊',
  },
  {
    id: 3,
    name: 'Empresa Tech Bolivia',
    event: 'Corporativo',
    text: 'Organizamos nuestro congreso anual en Borboleta y todo salió perfecto. Instalaciones de primer nivel, excelente servicio de catering y logística impecable.',
    rating: 5,
    avatar: '💼',
  },
  {
    id: 4,
    name: 'Lucía Torrez',
    event: 'Fiesta Infantil',
    text: 'El cumpleaños de mi niña fue mágico. Los niños disfrutaron muchísimo y los padres también. El personal fue muy amable y cuidadoso con los pequeños.',
    rating: 5,
    avatar: '🎈',
  },
]

export function TestimonialsPreview() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section className="py-24 bg-gradient-to-br from-borboleta-purple-900 to-borboleta-purple-950 text-white" aria-label="Testimonios">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-400 mb-2">
            Testimonios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 text-center"
            >
              <span className="text-5xl block mb-4" role="img" aria-label="Avatar">
                {testimonials[current].avatar}
              </span>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-borboleta-gold-400 text-borboleta-gold-400" />
                ))}
              </div>
              <blockquote className="font-serif text-xl md:text-2xl italic text-white/90 mb-6 leading-relaxed">
                "{testimonials[current].text}"
              </blockquote>
              <p className="font-semibold text-white">{testimonials[current].name}</p>
              <p className="text-sm text-white/60 mt-1">Evento: {testimonials[current].event}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-borboleta-gold-400' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
