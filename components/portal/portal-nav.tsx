'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Home, Calendar, Music, FileText, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const portalLinks = [
  { href: '/portal', label: 'Mi Evento', icon: Home },
  { href: '/portal/pagos', label: 'Pagos', icon: CreditCard },
  { href: '/portal/playlist', label: 'Playlist', icon: Music },
  { href: '/portal/contrato', label: 'Contrato', icon: FileText },
]

export function PortalNav({ user }: { user: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/1.webp" alt="Logo" width={36} height={36} className="object-contain" />
            <span className="font-display font-semibold hidden sm:block">Portal del Cliente</span>
          </Link>
          <nav className="flex items-center gap-1 ml-4" aria-label="Portal navigation">
            {portalLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'bg-borboleta-purple-100 text-borboleta-purple-700' : 'text-muted-foreground hover:bg-muted'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground hidden md:block">{user.name}</p>
          <Button variant="ghost" size="sm" onClick={() => signOut()} className="gap-1">
            <LogOut className="h-4 w-4" />
            <span className="hidden md:block">Salir</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
