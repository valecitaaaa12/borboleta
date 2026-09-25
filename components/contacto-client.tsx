'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'

export function ContactoClient() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '', servicio: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500))
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="font-serif text-2xl font-semibold mb-2">¡Mensaje enviado!</h3>
        <p className="text-muted-foreground">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-card border shadow-lg p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">Envíanos un mensaje</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input id="nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Tu nombre" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email-cont">Email *</Label>
          <Input id="email-cont" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="tu@email.com" required className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="telefono-cont">Teléfono</Label>
        <Input id="telefono-cont" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} placeholder="+591 xxxxxxxx" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="servicio">Servicio de interés</Label>
        <select id="servicio" value={form.servicio} onChange={e => setForm({...form, servicio: e.target.value})} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          <option value="">Seleccionar...</option>
          <option value="boda">Boda</option>
          <option value="quinceanera">Quinceañera</option>
          <option value="corporativo">Evento Corporativo</option>
          <option value="infantil">Fiesta Infantil</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <Label htmlFor="mensaje">Mensaje *</Label>
        <Textarea id="mensaje" value={form.mensaje} onChange={e => setForm({...form, mensaje: e.target.value})} placeholder="Cuéntanos sobre tu evento, fecha aproximada, número de invitados..." required rows={4} className="mt-1" />
      </div>
      <Button type="submit" variant="gradient" className="w-full gap-2" disabled={loading}>
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Enviar mensaje</>}
      </Button>
    </form>
  )
}
