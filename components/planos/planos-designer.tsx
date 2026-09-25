'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RotateCcw, Download } from 'lucide-react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 500

const FURNITURE_ITEMS = [
  { id: 'mesa-redonda', label: 'Mesa redonda', emoji: '⭕', width: 60, height: 60, color: '#e0d0ff' },
  { id: 'mesa-rect', label: 'Mesa rectangular', emoji: '▭', width: 80, height: 50, color: '#fde8a0' },
  { id: 'pista', label: 'Pista de baile', emoji: '💃', width: 120, height: 120, color: '#ffd6e7' },
  { id: 'escenario', label: 'Escenario', emoji: '🎤', width: 160, height: 60, color: '#d0f0ff' },
  { id: 'barra', label: 'Barra', emoji: '🍹', width: 100, height: 40, color: '#d0ffd6' },
  { id: 'dj', label: 'Cabina DJ', emoji: '🎧', width: 80, height: 60, color: '#ffd0d0' },
  { id: 'buffet', label: 'Buffet', emoji: '🍽️', width: 120, height: 45, color: '#fff0d0' },
]

interface PlacedItem {
  instanceId: string
  itemId: string
  x: number
  y: number
  label: string
  emoji: string
  width: number
  height: number
  color: string
}

let instanceCounter = 0

function DraggableToolbarItem({ item }: { item: typeof FURNITURE_ITEMS[0] }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbar-${item.id}`,
    data: { fromToolbar: true, item },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging ? 'opacity-50' : 'hover:border-borboleta-purple-400 hover:bg-borboleta-purple-50 dark:hover:bg-borboleta-purple-900/20'
      }`}
      style={{ borderColor: item.color, backgroundColor: item.color + '40' }}
    >
      <span className="text-2xl" role="img" aria-hidden="true">{item.emoji}</span>
      <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
    </div>
  )
}

function PlacedFurniture({ item, onRemove }: { item: PlacedItem; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.instanceId,
    data: { fromCanvas: true, item },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute flex flex-col items-center justify-center rounded-lg border-2 cursor-grab active:cursor-grabbing select-none group transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        borderColor: item.color,
        backgroundColor: item.color + '80',
      }}
    >
      <span className="text-lg" role="img" aria-hidden="true">{item.emoji}</span>
      <span className="text-xs font-medium leading-tight text-center px-1">{item.label}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove() }}
        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        aria-label="Eliminar elemento"
      >
        ×
      </button>
    </div>
  )
}

function DroppableCanvas({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  return (
    <div
      ref={setNodeRef}
      className={`relative rounded-2xl border-2 overflow-hidden transition-colors ${
        isOver ? 'border-borboleta-purple-500 bg-borboleta-purple-50/50 dark:bg-borboleta-purple-900/10' : 'border-dashed border-gray-300 bg-gray-50 dark:bg-gray-900/30'
      }`}
      style={{ width: '100%', aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`, minHeight: 300 }}
    >
      {/* Room outline */}
      <div className="absolute inset-4 rounded-xl border-2 border-gray-200 dark:border-gray-700" />
      <p className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        Salón Borboleta — {CANVAS_WIDTH/10}m × {CANVAS_HEIGHT/10}m
      </p>
      {children}
    </div>
  )
}

export function PlanosDesigner() {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, delta, over } = event

    if (!over || over.id !== 'canvas') {
      setActiveId(null)
      return
    }

    const data = active.data.current

    if (data?.fromToolbar) {
      // Add new item to canvas
      const item = data.item
      instanceCounter++
      const newItem: PlacedItem = {
        instanceId: `instance-${instanceCounter}`,
        itemId: item.id,
        label: item.label,
        emoji: item.emoji,
        width: item.width,
        height: item.height,
        color: item.color,
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 100,
      }
      setPlacedItems((prev) => [...prev, newItem])
    } else if (data?.fromCanvas) {
      // Move existing item
      setPlacedItems((prev) =>
        prev.map((item) =>
          item.instanceId === active.id
            ? {
                ...item,
                x: Math.max(0, item.x + delta.x),
                y: Math.max(0, item.y + delta.y),
              }
            : item
        )
      )
    }

    setActiveId(null)
  }, [])

  const removeItem = (instanceId: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== instanceId))
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          Arrastra los elementos al plano:
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {FURNITURE_ITEMS.map((item) => (
            <DraggableToolbarItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DroppableCanvas>
          {placedItems.map((item) => (
            <PlacedFurniture
              key={item.instanceId}
              item={item}
              onRemove={() => removeItem(item.instanceId)}
            />
          ))}
        </DroppableCanvas>
      </DndContext>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => setPlacedItems([])}
          className="gap-2"
          disabled={placedItems.length === 0}
        >
          <RotateCcw className="h-4 w-4" /> Limpiar plano
        </Button>
        <p className="text-sm text-muted-foreground">
          {placedItems.length} elemento{placedItems.length !== 1 ? 's' : ''} colocado{placedItems.length !== 1 ? 's' : ''}
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Tip: Arrastra elementos desde la barra de herramientas al plano. 
        Pasa el cursor sobre un elemento para eliminarlo. 
        Los elementos en el plano pueden moverse libremente.
      </p>
    </div>
  )
}
