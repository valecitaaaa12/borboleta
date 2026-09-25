'use client'

import { useState, useEffect } from 'react'
import { useCotizadorStore } from '@/lib/cotizador-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/utils'
import { Loader2, CheckCircle2, Download } from 'lucide-react'
import { ButterflyHover } from '@/components/animations/butterfly'
import Link from 'next/link'
import { CountdownTimer } from './countdown-timer'

export function Step5Resumen() {
  const store = useCotizadorStore()
  const {
    tipoEvento, numInvitados, fechaEvento, montajeTipo, menuId, menuPrecio,
    serviciosExtra, conFactura, presupuestoTotal,
    nombre, email, telefono, notas,
    setContacto, setStep, reset
  } = store

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !email) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_cliente: nombre,
          email_cliente: email,
          telefono_cliente: telefono,
          tipo_evento: tipoEvento,
          num_invitados: numInvitados,
          menu_id: menuId || undefined,
          servicios_extra: serviciosExtra,
          montaje_tipo: montajeTipo,
          presupuesto_estimado: presupuestoTotal,
          con_factura: conFactura,
          notas,
          fecha_evento: fechaEvento || undefined,
        }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Hubo un error. Por favor intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl bg-card border shadow-xl p-12 text-center">
        <ButterflyHover>
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-500 mb-4" />
        </ButterflyHover>
        <h2 className="font-serif text-3xl font-semibold mb-3">
          ¡Cotización enviada! 🦋
        </h2>
        <p className="text-muted-foreground mb-6">
          Hemos recibido tu solicitud. En las próximas 24 horas nos pondremos en contacto
          contigo al correo <strong>{email}</strong>.
        </p>
        <div className="rounded-2xl bg-muted/50 p-4 mb-6">
          <p className="text-sm text-muted-foreground">Tu presupuesto estimado es</p>
          <p className="font-display text-4xl font-bold text-borboleta-purple-600">
            {formatCurrency(presupuestoTotal)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="https://wa.me/59175791516?text=Hola, acabo de enviar una cotización desde la web">
            <Button variant="gradient" size="lg">
              Confirmar por WhatsApp
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={reset}>
            Nueva cotización
          </Button>
        </div>
      </div>
    )
  }

  const tipoLabel: Record<string, string> = {
    BODA: '💍 Boda', QUINCEANERA: '👑 Quinceañera',
    CORPORATIVO: '💼 Corporativo', INFANTIL: '🎈 Infantil', OTRO: '🎊 Otro'
  }
  const montajeLabel: Record<string, string> = {
    banquete: 'Banquete', auditorio: 'Auditorio', cocktail: 'Cóctel',
    banquete_pista: 'Banquete + Pista', auditorio_pista: 'Auditorio + Pista'
  }

  return (
    <div className="rounded-3xl bg-card border shadow-xl p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">Resumen y datos de contacto</h2>
      <p className="text-muted-foreground mb-6">Revisa tu cotización y déjanos tus datos para contactarte.</p>

      {/* Season countdown */}
      <CountdownTimer />

      {/* Summary */}
      <div className="mb-6 rounded-2xl bg-muted/30 p-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tipo de evento</span>
          <span className="font-medium">{tipoLabel[tipoEvento] || tipoEvento}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Invitados</span>
          <span className="font-medium">{numInvitados} personas</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Montaje</span>
          <span className="font-medium">{montajeLabel[montajeTipo] || montajeTipo}</span>
        </div>
        {fechaEvento && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fecha</span>
            <span className="font-medium">{new Date(fechaEvento).toLocaleDateString('es-BO')}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Factura</span>
          <span className="font-medium">{conFactura ? 'Con factura' : 'Sin factura (4% desc.)'}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold text-base">
          <span>Presupuesto estimado</span>
          <span className="text-borboleta-purple-600">{formatCurrency(presupuestoTotal)}</span>
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre completo *</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setContacto({ nombre: e.target.value, email, telefono, notas })}
              placeholder="Tu nombre"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setContacto({ nombre, email: e.target.value, telefono, notas })}
              placeholder="tu@correo.com"
              required
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setContacto({ nombre, email, telefono: e.target.value, notas })}
            placeholder="+591 xxxxxxxx"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="notas">Notas adicionales</Label>
          <Textarea
            id="notas"
            value={notas}
            onChange={(e) => setContacto({ nombre, email, telefono, notas: e.target.value })}
            placeholder="¿Tienes algún requerimiento especial o pregunta?"
            className="mt-1"
            rows={3}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => setStep(4)} className="flex-1">
            ← Atrás
          </Button>
          <Button
            type="submit"
            variant="gradient"
            disabled={submitting || !nombre || !email}
            className="flex-[2] gap-2"
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
            ) : (
              '🦋 Enviar cotización'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
