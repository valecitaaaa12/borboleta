'use client'

import { useEffect, useState } from 'react'
import { useCotizadorStore } from '@/lib/cotizador-store'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { formatCurrency, calculateWithTax } from '@/lib/utils'
import { Receipt } from 'lucide-react'

interface ServicioExtra {
  id: string
  nombre: string
  descripcion?: string
  precio: number
  categoria: string
}

const FALLBACK_SERVICIOS: ServicioExtra[] = [
  { id: 's1', nombre: 'DJ Profesional', descripcion: '5 horas con equipo de sonido premium', precio: 1500, categoria: 'Música' },
  { id: 's2', nombre: 'Decoración Floral', descripcion: 'Centro de mesas + arreglos principales', precio: 2000, categoria: 'Decoración' },
  { id: 's3', nombre: 'Fotografía y Video', descripcion: 'Cobertura completa del evento', precio: 3500, categoria: 'Fotografía' },
  { id: 's4', nombre: 'Barra de Bebidas', descripcion: 'Barra libre por 4 horas', precio: 1800, categoria: 'Catering' },
  { id: 's5', nombre: 'Cabina de Fotos', descripcion: 'PhotoBooth con accesorios y álbum', precio: 800, categoria: 'Entretenimiento' },
  { id: 's6', nombre: 'Show de Mariposas', descripcion: 'Espectáculo temático Borboleta', precio: 1200, categoria: 'Entretenimiento' },
  { id: 's7', nombre: 'Iluminación LED', descripcion: 'Sistema de luces programables', precio: 1000, categoria: 'Decoración' },
  { id: 's8', nombre: 'Torta Personalizada', descripcion: 'Diseño único para tu evento', precio: 500, categoria: 'Catering' },
]

export function Step4Servicios() {
  const { serviciosExtra, conFactura, numInvitados, menuPrecio, toggleServicioExtra, setConFactura, calcularPresupuesto, setStep } = useCotizadorStore()
  const [servicios, setServicios] = useState<ServicioExtra[]>(FALLBACK_SERVICIOS)

  useEffect(() => {
    fetch('/api/servicios')
      .then((r) => r.json())
      .then((data) => { if (data && data.length > 0) setServicios(data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    calcularPresupuesto(servicios.map((s) => ({ id: s.id, precio: s.precio })))
  }, [serviciosExtra, conFactura, calcularPresupuesto, servicios])

  const BASE_PER_PERSON = 280
  const baseTotal = BASE_PER_PERSON * numInvitados
  const menuTotal = menuPrecio * numInvitados
  const extrasTotal = servicios
    .filter((s) => serviciosExtra.includes(s.id))
    .reduce((sum, s) => sum + s.precio, 0)
  const subtotal = baseTotal + menuTotal + extrasTotal
  const total = calculateWithTax(subtotal, conFactura)

  const categories = Array.from(new Set(servicios.map((s) => s.categoria)))

  return (
    <div className="rounded-3xl bg-card border shadow-xl p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">Servicios adicionales</h2>
      <p className="text-muted-foreground mb-6">Personaliza tu evento con nuestros servicios extra.</p>

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">{cat}</h3>
          <div className="grid gap-2">
            {servicios.filter((s) => s.categoria === cat).map((servicio) => {
              const selected = serviciosExtra.includes(servicio.id)
              return (
                <div
                  key={servicio.id}
                  onClick={() => toggleServicioExtra(servicio.id, servicio.precio)}
                  className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition-all ${
                    selected
                      ? 'border-borboleta-purple-600 bg-borboleta-purple-50 dark:bg-borboleta-purple-900/30'
                      : 'border-border hover:border-borboleta-purple-300'
                  }`}
                  role="checkbox"
                  aria-checked={selected}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === ' ' && toggleServicioExtra(servicio.id, servicio.precio)}
                >
                  <div className="flex-1 mr-3">
                    <p className="font-medium text-sm">{servicio.nombre}</p>
                    {servicio.descripcion && (
                      <p className="text-xs text-muted-foreground mt-0.5">{servicio.descripcion}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-borboleta-purple-600">
                      +{formatCurrency(servicio.precio)}
                    </p>
                    <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center ml-auto ${
                      selected ? 'border-borboleta-purple-600 bg-borboleta-purple-600' : 'border-muted-foreground'
                    }`}>
                      {selected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Invoice toggle */}
      <div className="mb-6 rounded-2xl border-2 border-borboleta-gold-300 bg-borboleta-gold-50 dark:bg-borboleta-gold-900/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-semibold flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              ¿Con factura oficial?
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Sin factura (efectivo/QR): 4% de descuento adicional
            </p>
          </div>
          <Switch
            checked={conFactura}
            onCheckedChange={setConFactura}
            aria-label="Toggle factura"
          />
        </div>
      </div>

      {/* Total preview */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-borboleta-purple-600 to-borboleta-purple-800 p-6 text-white">
        <p className="text-white/70 text-sm mb-1">Presupuesto estimado</p>
        <p className="font-display text-4xl font-bold">{formatCurrency(total)}</p>
        <div className="mt-3 text-xs text-white/60 space-y-1">
          <div className="flex justify-between">
            <span>Base del salón</span>
            <span>{formatCurrency(baseTotal)}</span>
          </div>
          {menuTotal > 0 && (
            <div className="flex justify-between">
              <span>Menú</span>
              <span>{formatCurrency(menuTotal)}</span>
            </div>
          )}
          {extrasTotal > 0 && (
            <div className="flex justify-between">
              <span>Servicios extra</span>
              <span>{formatCurrency(extrasTotal)}</span>
            </div>
          )}
          {!conFactura && (
            <div className="flex justify-between text-green-300">
              <span>Descuento sin factura (4%)</span>
              <span>-{formatCurrency(subtotal * 0.04)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
          ← Atrás
        </Button>
        <Button variant="gradient" onClick={() => setStep(5)} className="flex-[2]">
          Ver resumen →
        </Button>
      </div>
    </div>
  )
}
