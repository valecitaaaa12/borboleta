'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Loader2, X } from 'lucide-react'

type TipoEvento = 'TODOS' | 'BODA' | 'QUINCEANERA' | 'CORPORATIVO' | 'INFANTIL'

interface GaleriaItem {
  id: string
  url: string
  tipo_evento: string
  descripcion?: string
  alt?: string
}

const filters: { id: TipoEvento; label: string; emoji: string }[] = [
  { id: 'TODOS', label: 'Todos', emoji: '✨' },
  { id: 'BODA', label: 'Bodas', emoji: '💍' },
  { id: 'QUINCEANERA', label: 'Quinceañeras', emoji: '👑' },
  { id: 'CORPORATIVO', label: 'Corporativos', emoji: '💼' },
  { id: 'INFANTIL', label: 'Infantiles', emoji: '🎈' },
]

// Imágenes reales del salón Borboleta
const PLACEHOLDER_ITEMS: GaleriaItem[] = [
  // BODAS
  { id: 'boda-1', url: '/images/bodas/boda-1.jpg', tipo_evento: 'BODA', descripcion: 'Boda elegante en Borboleta', alt: 'Boda en Borboleta Salón de Eventos Sucre' },
  { id: 'boda-2', url: '/images/bodas/boda-2.jpg', tipo_evento: 'BODA', descripcion: 'Ceremonia nupcial', alt: 'Ceremonia de boda en Borboleta' },
  { id: 'boda-3', url: '/images/bodas/boda-3.jpg', tipo_evento: 'BODA', descripcion: 'Recepción de boda', alt: 'Recepción de boda en Borboleta Sucre' },
  // QUINCEAÑERAS
  { id: 'quince-1', url: '/images/quinceanos/quinceanera-1.jpg', tipo_evento: 'QUINCEANERA', descripcion: 'Quinceañera mágica', alt: 'Quinceañera en Borboleta Salón' },
  { id: 'quince-2', url: '/images/quinceanos/quinceanera-2.jpg', tipo_evento: 'QUINCEANERA', descripcion: 'Celebración de 15 años', alt: 'Fiesta de 15 años en Borboleta' },
  { id: 'quince-3', url: '/images/quinceanos/quinceanera-3.webp', tipo_evento: 'QUINCEANERA', descripcion: 'Vals de quinceañera', alt: 'Vals quinceañera Borboleta Sucre' },
  // CORPORATIVOS
  { id: 'corp-1', url: '/images/corporativos/corporativo-1.jpg', tipo_evento: 'CORPORATIVO', descripcion: 'Evento corporativo de alto nivel', alt: 'Evento corporativo en Borboleta' },
  { id: 'corp-2', url: '/images/corporativos/corporativo-2.jpg', tipo_evento: 'CORPORATIVO', descripcion: 'Conferencia empresarial', alt: 'Conferencia corporativa Borboleta Sucre' },
  { id: 'corp-3', url: '/images/corporativos/corporativo-3.jpg', tipo_evento: 'CORPORATIVO', descripcion: 'Gala corporativa', alt: 'Gala empresarial Borboleta' },
  // INFANTILES
  { id: 'inf-1', url: '/images/infantiles/infantil-1.jpg', tipo_evento: 'INFANTIL', descripcion: 'Fiesta infantil mágica', alt: 'Fiesta infantil en Borboleta Sucre' },
  { id: 'inf-2', url: '/images/infantiles/infantil-2.jpg', tipo_evento: 'INFANTIL', descripcion: 'Cumpleaños para niños', alt: 'Cumpleaños infantil Borboleta' },
  { id: 'inf-3', url: '/images/infantiles/infantil-3.jpg', tipo_evento: 'INFANTIL', descripcion: 'Celebración infantil', alt: 'Fiesta de niños Borboleta Salón' },
]

export function GaleriaClient({ initialTipo }: { initialTipo?: string }) {
  const [items, setItems] = useState<GaleriaItem[]>(PLACEHOLDER_ITEMS)
  const [filter, setFilter] = useState<TipoEvento>(
    (initialTipo as TipoEvento) || 'TODOS'
  )
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<GaleriaItem | null>(null)

  useEffect(() => {
    setLoading(true)
    const url = filter === 'TODOS' ? '/api/galeria' : `/api/galeria?tipo=${filter}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) setItems(data)
        else setItems(PLACEHOLDER_ITEMS.filter((i) => filter === 'TODOS' || i.tipo_evento === filter))
      })
      .catch(() => {
        setItems(PLACEHOLDER_ITEMS.filter((i) => filter === 'TODOS' || i.tipo_evento === filter))
      })
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-borboleta-purple-600 text-white shadow-lg'
                : 'bg-muted hover:bg-muted/80'
            }`}
            aria-pressed={filter === f.id}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-borboleta-purple-500" />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group"
                onClick={() => setSelected(item)}
              >
                {/* Formato horizontal fijo 4:3 */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.url}
                    alt={item.alt || item.descripcion || 'Evento Borboleta'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-borboleta-purple-900/0 group-hover:bg-borboleta-purple-900/50 transition-all duration-300 flex items-end p-4">
                    <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {item.descripcion && (
                        <p className="text-white text-sm font-semibold">{item.descripcion}</p>
                      )}
                      <p className="text-white/70 text-xs mt-0.5 capitalize">
                        {item.tipo_evento === 'BODA' ? '💍 Boda' :
                         item.tipo_evento === 'QUINCEANERA' ? '👑 Quinceañera' :
                         item.tipo_evento === 'CORPORATIVO' ? '💼 Corporativo' :
                         item.tipo_evento === 'INFANTIL' ? '🎈 Infantil' : item.tipo_evento}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl">
          {selected && (
            <div>
              {/* Imagen horizontal 16:9 en lightbox */}
              <div className="relative w-full aspect-video">
                <Image
                  src={selected.url}
                  alt={selected.alt || selected.descripcion || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
              {selected.descripcion && (
                <div className="p-5">
                  <p className="font-semibold text-lg">{selected.descripcion}</p>
                  <p className="text-sm text-muted-foreground mt-1 capitalize">
                    {selected.tipo_evento === 'BODA' ? '💍 Boda' :
                     selected.tipo_evento === 'QUINCEANERA' ? '👑 Quinceañera' :
                     selected.tipo_evento === 'CORPORATIVO' ? '💼 Corporativo' :
                     selected.tipo_evento === 'INFANTIL' ? '🎈 Infantil' : selected.tipo_evento}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
