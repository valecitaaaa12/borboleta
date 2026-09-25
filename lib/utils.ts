import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `Bs. ${amount.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateReferralCode(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'BOR-'
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateWithTax(amount: number, withInvoice: boolean): number {
  // En Bolivia, la factura incluye el IVA (13%) que ya está incluido en el precio
  // Sin factura (efectivo/QR) puede aplicar un descuento del 3-5%
  if (!withInvoice) {
    return amount * 0.96 // 4% descuento sin factura
  }
  return amount
}

export function getWhatsAppUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+59175791516'
  const cleanNumber = number.replace(/[^0-9]/g, '')
  const encodedMessage = message
    ? encodeURIComponent(message)
    : encodeURIComponent('Hola, me interesa cotizar un evento en Borboleta Salón. ¿Pueden ayudarme?')
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

export function isBirthday(birthDate: Date | null | undefined): boolean {
  if (!birthDate) return false
  const today = new Date()
  const birth = new Date(birthDate)
  return today.getDate() === birth.getDate() && today.getMonth() === birth.getMonth()
}

export function isSpecialDate(): { isSpecial: boolean; name?: string } {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const specialDates: Record<string, string> = {
    '2-14': 'San Valentín',
    '6-15': 'Aniversario Borboleta', // ejemplo
    '12-25': 'Navidad',
    '12-31': 'Año Nuevo',
  }

  const key = `${month}-${day}`
  if (specialDates[key]) {
    return { isSpecial: true, name: specialDates[key] }
  }
  return { isSpecial: false }
}
