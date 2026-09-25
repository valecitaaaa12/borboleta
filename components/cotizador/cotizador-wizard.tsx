'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCotizadorStore } from '@/lib/cotizador-store'
import { Step1TipoEvento } from './step1-tipo-evento'
import { Step2Invitados } from './step2-invitados'
import { Step3Menu } from './step3-menu'
import { Step4Servicios } from './step4-servicios'
import { Step5Resumen } from './step5-resumen'
import { Check } from 'lucide-react'

const steps = [
  { id: 1, label: 'Tipo de evento' },
  { id: 2, label: 'Invitados y fecha' },
  { id: 3, label: 'Menú' },
  { id: 4, label: 'Extras' },
  { id: 5, label: 'Resumen' },
]

export function CotizadorWizard() {
  const { step } = useCotizadorStore()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <nav aria-label="Pasos del cotizador" className="mb-10">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.id} className="flex-1 flex items-center">
              <div className="flex flex-col items-center w-full">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    step > s.id
                      ? 'bg-borboleta-purple-600 text-white'
                      : step === s.id
                      ? 'bg-borboleta-purple-600 text-white ring-4 ring-borboleta-purple-200'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  aria-current={step === s.id ? 'step' : undefined}
                >
                  {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <span className={`hidden md:block mt-1 text-xs font-medium ${
                  step === s.id ? 'text-borboleta-purple-600' : 'text-muted-foreground'
                }`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${
                  step > s.id ? 'bg-borboleta-purple-600' : 'bg-muted'
                }`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && <Step1TipoEvento />}
          {step === 2 && <Step2Invitados />}
          {step === 3 && <Step3Menu />}
          {step === 4 && <Step4Servicios />}
          {step === 5 && <Step5Resumen />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
