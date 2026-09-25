import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { StatsCounter } from '@/components/home/stats-counter'
import { PackagesPreview } from '@/components/home/packages-preview'
import { TestimonialsPreview } from '@/components/home/testimonials-preview'
import { MapPreview } from '@/components/home/map-preview'
import { EventTypesSection } from '@/components/home/event-types'
import { NewsletterSection } from '@/components/home/newsletter'
import { AlliesSection } from '@/components/home/allies'
import { ExitIntentPopup } from '@/components/home/exit-intent-popup'

export const metadata: Metadata = {
  title: 'Borboleta Salón de Eventos | Sucre, Bolivia',
  description:
    'Bienvenido a Borboleta, el salón de eventos más elegante de Sucre, Bolivia. Bodas, quinceañeras, eventos corporativos y fiestas infantiles. Cotiza gratis.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventTypesSection />
      <StatsCounter />
      <PackagesPreview />
      <TestimonialsPreview />
      <MapPreview />
      <AlliesSection />
      <NewsletterSection />
      <ExitIntentPopup />
    </>
  )
}
