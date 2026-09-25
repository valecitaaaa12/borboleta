'use client'

import { signOut } from 'next-auth/react'
import { Bell, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    rol: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <p className="text-sm text-muted-foreground">
        Panel de Administración
      </p>
      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 hover:bg-muted transition-colors" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{user.name || user.email}</span>
          <span className="rounded-full bg-borboleta-purple-100 dark:bg-borboleta-purple-900 px-2 py-0.5 text-xs font-semibold text-borboleta-purple-700 dark:text-borboleta-purple-300">
            {user.rol}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut()} aria-label="Cerrar sesión">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
