'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ButterflyProps {
  count?: number
  className?: string
}

const BUTTERFLY_SVG = (color: string) => `
<svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Left wings -->
  <ellipse cx="25" cy="22" rx="22" ry="18" fill="${color}" opacity="0.85" transform="rotate(-20 25 22)"/>
  <ellipse cx="22" cy="42" rx="18" ry="13" fill="${color}" opacity="0.7" transform="rotate(15 22 42)"/>
  <!-- Right wings -->
  <ellipse cx="75" cy="22" rx="22" ry="18" fill="${color}" opacity="0.85" transform="rotate(20 75 22)"/>
  <ellipse cx="78" cy="42" rx="18" ry="13" fill="${color}" opacity="0.7" transform="rotate(-15 78 42)"/>
  <!-- Body -->
  <ellipse cx="50" cy="30" rx="3" ry="14" fill="#2d1455" opacity="0.9"/>
  <!-- Antennae -->
  <path d="M47 16 Q42 5 38 2" stroke="#2d1455" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8"/>
  <path d="M53 16 Q58 5 62 2" stroke="#2d1455" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="38" cy="2" r="1.5" fill="#2d1455" opacity="0.8"/>
  <circle cx="62" cy="2" r="1.5" fill="#2d1455" opacity="0.8"/>
</svg>
`

const COLORS = ['#9333ea', '#c59aff', '#d4a017', '#fbbf24', '#e879a0', '#f5a3c2']

function SingleButterfly({ delay = 0, startX = 0, color = '#9333ea' }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${startX}%`, top: '-60px', width: 40, height: 30 }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.random() > 0.5 ? 80 : -80, Math.random() > 0.5 ? -40 : 40, 0],
        rotate: [0, 15, -15, 8, -8, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        animate={{ scaleX: [1, 0.3, 1, 0.3, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        dangerouslySetInnerHTML={{ __html: BUTTERFLY_SVG(color) }}
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
    </motion.div>
  )
}

export function ButterflyRain({ count = 8 }: ButterflyProps) {
  const [butterflies, setButterflies] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([])

  useEffect(() => {
    setButterflies(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        color: COLORS[i % COLORS.length],
      }))
    )
  }, [count])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {butterflies.map((b) => (
        <SingleButterfly key={b.id} startX={b.x} delay={b.delay} color={b.color} />
      ))}
    </div>
  )
}

export function ButterflyHover({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false)
  const [butterflies] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      angle: (i / 3) * 360,
    }))
  )

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute pointer-events-none"
          style={{ top: '50%', left: '50%', width: 24, height: 18 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: [0, Math.cos((b.angle * Math.PI) / 180) * 50],
            y: [0, Math.sin((b.angle * Math.PI) / 180) * 30 - 30],
          }}
          transition={{ duration: 1, delay: b.id * 0.1 }}
          dangerouslySetInnerHTML={{ __html: BUTTERFLY_SVG(b.color) }}
        />
      ))}
    </div>
  )
}
