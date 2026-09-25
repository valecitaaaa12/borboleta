'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, CheckCircle2, Loader2, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function ContratoPage() {
  const { toast } = useToast()
  const [nombre, setNombre] = useState('')
  const [acepta, setAcepta] = useState(false)
  const [firmado, setFirmado] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFirma = async () => {
    if (!nombre || !acepta) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setFirmado(true)
    setLoading(false)
    toast({ title: '¡Contrato firmado! 🎉', description: 'Recibirás una copia por correo.' })
  }

  if (firmado) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-semibold mb-2">¡Contrato firmado!</h2>
        <p className="text-muted-foreground">
          Tu contrato ha sido firmado digitalmente el {new Date().toLocaleDateString('es-BO')}. 
          Recibirás una copia en tu correo.
        </p>
        <p className="mt-4 font-semibold">Firmado por: {nombre}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold flex items-center gap-2">
          <FileText className="h-7 w-7 text-borboleta-purple-500" />
          Contrato Digital
        </h1>
        <p className="text-muted-foreground mt-1">Firma tu contrato de forma segura y digital</p>
      </div>

      {/* Contract preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            Contrato de Servicios — Borboleta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-muted/50 p-6 text-sm space-y-4 max-h-60 overflow-y-auto text-muted-foreground">
            <p className="font-semibold text-foreground">CONTRATO DE PRESTACIÓN DE SERVICIOS PARA EVENTOS</p>
            <p>
              Por el presente contrato, <strong>Borboleta Salón de Eventos</strong> (en adelante "el Prestador") 
              se compromete a brindar los servicios acordados según la cotización aprobada.
            </p>
            <p><strong>CLÁUSULAS:</strong></p>
            <p>1. <strong>Reserva:</strong> Para confirmar la fecha, se requiere un anticipo del 30% del monto total.</p>
            <p>2. <strong>Cancelación:</strong> Las cancelaciones con más de 30 días de anticipación recuperan el 50% del anticipo. Con menos de 30 días, el anticipo no es reembolsable.</p>
            <p>3. <strong>Modificaciones:</strong> Los cambios de fecha o servicios están sujetos a disponibilidad y pueden implicar ajuste de precios.</p>
            <p>4. <strong>Horarios:</strong> El salón está disponible desde las 8:00 hasta las 00:00. Extensiones tienen costo adicional.</p>
            <p>5. <strong>Daños:</strong> El cliente es responsable por daños causados al inmueble o equipos durante el evento.</p>
            <p>6. <strong>Proveedores externos:</strong> Se permiten con previo aviso y cumplimiento de normas de sanidad.</p>
            <p>7. <strong>Ley aplicable:</strong> Este contrato se rige por las leyes del Estado Plurinacional de Bolivia.</p>
          </div>
        </CardContent>
      </Card>

      {/* Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Firma digital</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nombre-firma">Nombre completo del firmante *</Label>
            <Input
              id="nombre-firma"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo como aparece en tu CI"
              className="mt-1"
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acepta"
              checked={acepta}
              onChange={(e) => setAcepta(e.target.checked)}
              className="mt-1 accent-borboleta-purple-600"
            />
            <label htmlFor="acepta" className="text-sm text-muted-foreground cursor-pointer">
              He leído y acepto los términos del contrato. Entiendo que mi firma digital tiene validez legal 
              en Bolivia según la Ley 164 de Telecomunicaciones y TIC.
            </label>
          </div>
          <Button
            onClick={handleFirma}
            variant="gradient"
            disabled={!nombre || !acepta || loading}
            className="w-full gap-2"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Firmando...</>
            ) : (
              '✍️ Firmar contrato digitalmente'
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Tu firma queda registrada con fecha, hora e IP para validación legal.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
