'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'

type EstadoCalendario = 'LIBRE' | 'OCUPADO' | 'PROVISIONAL'

interface DiaCalendario {
  id: string
  fecha: string
  estado: EstadoCalendario
  nota?: string
}

const ESTADO_CONFIG = {
  LIBRE: { label: 'Libre', color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200', dot: 'bg-green-500' },
  PROVISIONAL: { label: 'Provisional', color: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200', dot: 'bg-yellow-500' },
  OCUPADO: { label: 'Ocupado', color: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200', dot: 'bg-red-500' },
}

export function CalendarioAdmin() {
  const { toast } = useToast()
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [disponibilidad, setDisponibilidad] = useState<DiaCalendario[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/calendario?year=${year}&month=${month}`)
      const data = await res.json()
      setDisponibilidad(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [year, month])

  const getDiaEstado = (date: Date): EstadoCalendario => {
    const dateStr = date.toISOString().split('T')[0]
    const found = disponibilidad.find((d) => d.fecha.split('T')[0] === dateStr)
    return found?.estado || 'LIBRE'
  }

  const handleDayClick = async (date: Date, currentEstado: EstadoCalendario) => {
    const estados: EstadoCalendario[] = ['LIBRE', 'PROVISIONAL', 'OCUPADO']
    const nextEstado = estados[(estados.indexOf(currentEstado) + 1) % estados.length]
    const dateStr = date.toISOString().split('T')[0]

    setSaving(true)
    try {
      const res = await fetch('/api/calendario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: dateStr, estado: nextEstado }),
      })
      if (res.ok) {
        await fetchData()
        toast({ title: `Día actualizado: ${nextEstado}`, variant: 'success' as any })
      }
    } finally {
      setSaving(false)
    }
  }

  // Generate calendar days
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const startPadding = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const monthName = firstDay.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' })

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(ESTADO_CONFIG).map(([estado, config]) => (
          <div key={estado} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${config.dot}`} />
            <span className="text-sm text-muted-foreground">{config.label}</span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground ml-auto">Haz clic en un día para cambiar su estado</p>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold capitalize">{monthName}</h2>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground border-b">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
            <div key={d} className="p-2">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {Array.from({ length: startPadding }).map((_, i) => (
              <div key={`pad-${i}`} className="p-2 border-r border-b" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(year, month - 1, i + 1)
              const estado = getDiaEstado(date)
              const config = ESTADO_CONFIG[estado]
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <button
                  key={i}
                  onClick={() => !isPast && handleDayClick(date, estado)}
                  disabled={isPast || saving}
                  className={`relative p-2 border-r border-b text-center text-sm transition-all min-h-[48px] flex flex-col items-center justify-center ${
                    isPast ? 'opacity-30 cursor-not-allowed' : config.color + ' cursor-pointer'
                  } ${isToday ? 'ring-2 ring-borboleta-purple-500 ring-inset' : ''}`}
                  aria-label={`${date.toLocaleDateString('es-BO')}: ${config.label}`}
                >
                  <span className={`font-medium ${isToday ? 'text-borboleta-purple-600' : ''}`}>
                    {i + 1}
                  </span>
                  {!isPast && (
                    <span className={`mt-0.5 h-1.5 w-1.5 rounded-full ${config.dot}`} />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
