'use client'

import { useCotizadorStore } from '@/lib/cotizador-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users, Minus, Plus } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const montajeOptions = [
  { id: 'banquete', label: 'Banquete', emoji: '🍽️', desc: 'Mesas redondas — máximo aforo' },
  { id: 'auditorio', label: 'Auditorio', emoji: '🎭', desc: 'Sillas en filas — conferencias' },
  { id: 'cocktail', label: 'Cóctel', emoji: '🥂', desc: 'Sin mesas fijas — mínimo aforo' },
  { id: 'banquete_pista', label: 'Banquete + Pista', emoji: '💃', desc: 'Con pista de baile' },
  { id: 'auditorio_pista', label: 'Auditorio + Pista', emoji: '🎪', desc: 'Conferencia con espacio libre' },
]

const CAPACITY_TABLE = [
  { tipo: 'Banquete', aforo: 300, pista: 'No', icon: '🍽️' },
  { tipo: 'Auditorio', aforo: 350, pista: 'No', icon: '🎭' },
  { tipo: 'Cóctel', aforo: 400, pista: 'Si', icon: '🥂' },
  { tipo: 'Banquete + Pista', aforo: 250, pista: 'Sí', icon: '💃' },
  { tipo: 'Auditorio + Pista', aforo: 300, pista: 'Sí', icon: '🎪' },
]

export function Step2Invitados() {
  const { numInvitados, fechaEvento, montajeTipo, setNumInvitados, setFechaEvento, setMontajeTipo, setStep } = useCotizadorStore()

  const estimatedBase = numInvitados * 250
  const canContinue = numInvitados > 0 && montajeTipo !== ''

  return (
    <div className="rounded-3xl bg-card border shadow-xl p-8">
      <h2 className="font-serif text-2xl font-semibold mb-2">Invitados, fecha y montaje</h2>
      <p className="text-muted-foreground mb-6">Define los detalles básicos para calcular tu presupuesto.</p>

      {/* Guests */}
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Número de invitados
        </Label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setNumInvitados(Math.max(10, numInvitados - 10))}
            className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
            aria-label="Reducir invitados"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex-1 text-center">
            <p className="font-display text-4xl font-bold text-borboleta-purple-600">{numInvitados}</p>
            <p className="text-xs text-muted-foreground">personas</p>
          </div>
          <button
            onClick={() => setNumInvitados(Math.min(400, numInvitados + 10))}
            className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
            aria-label="Aumentar invitados"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <input
          type="range"
          min={10}
          max={400}
          step={10}
          value={numInvitados}
          onChange={(e) => setNumInvitados(Number(e.target.value))}
          className="w-full mt-3 accent-borboleta-purple-600"
          aria-label="Slider de invitados"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>10</span>
          <span>400 máx.</span>
        </div>
      </div>

      {/* Capacity table */}
      <div className="mb-6 overflow-x-auto">
        <p className="text-sm font-semibold mb-2">Capacidad por montaje</p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-2 font-semibold rounded-tl-lg">Montaje</th>
              <th className="text-center p-2 font-semibold">Aforo máx.</th>
              <th className="text-center p-2 font-semibold rounded-tr-lg">Pista de baile</th>
            </tr>
          </thead>
          <tbody>
            {CAPACITY_TABLE.map((row, i) => (
              <tr key={row.tipo} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                <td className="p-2">{row.icon} {row.tipo}</td>
                <td className="p-2 text-center font-semibold">{row.aforo}</td>
                <td className="p-2 text-center">{row.pista}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Montaje */}
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3 block">Tipo de montaje</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {montajeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMontajeTipo(opt.id)}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                montajeTipo === opt.id
                  ? 'border-borboleta-purple-600 bg-borboleta-purple-50 dark:bg-borboleta-purple-900/30'
                  : 'border-border hover:border-borboleta-purple-300'
              }`}
              aria-pressed={montajeTipo === opt.id}
            >
              <span className="mr-2" aria-hidden="true">{opt.emoji}</span>
              <span className="font-medium text-sm">{opt.label}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="mb-6">
        <Label htmlFor="fecha" className="text-base font-semibold mb-2 block">
          Fecha del evento <span className="font-normal text-muted-foreground text-sm">(opcional)</span>
        </Label>
        <Input
          id="fecha"
          type="date"
          value={fechaEvento}
          onChange={(e) => setFechaEvento(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Price preview */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-borboleta-purple-50 to-borboleta-gold-50 dark:from-borboleta-purple-900/20 dark:to-gray-800 p-4 border">
        <p className="text-sm text-muted-foreground">Estimado parcial</p>
        <p className="font-display text-2xl font-bold text-borboleta-purple-600">
          {formatCurrency(estimatedBase)}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">Precio final incluye menú y servicios</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          ← Atrás
        </Button>
        <Button
          variant="gradient"
          onClick={() => setStep(3)}
          disabled={!canContinue}
          className="flex-[2]"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
