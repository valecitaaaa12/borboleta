'use client'

import { useEffect, useState } from 'react'
import { useCotizadorStore } from '@/lib/cotizador-store'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface MenuItem {
  id: string
  nombre: string
  descripcion?: string
  precio_por_persona: number
  categoria: string
  foto_url?: string
}

// Fallback menus if API is not ready
const FALLBACK_MENUS: MenuItem[] = [
  { id: 'm1', nombre: 'Menú Ejecutivo', descripcion: 'Entrada, segundo y bebida. Ideal para eventos corporativos.', precio_por_persona: 85, categoria: 'Ejecutivo' },
  { id: 'm2', nombre: 'Menú Clásico', descripcion: 'Entrada, sopa, segundo, postre y bebida. La elección más popular.', precio_por_persona: 120, categoria: 'Clásico' },
  { id: 'm3', nombre: 'Menú Gourmet', descripcion: '5 tiempos completos con opciones premium. Carnes seleccionadas.', precio_por_persona: 180, categoria: 'Gourmet' },
  { id: 'm4', nombre: 'Menú Infantil', descripcion: 'Diseñado especialmente para los más pequeños. Porciones adecuadas.', precio_por_persona: 65, categoria: 'Infantil' },
]

export function Step3Menu() {
  const { menuId, numInvitados, setMenuId, setStep } = useCotizadorStore()
  const [menus, setMenus] = useState<MenuItem[]>(FALLBACK_MENUS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/menus')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) setMenus(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const selectedMenu = menus.find((m) => m.id === menuId)

  return (
    <div className="rounded-3xl bg-card border shadow-xl p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">Selecciona tu menú</h2>
      <p className="text-muted-foreground mb-6">
        Elige el menú para tus {numInvitados} invitados. Puedes personalizar los platillos más adelante.
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-borboleta-purple-500" />
        </div>
      ) : (
        <div className="grid gap-3 mb-6">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setMenuId(menu.id, menu.precio_por_persona)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                menuId === menu.id
                  ? 'border-borboleta-purple-600 bg-borboleta-purple-50 dark:bg-borboleta-purple-900/30'
                  : 'border-border hover:border-borboleta-purple-300'
              }`}
              aria-pressed={menuId === menu.id}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{menu.nombre}</p>
                  {menu.descripcion && (
                    <p className="text-sm text-muted-foreground mt-0.5">{menu.descripcion}</p>
                  )}
                  <p className="text-xs text-borboleta-purple-600 font-medium mt-1">
                    Categoría: {menu.categoria}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-display text-lg font-bold text-borboleta-purple-600">
                    {formatCurrency(menu.precio_por_persona)}
                  </p>
                  <p className="text-xs text-muted-foreground">por persona</p>
                  <p className="text-xs font-semibold text-borboleta-gold-600 mt-1">
                    Total: {formatCurrency(menu.precio_por_persona * numInvitados)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedMenu && (
        <div className="mb-6 rounded-2xl bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">Costo del menú seleccionado</p>
          <p className="font-display text-2xl font-bold text-borboleta-purple-600">
            {formatCurrency(selectedMenu.precio_por_persona * numInvitados)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(selectedMenu.precio_por_persona)} × {numInvitados} personas
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          ← Atrás
        </Button>
        <Button variant="gradient" onClick={() => setStep(4)} className="flex-[2]">
          {menuId ? 'Continuar →' : 'Saltar menú →'}
        </Button>
      </div>
    </div>
  )
}
