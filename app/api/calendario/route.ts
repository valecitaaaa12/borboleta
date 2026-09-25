import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
  const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString())

  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)

  const disponibilidad = await prisma.disponibilidadCalendario.findMany({
    where: {
      fecha: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  return NextResponse.json(disponibilidad)
}

const calSchema = z.object({
  fecha: z.string(),
  estado: z.enum(['LIBRE', 'OCUPADO', 'PROVISIONAL']),
  nota: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || (session.user.rol !== 'ADMIN' && session.user.rol !== 'COORDINADOR')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const data = calSchema.parse(body)

  const item = await prisma.disponibilidadCalendario.upsert({
    where: { fecha: new Date(data.fecha) },
    update: { estado: data.estado, nota: data.nota },
    create: { fecha: new Date(data.fecha), estado: data.estado, nota: data.nota },
  })

  return NextResponse.json(item)
}
