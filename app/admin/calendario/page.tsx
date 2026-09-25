import type { Metadata } from 'next'
import { CalendarioAdmin } from '@/components/admin/calendario-admin'

export const metadata: Metadata = { title: 'Calendario | Borboleta Admin' }

export default function CalendarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Calendario de Disponibilidad</h1>
        <p className="text-muted-foreground text-sm">Gestiona los días disponibles, ocupados y provisionales</p>
      </div>
      <CalendarioAdmin />
    </div>
  )
}
