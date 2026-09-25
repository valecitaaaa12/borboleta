'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, Music, Save, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

interface Cancion {
  titulo: string
  artista: string
  url?: string
  momento?: string
}

export default function PlaylistPage() {
  const { toast } = useToast()
  const [canciones, setCanciones] = useState<Cancion[]>([])
  const [nueva, setNueva] = useState<Cancion>({ titulo: '', artista: '', url: '', momento: '' })
  const [saving, setSaving] = useState(false)

  const addCancion = () => {
    if (!nueva.titulo || !nueva.artista) return
    setCanciones([...canciones, nueva])
    setNueva({ titulo: '', artista: '', url: '', momento: '' })
  }

  const removeCancion = (i: number) => {
    setCanciones(canciones.filter((_, idx) => idx !== i))
  }

  const save = async () => {
    setSaving(true)
    try {
      // In a real app, this would save to the event's playlist
      await new Promise((r) => setTimeout(r, 1000))
      toast({ title: '¡Playlist guardada! 🎵', description: 'Tu lista de canciones fue actualizada.' })
    } finally {
      setSaving(false)
    }
  }

  const momentos = ['Entrada', 'Recepción', 'Cena', 'Baile', 'Brindis', 'Cierre', 'Otro']

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold flex items-center gap-2">
          <Music className="h-7 w-7 text-borboleta-purple-500" />
          Mi Playlist
        </h1>
        <p className="text-muted-foreground mt-1">
          Crea la banda sonora perfecta para tu evento. El DJ revisará tus selecciones.
        </p>
      </div>

      {/* Add song form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Agregar canción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={nueva.titulo}
                onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
                placeholder="Nombre de la canción"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="artista">Artista *</Label>
              <Input
                id="artista"
                value={nueva.artista}
                onChange={(e) => setNueva({ ...nueva, artista: e.target.value })}
                placeholder="Nombre del artista"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="url">Link (YouTube/Spotify)</Label>
              <Input
                id="url"
                value={nueva.url}
                onChange={(e) => setNueva({ ...nueva, url: e.target.value })}
                placeholder="https://..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="momento">Momento del evento</Label>
              <select
                id="momento"
                value={nueva.momento}
                onChange={(e) => setNueva({ ...nueva, momento: e.target.value })}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                {momentos.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <Button onClick={addCancion} variant="outline" className="gap-2" disabled={!nueva.titulo || !nueva.artista}>
            <Plus className="h-4 w-4" /> Agregar canción
          </Button>
        </CardContent>
      </Card>

      {/* Song list */}
      {canciones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mi lista ({canciones.length} canciones)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {canciones.map((cancion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-borboleta-purple-100 text-borboleta-purple-600 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{cancion.titulo}</p>
                    <p className="text-xs text-muted-foreground">{cancion.artista}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cancion.momento && (
                    <span className="rounded-full bg-borboleta-purple-100 px-2 py-0.5 text-xs text-borboleta-purple-600">
                      {cancion.momento}
                    </span>
                  )}
                  <button
                    onClick={() => removeCancion(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Eliminar canción"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            <Button onClick={save} variant="gradient" className="w-full gap-2 mt-4" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Guardando...' : 'Guardar playlist'}
            </Button>
          </CardContent>
        </Card>
      )}

      {canciones.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Music className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Aún no has agregado canciones</p>
          <p className="text-sm mt-1">¡Comienza a construir la banda sonora de tu evento!</p>
        </div>
      )}
    </div>
  )
}
