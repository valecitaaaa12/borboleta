'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { FileText, Calendar, Users, TrendingUp, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  totalCotizaciones: number
  cotizacionesNuevas: number
  totalEventos: number
  eventosConfirmados: number
  totalSuscriptores: number
  ingresosMes: number
  eventosPorTipo: { tipo: string; count: number }[]
  monthlyRevenue: { month: string; revenue: number }[]
}

const TIPO_COLORS: Record<string, string> = {
  BODA: '#e879a0',
  QUINCEANERA: '#9333ea',
  CORPORATIVO: '#3b82f6',
  INFANTIL: '#f59e0b',
  OTRO: '#6b7280',
}

const TIPO_LABELS: Record<string, string> = {
  BODA: '💍 Boda',
  QUINCEANERA: '👑 Quinceañera',
  CORPORATIVO: '💼 Corporativo',
  INFANTIL: '🎈 Infantil',
  OTRO: '🎊 Otro',
}

export function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-borboleta-purple-500" />
      </div>
    )
  }

  if (!stats) return <p>Error cargando estadísticas</p>

  const statCards = [
    {
      title: 'Cotizaciones totales',
      value: stats.totalCotizaciones,
      sub: `${stats.cotizacionesNuevas} nuevas`,
      icon: FileText,
      color: 'text-borboleta-purple-600',
      bg: 'bg-borboleta-purple-50 dark:bg-borboleta-purple-900/20',
    },
    {
      title: 'Eventos confirmados',
      value: stats.eventosConfirmados,
      sub: `de ${stats.totalEventos} totales`,
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Suscriptores',
      value: stats.totalSuscriptores,
      sub: 'Newsletter activos',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Ingresos este mes',
      value: formatCurrency(stats.ingresosMes),
      sub: 'Eventos confirmados',
      icon: TrendingUp,
      color: 'text-borboleta-gold-600',
      bg: 'bg-borboleta-gold-50 dark:bg-borboleta-gold-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Resumen de actividad de Borboleta</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className={`mt-1 text-2xl font-bold ${card.color}`}>{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </div>
                  <div className={`rounded-xl ${card.bg} p-3`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly revenue */}
        {stats.monthlyRevenue.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ingresos por mes (Bs.)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                  <Bar dataKey="revenue" fill="#9333ea" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Events by type */}
        {stats.eventosPorTipo.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Eventos por tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.eventosPorTipo.map((e) => ({
                      name: TIPO_LABELS[e.tipo] || e.tipo,
                      value: e.count,
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {stats.eventosPorTipo.map((e, i) => (
                      <Cell key={i} fill={TIPO_COLORS[e.tipo] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
