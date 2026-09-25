import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TipoEvento = 'BODA' | 'QUINCEANERA' | 'CORPORATIVO' | 'INFANTIL' | 'OTRO'

export interface CotizadorState {
  // Step tracking
  step: number
  // Step 1
  tipoEvento: TipoEvento | ''
  paqueteId: string
  // Step 2
  numInvitados: number
  fechaEvento: string
  montajeTipo: string
  // Step 3
  menuId: string
  menuPrecio: number
  // Step 4
  serviciosExtra: string[]
  // Step 5
  conFactura: boolean
  // Contact info
  nombre: string
  email: string
  telefono: string
  notas: string
  // Calculated
  presupuestoBase: number
  presupuestoTotal: number

  // Actions
  setStep: (step: number) => void
  setTipoEvento: (tipo: TipoEvento) => void
  setPaqueteId: (id: string) => void
  setNumInvitados: (n: number) => void
  setFechaEvento: (fecha: string) => void
  setMontajeTipo: (tipo: string) => void
  setMenuId: (id: string, precio: number) => void
  toggleServicioExtra: (id: string, precio: number) => void
  setConFactura: (v: boolean) => void
  setContacto: (data: { nombre: string; email: string; telefono: string; notas: string }) => void
  calcularPresupuesto: (extras: { id: string; precio: number }[]) => void
  reset: () => void
}

const initialState = {
  step: 1,
  tipoEvento: '' as const,
  paqueteId: '',
  numInvitados: 100,
  fechaEvento: '',
  montajeTipo: 'banquete',
  menuId: '',
  menuPrecio: 0,
  serviciosExtra: [] as string[],
  conFactura: true,
  nombre: '',
  email: '',
  telefono: '',
  notas: '',
  presupuestoBase: 0,
  presupuestoTotal: 0,
}

// Base prices per person per event type (Bs.)
const BASE_PRICES: Record<string, number> = {
  BODA: 350,
  QUINCEANERA: 280,
  CORPORATIVO: 220,
  INFANTIL: 180,
  OTRO: 200,
}

// Montaje multipliers
const MONTAJE_MULT: Record<string, number> = {
  banquete: 1.0,
  auditorio: 0.85,
  cocktail: 0.75,
  banquete_pista: 1.15,
  auditorio_pista: 1.0,
}

export const useCotizadorStore = create<CotizadorState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),
      setTipoEvento: (tipoEvento) => set({ tipoEvento }),
      setPaqueteId: (paqueteId) => set({ paqueteId }),
      setNumInvitados: (numInvitados) => set({ numInvitados }),
      setFechaEvento: (fechaEvento) => set({ fechaEvento }),
      setMontajeTipo: (montajeTipo) => set({ montajeTipo }),
      setMenuId: (menuId, menuPrecio) => set({ menuId, menuPrecio }),
      toggleServicioExtra: (id, precio) => {
        const state = get()
        const exists = state.serviciosExtra.includes(id)
        set({
          serviciosExtra: exists
            ? state.serviciosExtra.filter((s) => s !== id)
            : [...state.serviciosExtra, id],
        })
      },
      setConFactura: (conFactura) => set({ conFactura }),
      setContacto: (data) => set(data),

      calcularPresupuesto: (extras) => {
        const state = get()
        const basePerPerson = BASE_PRICES[state.tipoEvento] || 200
        const montajeMult = MONTAJE_MULT[state.montajeTipo] || 1.0
        const menuExtra = state.menuPrecio
        const serviciosTotal = extras
          .filter((e) => state.serviciosExtra.includes(e.id))
          .reduce((sum, e) => sum + e.precio, 0)

        const base = basePerPerson * state.numInvitados * montajeMult
        const withMenu = base + menuExtra * state.numInvitados
        const withServices = withMenu + serviciosTotal
        const withFactura = state.conFactura ? withServices : withServices * 0.96

        set({
          presupuestoBase: Math.round(base),
          presupuestoTotal: Math.round(withFactura),
        })
      },

      reset: () => set(initialState),
    }),
    {
      name: 'borboleta-cotizador',
      partialize: (state) => ({
        tipoEvento: state.tipoEvento,
        numInvitados: state.numInvitados,
        fechaEvento: state.fechaEvento,
        nombre: state.nombre,
        email: state.email,
      }),
    }
  )
)
