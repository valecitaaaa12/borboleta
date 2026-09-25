import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function GET() {
  const menus = await prisma.menu.findMany({
    where: { activo: true },
    include: { platillos: true },
    orderBy: { nombre: 'asc' },
  })
  return NextResponse.json(menus)
}

const menuSchema = z.object({
  nombre: z.string().min(2),
  descripcion: z.string().optional(),
  precio_por_persona: z.number().min(0),
  categoria: z.string(),
  foto_url: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || session.user.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const data = menuSchema.parse(body)
  const menu = await prisma.menu.create({ data })
  return NextResponse.json(menu, { status: 201 })
}
