import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma/client'
import { hashPassword } from '@/lib/auth'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = schema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Este correo ya está registrado' }, { status: 400 })
    }

    const password_hash = await hashPassword(password)
    const user = await prisma.user.create({
      data: { name, email, password_hash, rol: 'CLIENTE' },
      select: { id: true, name: true, email: true, rol: true },
    })

    return NextResponse.json({ success: true, user }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
