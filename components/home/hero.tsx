'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ButterflyRain, ButterflyHover } from '@/components/animations/butterfly'
import { ChevronDown, Calendar, Play } from 'lucide-react'

const LIGHTING_OPTIONS = [
  {
    id: 'day',
    label: '☀️ Día',
    gradient: 'from-purple-900/70 via-purple-800/50 to-transparent',
    overlay: 'bg-amber-100/10',
  },
  {
    id: 'night',
    label: '🌙 Noche',
    gradient: 'from-purple-950/90 via-purple-900/70 to-transparent',
    overlay: 'bg-indigo-900/20',
  },
  {
    id: 'party',
    label: '🪩 LED',
    gradient: 'from-purple-900/80 via-pink-900/60 to-transparent',
    overlay: 'bg-pink-500/10',
  },
]

export function Hero() {
  const [lighting, setLighting] = useState('night')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="Sección principal">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-borboleta-purple-900 via-borboleta-purple-800 to-borboleta-purple-950" />
        {/* Decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-borboleta-gold-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-borboleta-rose-DEFAULT/20 blur-3xl"
        />
        {/* Lighting overlay transition */}
        <motion.div
          key={lighting}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${LIGHTING_OPTIONS.find(l => l.id === lighting)?.overlay}`}
        />
      </div>

      {/* Butterflies */}
      <ButterflyRain count={10} />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            🦋 Salón de Eventos — Sucre, Bolivia
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Donde tus
            <span className="block font-semibold italic text-gradient-gold">
              sueños vuelan
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-2xl text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Bodas, quinceañeras, eventos corporativos y más. Creamos momentos únicos con elegancia, 
            profesionalismo y el toque mágico de <strong>Borboleta</strong>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ButterflyHover>
              <Link href="/cotizador">
                <Button size="xl" variant="gradient" className="gap-2 shadow-2xl">
                  <Calendar className="h-5 w-5" />
                  Cotiza tu evento gratis
                </Button>
              </Link>
            </ButterflyHover>
            <Link href="/galeria">
              <Button
                size="xl"
                variant="outline"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Play className="h-5 w-5" />
                Ver galería
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Lighting selector */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span className="text-xs text-white/60 mr-1">Ver salón con:</span>
          {LIGHTING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setLighting(opt.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                lighting === opt.id
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              aria-pressed={lighting === opt.id}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { value: '+500', label: 'Eventos realizados' },
            { value: '+10', label: 'Años de experiencia' },
            { value: '300+', label: 'Capacidad máx.' },
            { value: '4.9★', label: 'Calificación' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
            >
              <p className="font-display text-3xl font-semibold text-borboleta-gold-400">{stat.value}</p>
              <p className="mt-1 text-xs text-white/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  )
}
