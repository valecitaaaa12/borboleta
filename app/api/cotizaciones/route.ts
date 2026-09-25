import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma/client'
import { getAuthSession } from '@/lib/auth'
import { sendEmail, cotizacionEmailTemplate } from '@/lib/email'

const cotizacionSchema = z.object({
  nombre_cliente: z.string().min(2),
  email_cliente: z.string().email(),
  telefono_cliente: z.string().optional(),
  tipo_evento: z.enum(['BODA', 'QUINCEANERA', 'CORPORATIVO', 'INFANTIL', 'OTRO']),
  num_invitados: z.number().min(1).max(500),
  menu_id: z.string().optional(),
  servicios_extra: z.array(z.string()).default([]),
  montaje_tipo: z.string(),
  presupuesto_estimado: z.number().min(0),
  con_factura: z.boolean().default(true),
  paquete_id: z.string().optional(),
  notas: z.string().optional(),
  fecha_evento: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const session = await getAuthSession()
  if (!session || (session.user.rol !== 'ADMIN' && session.user.rol !== 'COORDINADOR')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const cotizaciones = await prisma.cotizacion.findMany({
    where: estado ? { estado } : undefined,
    orderBy: { fecha_creacion: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      menu: { select: { nombre: true } },
    },
  })

  const total = await prisma.cotizacion.count({ where: estado ? { estado } : undefined })

  return NextResponse.json({ cotizaciones, total, page, limit })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = cotizacionSchema.parse(body)
    const session = await getAuthSession()

    const cotizacion = await prisma.cotizacion.create({
      data: {
        nombre_cliente: data.nombre_cliente,
        email_cliente: data.email_cliente,
        telefono_cliente: data.telefono_cliente,
        tipo_evento: data.tipo_evento,
        num_invitados: data.num_invitados,
        menu_id: data.menu_id,
        servicios_extra: data.servicios_extra,
        montaje_tipo: data.montaje_tipo,
        presupuesto_estimado: data.presupuesto_estimado,
        con_factura: data.con_factura,
        paquete_id: data.paquete_id,
        notas: data.notas,
        fecha_evento: data.fecha_evento ? new Date(data.fecha_evento) : undefined,
        cliente_id: session?.user?.id,
      },
    })

    // Send confirmation email
    const tipoLabel: Record<string, string> = {
      BODA: 'Boda', QUINCEANERA: 'Quinceañera',
      CORPORATIVO: 'Corporativo', INFANTIL: 'Infantil', OTRO: 'Otro',
    }
    
    await sendEmail({
      to: data.email_cliente,
      subject: '🦋 Borboleta - Tu cotización fue recibida',
      html: cotizacionEmailTemplate({
        nombre: data.nombre_cliente,
        tipoEvento: tipoLabel[data.tipo_evento] || data.tipo_evento,
        numInvitados: data.num_invitados,
        presupuesto: data.presupuesto_estimado,
        fecha: data.fecha_evento,
      }),
    })

    // Notify admin
    const adminEmail = process.env.EMAIL_SERVER_USER
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Nueva cotización de ${data.nombre_cliente}`,
        html: `<p>Nueva cotización recibida:<br><strong>${data.nombre_cliente}</strong> (${data.email_cliente})<br>Tipo: ${data.tipo_evento}<br>Invitados: ${data.num_invitados}<br>Presupuesto: Bs. ${data.presupuesto_estimado}</p>`,
      })
    }

    return NextResponse.json({ success: true, id: cotizacion.id })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos', details: error.errors }, { status: 400 })
    }
    console.error('Error creating cotizacion:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
