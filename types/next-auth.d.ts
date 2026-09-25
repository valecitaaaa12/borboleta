import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      rol: string
    }
  }

  interface User {
    rol: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    rol: string
    id: string
  }
}
