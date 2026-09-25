'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ButterflyLogo } from '@/components/butterfly-logo'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import {
  Menu, X, Sun, Moon, ChevronDown, LogOut, User, LayoutDashboard, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/sobre-nosotros' },
  {
    label: 'Servicios',
    href: '#',
    children: [
      { label: 'Bodas', href: '/galeria?tipo=BODA' },
      { label: 'Quinceañeras', href: '/galeria?tipo=QUINCEANERA' },
      { label: 'Corporativos', href: '/galeria?tipo=CORPORATIVO' },
      { label: 'Infantiles', href: '/galeria?tipo=INFANTIL' },
    ],
  },
  { label: 'Menús', href: '/menus' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/contacto' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Navegación principal">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
          <ButterflyLogo
            size={38}
            color={scrolled || pathname !== '/' ? '#9333ea' : '#ffffff'}
          />
          <span className={cn(
            'font-display text-xl font-semibold transition-colors',
            scrolled || pathname !== '/' ? 'text-foreground' : 'text-white'
          )}>
            Borboleta
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative">
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    scrolled || pathname !== '/' ? 'text-foreground' : 'text-white'
                  )}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  aria-expanded={activeDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    activeDropdown === link.label && 'rotate-180'
                  )} />
                </button>
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute left-0 top-full pt-1 z-50"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <ul className="min-w-[180px] rounded-xl border bg-popover p-2 shadow-xl" role="list">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    scrolled || pathname !== '/' ? 'text-foreground' : 'text-white',
                    pathname === link.href && 'text-primary font-semibold'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              'rounded-md p-2 transition-colors hover:bg-accent',
              scrolled || pathname !== '/' ? 'text-foreground' : 'text-white'
            )}
            aria-label="Toggle tema"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {session ? (
            <div className="flex items-center gap-2">
              {session.user.rol === 'ADMIN' && (
                <Link href="/admin">
                  <Button size="sm" variant="outline" className="gap-1">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link href="/portal">
                <Button size="sm" variant="outline" className="gap-1">
                  <User className="h-3.5 w-3.5" />
                  Mi Portal
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={() => signOut()} className="gap-1">
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button size="sm" variant="ghost" className={cn(
                  scrolled || pathname !== '/' ? '' : 'text-white hover:bg-white/20'
                )}>
                  Ingresar
                </Button>
              </Link>
              <Link href="/cotizador">
                <Button size="sm" variant="gradient" className="gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Cotizar
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={cn(
            'lg:hidden rounded-md p-2 transition-colors hover:bg-accent',
            scrolled || pathname !== '/' ? 'text-foreground' : 'text-white'
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t bg-background/98 backdrop-blur-lg lg:hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-6 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="border-t pt-4 flex flex-col gap-2">
                {session ? (
                  <>
                    <Link href="/portal" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full" variant="outline">Mi Portal</Button>
                    </Link>
                    <Button variant="ghost" onClick={() => signOut()}>Cerrar sesión</Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full" variant="outline">Ingresar</Button>
                    </Link>
                    <Link href="/cotizador" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full" variant="gradient">Cotizar ahora</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
