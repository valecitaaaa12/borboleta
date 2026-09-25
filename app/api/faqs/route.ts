import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    where: { activo: true },
    orderBy: [{ categoria: 'asc' }, { orden: 'asc' }],
  })
  return NextResponse.json(faqs)
}

const faqSchema = z.object({
  pregunta: z.string().min(5),
  respuesta: z.string().min(10),
  categoria: z.string().default('general'),
  orden: z.number().default(0),
})

export async function POST(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || session.user.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const body = await req.json()
  const data = faqSchema.parse(body)
  const faq = await prisma.fAQ.create({ data })
  return NextResponse.json(faq, { status: 201 })
}
