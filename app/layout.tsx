import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { CookieBanner } from '@/components/cookie-banner'
import { AccessibilityWidget } from '@/components/accessibility-widget'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Borboleta Salón de Eventos | Sucre, Bolivia',
    template: '%s | Borboleta Salón de Eventos',
  },
  description:
    'Borboleta es el salón de eventos más elegante de Sucre, Bolivia. Bodas, quinceañeras, eventos corporativos y fiestas infantiles. Más de 500 eventos realizados. Solicita tu cotización gratis.',
  keywords: [
    'salón de eventos Sucre',
    'bodas Sucre Bolivia',
    'quinceañeras Sucre',
    'eventos corporativos Sucre',
    'fiestas infantiles Sucre',
    'Borboleta salón',
    'cotizar evento Bolivia',
  ],
  authors: [{ name: 'Borboleta Salón de Eventos' }],
  creator: 'Borboleta',
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Borboleta Salón de Eventos',
    title: 'Borboleta — Salón de Eventos en Sucre, Bolivia',
    description:
      'El salón de eventos más elegante de Sucre. Bodas, quinceañeras, corporativos. +500 eventos realizados.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Borboleta Salón de Eventos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borboleta — Salón de Eventos en Sucre, Bolivia',
    description: 'El salón de eventos más elegante de Sucre. Solicita tu cotización gratis.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              name: 'Borboleta Salón de Eventos',
              description: 'Salón de eventos para bodas, quinceañeras, corporativos y fiestas infantiles en Sucre, Bolivia',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sucre',
                addressRegion: 'Chuquisaca',
                addressCountry: 'BO',
              },
              telephone: '+591 75791516',
              url: process.env.NEXT_PUBLIC_APP_URL,
              image: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-image.jpg`,
              priceRange: 'Bs. 5,000 - Bs. 50,000',
              openingHours: 'Mo-Su 09:00-21:00',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <WhatsAppButton />
            <AccessibilityWidget />
            <CookieBanner />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
