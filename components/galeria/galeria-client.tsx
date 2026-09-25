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

// Placeholder items if no DB
const PLACEHOLDER_ITEMS: GaleriaItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `placeholder-${i}`,
  url: `https://picsum.photos/seed/borboleta${i + 1}/800/600`,
  tipo_evento: ['BODA', 'QUINCEANERA', 'CORPORATIVO', 'INFANTIL'][i % 4],
  descripcion: ['Boda elegante', 'Quinceañera mágica', 'Evento corporativo', 'Fiesta infantil'][i % 4],
  alt: 'Evento en Borboleta Salón',
}))

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
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow group"
                onClick={() => setSelected(item)}
              >
                <div className="relative">
                  <Image
                    src={item.url}
                    alt={item.alt || item.descripcion || 'Evento Borboleta'}
                    width={400}
                    height={300}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-borboleta-purple-900/0 group-hover:bg-borboleta-purple-900/40 transition-all duration-300 flex items-end p-4">
                    {item.descripcion && (
                      <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.descripcion}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selected && (
            <div>
              <Image
                src={selected.url}
                alt={selected.alt || selected.descripcion || ''}
                width={800}
                height={600}
                className="w-full object-cover"
              />
              {selected.descripcion && (
                <div className="p-4">
                  <p className="font-medium">{selected.descripcion}</p>
                  <p className="text-sm text-muted-foreground capitalize">{selected.tipo_evento.toLowerCase()}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
