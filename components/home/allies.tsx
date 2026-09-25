'use client'

import { motion } from 'framer-motion'

const allies = [
  { name: 'Fotografía Pro', category: 'Fotografía', emoji: '📸' },
  { name: 'Dulce Arte', category: 'Pastelería', emoji: '🎂' },
  { name: 'Flor & Arte', category: 'Florería', emoji: '💐' },
  { name: 'DJ Mix Bolivia', category: 'Música', emoji: '🎧' },
  { name: 'Video Moments', category: 'Videoografía', emoji: '🎥' },
  { name: 'Transport VIP', category: 'Transporte', emoji: '🚗' },
]

export function AlliesSection() {
  return (
    <section className="py-16 border-y bg-muted/30" aria-label="Proveedores aliados">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8"
        >
          Proveedores aliados certificados
        </motion.p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {allies.map((ally, i) => (
            <motion.div
              key={ally.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 rounded-2xl bg-background border p-4 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-3xl" role="img" aria-hidden="true">{ally.emoji}</span>
              <span className="text-xs font-medium">{ally.name}</span>
              <span className="text-xs text-muted-foreground">{ally.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
