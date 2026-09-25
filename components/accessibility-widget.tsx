'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, ZoomIn, ZoomOut, Sun, Moon, Type } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const { theme, setTheme } = useTheme()

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 130)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex flex-col gap-2 rounded-2xl border bg-background p-3 shadow-xl"
          >
            <p className="px-1 text-xs font-semibold text-muted-foreground">Accesibilidad</p>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              className="flex items-center gap-2"
              aria-label="Aumentar tamaño de texto"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="text-xs">Texto +</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              className="flex items-center gap-2"
              aria-label="Reducir tamaño de texto"
            >
              <ZoomOut className="h-4 w-4" />
              <span className="text-xs">Texto -</span>
            </Button>
            <Button
              variant={highContrast ? 'default' : 'outline'}
              size="sm"
              onClick={toggleHighContrast}
              className="flex items-center gap-2"
              aria-label="Toggle alto contraste"
            >
              <Type className="h-4 w-4" />
              <span className="text-xs">Contraste</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2"
              aria-label="Toggle modo oscuro"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="text-xs">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-borboleta-purple-600 text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Opciones de accesibilidad"
      >
        <Accessibility className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
