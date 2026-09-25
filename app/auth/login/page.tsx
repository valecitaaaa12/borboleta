'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-borboleta-purple-900 via-borboleta-purple-800 to-borboleta-purple-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl bg-white dark:bg-gray-900 shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Image src="/1.webp" alt="Borboleta Logo" width={60} height={60} className="object-contain" />
            </div>
            <h1 className="font-serif text-2xl font-semibold">Iniciar Sesión</h1>
            <p className="text-muted-foreground text-sm mt-1">Accede a tu portal de eventos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="mt-1"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
            )}

            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Ingresando...</>
              ) : (
                '🦋 Ingresar'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
          <p className="text-center mt-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Volver al inicio
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-white text-sm">
          <p className="font-semibold mb-2">🔐 Credenciales de prueba</p>
          <p>Admin: <code className="bg-white/20 px-1 rounded">admin@borboleta.bo</code> / <code className="bg-white/20 px-1 rounded">Admin123!</code></p>
          <p className="mt-1">Cliente: <code className="bg-white/20 px-1 rounded">cliente@borboleta.bo</code> / <code className="bg-white/20 px-1 rounded">Cliente123!</code></p>
        </div>
      </motion.div>
    </div>
  )
}
