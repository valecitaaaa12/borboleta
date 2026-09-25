'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Loader2, AlertCircle } from 'lucide-react'

interface Platillo {
  id: string
  nombre: string
  descripcion?: string
  foto_url?: string
  ingredientes: string[]
  alergenos: string[]
  tipo: string
}

interface Menu {
  id: string
  nombre: string
  descripcion?: string
  foto_url?: string
  precio_por_persona: number
  categoria: string
  platillos: Platillo[]
}

const FALLBACK_MENUS: Menu[] = [
  {
    id: '1',
    nombre: 'Menú Ejecutivo',
    descripcion: 'Ideal para eventos corporativos. Equilibrio perfecto entre calidad y practicidad.',
    precio_por_persona: 85,
    categoria: 'Ejecutivo',
    platillos: [
      { id: 'p1', nombre: 'Ensalada César', tipo: 'entrada', ingredientes: ['Lechuga romana', 'Aderezo César', 'Crutones', 'Parmesano'], alergenos: ['Lácteos', 'Gluten'], descripcion: 'Clásica ensalada César con lechuga fresca y aderezo artesanal' },
      { id: 'p2', nombre: 'Pechuga a la plancha', tipo: 'principal', ingredientes: ['Pechuga de pollo', 'Hierbas finas', 'Limón', 'Aceite de oliva'], alergenos: [], descripcion: 'Pechuga jugosa marinada en hierbas frescas y limón' },
      { id: 'p3', nombre: 'Brownie de chocolate', tipo: 'postre', ingredientes: ['Chocolate negro', 'Harina', 'Huevo', 'Mantequilla'], alergenos: ['Gluten', 'Huevo', 'Lácteos'], descripcion: 'Brownie esponjoso con chocolate belga' },
    ],
  },
  {
    id: '2',
    nombre: 'Menú Clásico',
    descripcion: 'El favorito de nuestros clientes. 4 tiempos que conquistan paladares.',
    precio_por_persona: 120,
    categoria: 'Clásico',
    platillos: [
      { id: 'p4', nombre: 'Crema de zapallo', tipo: 'sopa', ingredientes: ['Zapallo', 'Crema de leche', 'Jengibre', 'Nuez moscada'], alergenos: ['Lácteos'], descripcion: 'Suave crema de zapallo con toque de jengibre' },
      { id: 'p5', nombre: 'Carpaccio de res', tipo: 'entrada', ingredientes: ['Lomo fino', 'Alcaparras', 'Rúcula', 'Parmesano'], alergenos: ['Lácteos'], descripcion: 'Finas láminas de lomo con aderezo de limón' },
      { id: 'p6', nombre: 'Lomo saltado', tipo: 'principal', ingredientes: ['Lomo de res', 'Tomate', 'Cebolla', 'Papas fritas', 'Soya'], alergenos: ['Soya'], descripcion: 'Clásico lomo saltado estilo boliviano' },
      { id: 'p7', nombre: 'Flan de vainilla', tipo: 'postre', ingredientes: ['Leche', 'Huevo', 'Azúcar', 'Vainilla'], alergenos: ['Lácteos', 'Huevo'], descripcion: 'Flan cremoso con caramelo dorado' },
    ],
  },
  {
    id: '3',
    nombre: 'Menú Gourmet',
    descripcion: 'Una experiencia gastronómica de 5 tiempos con ingredientes premium.',
    precio_por_persona: 180,
    categoria: 'Gourmet',
    platillos: [
      { id: 'p8', nombre: 'Mousse de foie gras', tipo: 'amuse-bouche', ingredientes: ['Foie gras', 'Brandy', 'Crema'], alergenos: ['Lácteos', 'Alcohol'], descripcion: 'Suave mousse de foie gras con brioche tostado' },
      { id: 'p9', nombre: 'Langostinos al ajillo', tipo: 'entrada', ingredientes: ['Langostinos', 'Ajo', 'Mantequilla', 'Perejil', 'Vino blanco'], alergenos: ['Mariscos', 'Lácteos', 'Alcohol'], descripcion: 'Langostinos salteados con mantequilla al ajillo' },
      { id: 'p10', nombre: 'Sorbete de limón', tipo: 'intermedio', ingredientes: ['Limón', 'Azúcar', 'Agua', 'Menta'], alergenos: [], descripcion: 'Refrescante sorbete para limpiar el paladar' },
      { id: 'p11', nombre: 'Filete de res a la borgoña', tipo: 'principal', ingredientes: ['Filete de res', 'Vino tinto', 'Champiñones', 'Cebollita perla'], alergenos: ['Alcohol'], descripcion: 'Tierno filete en salsa de vino tinto' },
      { id: 'p12', nombre: 'Tarta de frutos rojos', tipo: 'postre', ingredientes: ['Frutillas', 'Frambuesas', 'Arándanos', 'Crema pastelera', 'Masa sablé'], alergenos: ['Gluten', 'Lácteos', 'Huevo'], descripcion: 'Tarta elegante con frutas frescas de temporada' },
    ],
  },
]

