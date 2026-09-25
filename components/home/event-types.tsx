'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const eventTypes = [
  {
    id: 'BODA',
    label: 'Bodas',
    emoji: '💍',
    description: 'El día más especial de tu vida merece un escenario perfecto.',
    image: '/images/bodas/boda-1.jpg',
    href: '/galeria?tipo=BODA',
    accent: 'from-pink-600 to-rose-700',
  },
  {
    id: 'QUINCEANERA',
    label: 'Quinceañeras',
    emoji: '👑',
    description: 'Una fiesta de ensueño para el inicio de una nueva etapa.',
    image: '/images/quinceanos/quinceanera-1.jpg',
    href: '/galeria?tipo=QUINCEANERA',
    accent: 'from-borboleta-purple-600 to-violet-700',
  },
  {
    id: 'CORPORATIVO',
    label: 'Corporativos',
    emoji: '💼',
    description: 'Conferencias, lanzamientos y celebraciones empresariales.',
    image: '/images/corporativos/corporativo-2.jpg',
    href: '/galeria?tipo=CORPORATIVO',
    accent: 'from-blue-600 to-cyan-700',
  },
  {
    id: 'INFANTIL',
    label: 'Infantiles',
    emoji: '🎈',
    description: 'Magia y diversión para los momentos más felices.',
    image: '/images/infantiles/infantil-2.jpg',
    href: '/galeria?tipo=INFANTIL',
    accent: 'from-yellow-500 to-orange-600',
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
                className="group block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* Imagen horizontal con aspect ratio 4:3 */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={type.image}
                    alt={`${type.label} en Borboleta Salón de Eventos Sucre`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${type.accent} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <span className="text-4xl mb-2 drop-shadow-lg" role="img" aria-hidden="true">
                      {type.emoji}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-center drop-shadow-md">
                      {type.label}
                    </h3>
                  </div>
                </div>
                {/* Description below image */}
                <div className="bg-card border-x border-b rounded-b-3xl px-5 py-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-borboleta-purple-600 group-hover:text-borboleta-purple-700 transition-colors">
                    Ver galería →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
