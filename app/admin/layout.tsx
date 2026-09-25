import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()
  
  if (!session || (session.user.rol !== 'ADMIN' && session.user.rol !== 'COORDINADOR')) {
    redirect('/auth/login?callbackUrl=/admin')
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar userRol={session.user.rol} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={session.user} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
