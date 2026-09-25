'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500, suffix: '+', label: 'Eventos realizados', icon: '🎉' },
  { value: 10, suffix: '+', label: 'Años de experiencia', icon: '⭐' },
  { value: 300, suffix: '+', label: 'Capacidad máxima', icon: '👥' },
  { value: 98, suffix: '%', label: 'Clientes satisfechos', icon: '💜' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 60
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-gradient-borboleta">
      {count}{suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-20 bg-gradient-to-br from-borboleta-purple-50 to-borboleta-gold-50 dark:from-borboleta-purple-950 dark:to-gray-900" aria-label="Estadísticas">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-borboleta-gold-500 mb-2">
            Nuestra trayectoria
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Números que hablan
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center rounded-3xl bg-white dark:bg-gray-900 p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-3 block" role="img" aria-label={stat.label}>
                {stat.icon}
              </span>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
