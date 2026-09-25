import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Proteger rutas de admin
    if (pathname.startsWith('/admin')) {
      if (token?.rol !== 'ADMIN' && token?.rol !== 'COORDINADOR') {
        return NextResponse.redirect(new URL('/auth/login?callbackUrl=/admin', req.url))
      }
    }

    // Proteger rutas de portal de cliente
    if (pathname.startsWith('/portal')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login?callbackUrl=/portal', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        if (pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
}
