import type { Metadata } from 'next'
import { AdminDashboardClient } from '@/components/admin/dashboard-client'

export const metadata: Metadata = { title: 'Dashboard Admin | Borboleta' }

export default function DashboardPage() {
  return <AdminDashboardClient />
}
