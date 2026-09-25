'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Cookie } from 'lucide-react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('borboleta-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('borboleta-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('borboleta-cookie-consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md p-4 shadow-2xl md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-2xl md:border"
        >
          <div className="flex items-start gap-3">
            <Cookie className="mt-1 h-5 w-5 shrink-0 text-borboleta-purple-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Usamos cookies 🍪</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
                <a href="/privacidad" className="text-primary underline hover:no-underline">
                  Política de Privacidad
                </a>
                .
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={accept} className="flex-1">
                  Aceptar
                </Button>
                <Button size="sm" variant="outline" onClick={decline}>
                  Rechazar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
