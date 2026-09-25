import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tipo = searchParams.get('tipo')
  
  const items = await prisma.galeriaItem.findMany({
    where: {
      activo: true,
      ...(tipo && tipo !== 'TODOS' ? { tipo_evento: tipo as any } : {}),
    },
    orderBy: [{ orden: 'asc' }, { creado_en: 'desc' }],
  })

  return NextResponse.json(items)
}

const galeriaSchema = z.object({
  url: z.string().url(),
  tipo_evento: z.enum(['BODA', 'QUINCEANERA', 'CORPORATIVO', 'INFANTIL', 'OTRO']),
  descripcion: z.string().optional(),
  alt: z.string().optional(),
  orden: z.number().default(0),
})

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || session.user.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const data = galeriaSchema.parse(body)
  const item = await prisma.galeriaItem.create({ data })
  return NextResponse.json(item, { status: 201 })
}
