'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)
  const [seasonName, setSeasonName] = useState('')

  useEffect(() => {
    // Calculate next season change
    const now = new Date()
    const month = now.getMonth() + 1

    let nextSeasonDate: Date
    let nextSeason: string

    // High season: Jun-Aug, Nov-Feb | Low season: Mar-May, Sep-Oct
    if (month >= 11 || month <= 2) {
      // Currently high season (Nov-Feb), next change: March 1
      nextSeasonDate = new Date(now.getFullYear() + (month <= 2 ? 0 : 1), 2, 1) // March 1
      nextSeason = 'Temporada Baja'
    } else if (month >= 3 && month <= 5) {
      // Low season (Mar-May), next: June 1
      nextSeasonDate = new Date(now.getFullYear(), 5, 1)
      nextSeason = 'Temporada Alta'
    } else if (month >= 6 && month <= 8) {
      // High season (Jun-Aug), next: Sep 1
      nextSeasonDate = new Date(now.getFullYear(), 8, 1)
      nextSeason = 'Temporada Baja'
    } else {
      // Low season (Sep-Oct), next: Nov 1
      nextSeasonDate = new Date(now.getFullYear(), 10, 1)
      nextSeason = 'Temporada Alta'
    }

    setSeasonName(nextSeason)

    const timer = setInterval(() => {
      const diff = nextSeasonDate.getTime() - new Date().getTime()
      if (diff <= 0) {
        clearInterval(timer)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-borboleta-gold-100 to-borboleta-gold-50 dark:from-borboleta-gold-900/20 dark:to-gray-800 border border-borboleta-gold-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-borboleta-gold-600" />
        <p className="text-sm font-semibold text-borboleta-gold-800 dark:text-borboleta-gold-400">
          ¡Cambia de temporada pronto! Reserva antes que cambien los precios.
        </p>
      </div>
      <div className="flex gap-3">
        {[
          { value: timeLeft.days, label: 'días' },
          { value: timeLeft.hours, label: 'horas' },
          { value: timeLeft.minutes, label: 'min' },
          { value: timeLeft.seconds, label: 'seg' },
        ].map((unit) => (
          <div key={unit.label} className="flex-1 text-center rounded-lg bg-white dark:bg-gray-800 py-2 shadow-sm">
            <p className="font-display text-2xl font-bold text-borboleta-purple-600">
              {String(unit.value).padStart(2, '0')}
            </p>
            <p className="text-xs text-muted-foreground">{unit.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Próxima temporada: <span className="font-semibold">{seasonName}</span>
      </p>
    </div>
  )
}