export function MenusClient() {
  const [menus, setMenus] = useState<Menu[]>(FALLBACK_MENUS)
  const [loading, setLoading] = useState(false)
  const [selectedPlatillo, setSelectedPlatillo] = useState<Platillo | null>(null)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/menus')
      .then((r) => r.json())
      .then((data) => { if (data && data.length > 0) setMenus(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-borboleta-purple-500" /></div>
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menus.map((menu, i) => (
          <motion.div
            key={menu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden border bg-card shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-borboleta-purple-600 to-borboleta-purple-800 p-6 text-white">
              <Badge className="bg-white/20 text-white border-white/30 mb-2">{menu.categoria}</Badge>
              <h2 className="font-serif text-2xl font-semibold">{menu.nombre}</h2>
              {menu.descripcion && (
                <p className="text-white/80 text-sm mt-2 leading-relaxed">{menu.descripcion}</p>
              )}
              <div className="mt-4">
                <p className="font-display text-3xl font-bold text-borboleta-gold-300">
                  {formatCurrency(menu.precio_por_persona)}
                </p>
                <p className="text-white/60 text-xs">por persona</p>
              </div>
            </div>

            {/* Platillos */}
            <div className="p-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Incluye
              </h3>
              <div className="space-y-2">
                {menu.platillos?.slice(0, 5).map((platillo) => (
                  <button
                    key={platillo.id}
                    onClick={() => { setSelectedPlatillo(platillo); setSelectedMenu(menu) }}
                    className="w-full flex items-center justify-between rounded-xl p-3 hover:bg-muted transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm font-medium group-hover:text-borboleta-purple-600 transition-colors">
                        {platillo.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{platillo.tipo}</p>
                    </div>
                    {platillo.alergenos?.length > 0 && (
                      <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" title="Contiene alérgenos" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Haz clic en un platillo para ver detalles
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platillo modal */}
      <Dialog open={!!selectedPlatillo} onOpenChange={() => setSelectedPlatillo(null)}>
        <DialogContent className="max-w-md">
          {selectedPlatillo && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">{selectedPlatillo.nombre}</DialogTitle>
              </DialogHeader>
              {selectedPlatillo.foto_url ? (
                <Image src={selectedPlatillo.foto_url} alt={selectedPlatillo.nombre} width={400} height={250} className="w-full rounded-xl object-cover" />
              ) : (
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-borboleta-purple-100 to-borboleta-gold-100 flex items-center justify-center">
                  <span className="text-5xl">🍽️</span>
                </div>
              )}
              {selectedPlatillo.descripcion && (
                <p className="text-muted-foreground text-sm">{selectedPlatillo.descripcion}</p>
              )}
              <div>
                <p className="text-sm font-semibold mb-2">Ingredientes principales:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedPlatillo.ingredientes?.map((ing) => (
                    <Badge key={ing} variant="secondary" className="text-xs">{ing}</Badge>
                  ))}
                </div>
              </div>
              {selectedPlatillo.alergenos?.length > 0 && (
                <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3">
                  <p className="text-sm font-semibold text-yellow-800 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> Alérgenos
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedPlatillo.alergenos.map((al) => (
                      <Badge key={al} variant="warning" className="text-xs">{al}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
