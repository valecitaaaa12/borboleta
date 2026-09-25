import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://borboleta.bo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/sobre-nosotros', '/cotizador', '/galeria', '/menus',
    '/blog', '/faq', '/contacto', '/planos', '/privacidad', '/terminos',
    '/auth/login', '/auth/register',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/cotizador' ? 0.9 : 0.7,
  }))
}
