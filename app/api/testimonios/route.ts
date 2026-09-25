import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tipo = searchParams.get('tipo')

  const testimonios = await prisma.testimonio.findMany({
    where: {
      activo: true,
      ...(tipo && tipo !== 'TODOS' ? { tipo_evento: tipo as any } : {}),
    },
    orderBy: { creado_en: 'desc' },
  })

  return NextResponse.json(testimonios)
}

const testSchema = z.object({
  nombre_cliente: z.string().min(2),
  texto: z.string().min(10),
  tipo_evento: z.enum(['BODA', 'QUINCEANERA', 'CORPORATIVO', 'INFANTIL', 'OTRO']),
  video_url: z.string().optional(),
  foto_url: z.string().optional(),
  calificacion: z.number().min(1).max(5).default(5),
})

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || session.user.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const body = await req.json()
  const data = testSchema.parse(body)
  const item = await prisma.testimonio.create({ data })
  return NextResponse.json(item, { status: 201 })
}
