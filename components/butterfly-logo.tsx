import { cn } from '@/lib/utils'

interface ButterflyLogoProps {
  className?: string
  size?: number
  color?: string
}

/**
 * Mariposa SVG predeterminada — logo de Borboleta.
 * No depende de ningún archivo de imagen externo.
 */
export function ButterflyLogo({ className, size = 40, color = '#9333ea' }: ButterflyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Borboleta — mariposa logo"
      className={cn('shrink-0', className)}
    >
      {/* Ala superior izquierda */}
      <ellipse
        cx="28"
        cy="30"
        rx="26"
        ry="22"
        fill={color}
        opacity="0.9"
        transform="rotate(-25 28 30)"
      />
      {/* Ala inferior izquierda */}
      <ellipse
        cx="24"
        cy="62"
        rx="20"
        ry="14"
        fill={color}
        opacity="0.7"
        transform="rotate(20 24 62)"
      />
      {/* Ala superior derecha */}
      <ellipse
        cx="72"
        cy="30"
        rx="26"
        ry="22"
        fill={color}
        opacity="0.9"
        transform="rotate(25 72 30)"
      />
      {/* Ala inferior derecha */}
      <ellipse
        cx="76"
        cy="62"
        rx="20"
        ry="14"
        fill={color}
        opacity="0.7"
        transform="rotate(-20 76 62)"
      />
      {/* Cuerpo */}
      <ellipse cx="50" cy="50" rx="4" ry="18" fill="#4a1080" opacity="0.95" />
      {/* Cabeza */}
      <circle cx="50" cy="30" r="4" fill="#4a1080" opacity="0.95" />
      {/* Antena izquierda */}
      <path
        d="M47 27 Q40 15 35 10"
        stroke="#4a1080"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <circle cx="35" cy="10" r="2.5" fill="#4a1080" opacity="0.85" />
      {/* Antena derecha */}
      <path
        d="M53 27 Q60 15 65 10"
        stroke="#4a1080"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <circle cx="65" cy="10" r="2.5" fill="#4a1080" opacity="0.85" />
      {/* Detalles decorativos en alas */}
      <ellipse
        cx="32"
        cy="28"
        rx="8"
        ry="6"
        fill="white"
        opacity="0.25"
        transform="rotate(-25 32 28)"
      />
      <ellipse
        cx="68"
        cy="28"
        rx="8"
        ry="6"
        fill="white"
        opacity="0.25"
        transform="rotate(25 68 28)"
      />
    </svg>
  )
}
