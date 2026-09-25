'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Calendar, Users, UtensilsCrossed,
  Image as ImageIcon, Star, HelpCircle, BookOpen, Package,
  Warehouse, Settings, ChevronLeft, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: FileText },
  { href: '/admin/calendario', label: 'Calendario', icon: Calendar },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/menus', label: 'Menús', icon: UtensilsCrossed },
  { href: '/admin/galeria', label: 'Galería', icon: ImageIcon },
  { href: '/admin/testimonios', label: 'Testimonios', icon: Star },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/inventario', label: 'Inventario', icon: Warehouse },
  { href: '/admin/config', label: 'Configuración', icon: Settings, adminOnly: true },
]

export function AdminSidebar({ userRol }: { userRol: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const isAdmin = userRol === 'ADMIN'

  return (
    <aside
      className={cn(
        'flex flex-col bg-borboleta-purple-950 text-white transition-all duration-300 z-30',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image src="/1.webp" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="font-display font-semibold text-sm">Borboleta Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1 hover:bg-white/10 transition-colors ml-auto"
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto" aria-label="Menú de administración">
        {adminLinks.map((link) => {
          if (link.adminOnly && !isAdmin) return null
          const Icon = link.icon
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-borboleta-purple-700 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Back to site */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-white transition-colors"
          >
            ← Volver al sitio
          </Link>
        </div>
      )}
    </aside>
  )
}
