'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const shown = sessionStorage.getItem('borboleta-exit-popup')
    if (shown) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setVisible(true)
        sessionStorage.setItem('borboleta-exit-popup', 'shown')
      }
    }

    // Mobile: scroll to bottom
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY + window.innerHeight
          const total = document.documentElement.scrollHeight
          if (scrolled >= total - 100 && !dismissed) {
            setVisible(true)
            sessionStorage.setItem('borboleta-exit-popup', 'shown')
          }
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dismissed])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-br from-borboleta-purple-900 to-borboleta-purple-950 p-8 text-white shadow-2xl"
          >
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Cerrar popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <span className="text-5xl block mb-3" aria-hidden="true">🦋</span>
              <h3 className="font-serif text-2xl font-semibold mb-2">
                ¡Espera! Oferta especial
              </h3>
              <p className="text-white/70 mb-2">
                Reserva tu fecha hoy y obtén
              </p>
              <p className="font-display text-5xl font-bold text-borboleta-gold-400 mb-2">
                10% OFF
              </p>
              <p className="text-white/60 text-sm mb-6">
                Válido solo por las próximas 24 horas
              </p>
              <Link href="/cotizador" onClick={dismiss}>
                <Button size="lg" variant="gold" className="w-full mb-3">
                  Cotizar con descuento →
                </Button>
              </Link>
              <button
                onClick={dismiss}
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                No gracias, pagar precio normal
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
