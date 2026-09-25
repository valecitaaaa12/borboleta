'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Gift } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-24" aria-label="Suscripción al newsletter">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center rounded-3xl bg-gradient-to-br from-borboleta-purple-600 to-borboleta-purple-800 p-12 text-white shadow-2xl"
        >
          <Gift className="mx-auto h-12 w-12 text-borboleta-gold-400 mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
            ¡Descuento exclusivo!
          </h2>
          <p className="text-white/80 mb-8">
            Suscríbete a nuestro newsletter y recibe <strong>5% de descuento</strong> en tu primera cotización, 
            más consejos para planificar el evento de tus sueños.
          </p>
          {status === 'success' ? (
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-xl font-semibold">🎉 ¡Suscripción exitosa!</p>
              <p className="text-white/70 mt-2">
                Revisa tu correo para obtener tu código de descuento.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="pl-10 bg-white text-gray-900 border-transparent focus-visible:ring-borboleta-gold-400"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                disabled={status === 'loading'}
                className="shrink-0"
              >
                {status === 'loading' ? 'Enviando...' : 'Obtener descuento'}
              </Button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-300">
              Hubo un error. Por favor intenta de nuevo.
            </p>
          )}
          <p className="mt-4 text-xs text-white/50">
            Sin spam. Puedes darte de baja en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
