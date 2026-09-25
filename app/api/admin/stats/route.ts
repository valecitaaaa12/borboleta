import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  const session = await getAuthSession()
  if (!session || session.user.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const [
    totalCotizaciones,
    cotizacionesNuevas,
    totalEventos,
    eventosConfirmados,
    totalSuscriptores,
    ingresosMes,
  ] = await Promise.all([
    prisma.cotizacion.count(),
    prisma.cotizacion.count({ where: { estado: 'nueva' } }),
    prisma.evento.count(),
    prisma.evento.count({ where: { estado: 'CONFIRMADO' } }),
    prisma.suscriptor.count({ where: { activo: true } }),
    prisma.evento.aggregate({
      _sum: { monto_total: true },
      where: {
        estado: 'CONFIRMADO',
        fecha: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ])

  // Events by type
  const eventosPorTipo = await prisma.evento.groupBy({
    by: ['tipo_evento'],
    _count: { tipo_evento: true },
  })

  // Monthly revenue last 6 months
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const eventosMes = await prisma.evento.findMany({
    where: { fecha: { gte: sixMonthsAgo }, estado: 'CONFIRMADO' },
    select: { fecha: true, monto_total: true },
  })

  const monthlyRevenue: Record<string, number> = {}
  eventosMes.forEach((e) => {
    const key = `${e.fecha.getFullYear()}-${String(e.fecha.getMonth() + 1).padStart(2, '0')}`
    monthlyRevenue[key] = (monthlyRevenue[key] || 0) + e.monto_total
  })

  return NextResponse.json({
    totalCotizaciones,
    cotizacionesNuevas,
    totalEventos,
    eventosConfirmados,
    totalSuscriptores,
    ingresosMes: ingresosMes._sum.monto_total || 0,
    eventosPorTipo: eventosPorTipo.map((e) => ({
      tipo: e.tipo_evento,
      count: e._count.tipo_evento,
    })),
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    })),
  })
}
