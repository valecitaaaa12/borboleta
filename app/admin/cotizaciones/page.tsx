import type { Metadata } from 'next'
import prisma from '@/lib/prisma/client'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Cotizaciones | Borboleta Admin' }

const TIPO_LABELS: Record<string, string> = {
  BODA: '💍 Boda', QUINCEANERA: '👑 Quinceañera',
  CORPORATIVO: '💼 Corp.', INFANTIL: '🎈 Infantil', OTRO: '🎊 Otro',
}

export default async function CotizacionesPage({
  searchParams,
}: {
  searchParams: { page?: string; estado?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const limit = 20

  const cotizaciones = await prisma.cotizacion.findMany({
    where: searchParams.estado ? { estado: searchParams.estado } : undefined,
    orderBy: { fecha_creacion: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })

  const total = await prisma.cotizacion.count()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Cotizaciones</h1>
        <p className="text-muted-foreground text-sm">Total: {total} cotizaciones recibidas</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold">Cliente</th>
                  <th className="p-4 text-left font-semibold">Tipo</th>
                  <th className="p-4 text-center font-semibold">Invitados</th>
                  <th className="p-4 text-right font-semibold">Presupuesto</th>
                  <th className="p-4 text-center font-semibold">Factura</th>
                  <th className="p-4 text-center font-semibold">Estado</th>
                  <th className="p-4 text-left font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {cotizaciones.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium">{c.nombre_cliente}</p>
                      <p className="text-xs text-muted-foreground">{c.email_cliente}</p>
                    </td>
                    <td className="p-4">{TIPO_LABELS[c.tipo_evento] || c.tipo_evento}</td>
                    <td className="p-4 text-center">{c.num_invitados}</td>
                    <td className="p-4 text-right font-semibold text-borboleta-purple-600">
                      {formatCurrency(c.presupuesto_estimado)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={c.con_factura ? 'success' : 'warning'}>
                        {c.con_factura ? 'Sí' : 'No'}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={
                        c.estado === 'nueva' ? 'purple' :
                        c.estado === 'confirmada' ? 'success' : 'secondary'
                      }>
                        {c.estado}
                      </Badge>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">
                      {formatDate(c.fecha_creacion)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cotizaciones.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                No hay cotizaciones aún
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
