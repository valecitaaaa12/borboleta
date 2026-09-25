import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma/client'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendarDays, Music, FileText, CreditCard } from 'lucide-react'

export default async function PortalPage() {
  const session = await getAuthSession()
  if (!session) return null

  const eventos = await prisma.evento.findMany({
    where: { cliente_id: session.user.id },
    include: { pagos: true },
    orderBy: { fecha: 'desc' },
  })

  const cotizaciones = await prisma.cotizacion.findMany({
    where: { email_cliente: session.user.email! },
    orderBy: { fecha_creacion: 'desc' },
    take: 5,
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">
          ¡Hola, {session.user.name?.split(' ')[0]}! 🦋
        </h1>
        <p className="text-muted-foreground mt-1">Bienvenido a tu portal de eventos en Borboleta</p>
      </div>

      {/* Active events */}
      {eventos.length > 0 ? (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-semibold">Mis Eventos</h2>
          {eventos.map((evento) => {
            const totalPagado = evento.pagos.reduce((sum, p) => sum + p.monto_pagado, 0)
            const progreso = evento.monto_total > 0 ? (totalPagado / evento.monto_total) * 100 : 0

            return (
              <Card key={evento.id} className="overflow-hidden">
                <div className={`h-2 ${
                  evento.estado === 'CONFIRMADO' ? 'bg-green-500' :
                  evento.estado === 'PENDIENTE' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{evento.tipo_evento}</h3>
                        <Badge variant={
                          evento.estado === 'CONFIRMADO' ? 'success' :
                          evento.estado === 'PENDIENTE' ? 'warning' : 'destructive'
                        }>
                          {evento.estado}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(evento.fecha)}
                      </p>
                      <p className="text-sm text-muted-foreground">{evento.num_invitados} invitados</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-borboleta-purple-600">
                        {formatCurrency(evento.monto_total)}
                      </p>
                      <p className="text-xs text-muted-foreground">Total del evento</p>
                    </div>
                  </div>

                  {/* Payment progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Progreso de pago</span>
                      <span className="text-muted-foreground">
                        {formatCurrency(totalPagado)} / {formatCurrency(evento.monto_total)}
                      </span>
                    </div>
                    <Progress value={progreso} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">{Math.round(progreso)}% pagado</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/portal/pagos">
                      <Button size="sm" variant="outline" className="gap-1">
                        <CreditCard className="h-3.5 w-3.5" /> Ver pagos
                      </Button>
                    </Link>
                    <Link href="/portal/playlist">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Music className="h-3.5 w-3.5" /> Mi playlist
                      </Button>
                    </Link>
                    <Link href="/portal/contrato">
                      <Button size="sm" variant="outline" className="gap-1">
                        <FileText className="h-3.5 w-3.5" /> Contrato
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-4xl mb-3">🦋</p>
            <h3 className="font-serif text-xl font-semibold mb-2">Aún no tienes eventos confirmados</h3>
            <p className="text-muted-foreground mb-4">
              Una vez que confirmes tu reserva con el equipo de Borboleta, 
              podrás ver el progreso aquí.
            </p>
            <Link href="/cotizador">
              <Button variant="gradient">Cotizar mi evento</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent quotes */}
      {cotizaciones.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4">Mis Cotizaciones</h2>
          <div className="space-y-3">
            {cotizaciones.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <div>
                  <p className="font-medium">{c.tipo_evento} — {c.num_invitados} personas</p>
                  <p className="text-xs text-muted-foreground">{formatDate(c.fecha_creacion)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-borboleta-purple-600">{formatCurrency(c.presupuesto_estimado)}</p>
                  <Badge variant="secondary">{c.estado}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
