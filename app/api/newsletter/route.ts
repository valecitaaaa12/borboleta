import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)

    await prisma.suscriptor.upsert({
      where: { email },
      update: { activo: true },
      create: { email, activo: true },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 400 })
  }
}
