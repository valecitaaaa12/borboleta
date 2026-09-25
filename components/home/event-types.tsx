'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const eventTypes = [
  {
    id: 'BODA',
    label: 'Bodas',
    emoji: '💍',
    description: 'El día más especial de tu vida merece un escenario perfecto.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-200 dark:border-pink-800',
    href: '/galeria?tipo=BODA',
  },
  {
    id: 'QUINCEANERA',
    label: 'Quinceañeras',
    emoji: '👑',
    description: 'Una fiesta de ensueño para el inicio de una nueva etapa.',
    color: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-200 dark:border-purple-800',
    href: '/galeria?tipo=QUINCEANERA',
  },
  {
    id: 'CORPORATIVO',
    label: 'Corporativos',
    emoji: '💼',
    description: 'Conferencias, lanzamientos y celebraciones empresariales.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-200 dark:border-blue-800',
    href: '/galeria?tipo=CORPORATIVO',
  },
  {
    id: 'INFANTIL',
    label: 'Infantiles',
    emoji: '🎈',
    description: 'Magia y diversión para los momentos más felices.',
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    href: '/galeria?tipo=INFANTIL',
  },
]

export function EventTypesSection() {
  return (
    <section className="py-24" aria-label="Tipos de eventos">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Nuestros servicios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Un evento para cada momento
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Desde íntimas celebraciones familiares hasta grandes eventos corporativos, 
            en Borboleta tenemos el espacio y el equipo perfecto para ti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventTypes.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={type.href}
                className={`block h-full rounded-3xl border bg-gradient-to-br ${type.color} ${type.border} p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <span className="text-5xl block mb-4" role="img" aria-hidden="true">
                  {type.emoji}
                </span>
                <h3 className="font-serif text-xl font-semibold mb-2">{type.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                <p className="mt-4 text-sm font-medium text-primary">Ver galería →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
