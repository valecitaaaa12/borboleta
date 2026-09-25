import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/client'

export async function GET() {
  try {
    // Verifica conexión a PostgreSQL
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'ok',
      servicio: 'Borboleta Salón de Eventos',
      base_de_datos: 'conectada',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        servicio: 'Borboleta Salón de Eventos',
        base_de_datos: 'desconectada',
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 503 }
    )
  }
}
