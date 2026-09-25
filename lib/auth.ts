import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales requeridas')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password_hash) {
          throw new Error('Usuario no encontrado')
        }

        if (!user.activo) {
          throw new Error('Cuenta desactivada')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password_hash)

        if (!isValid) {
          throw new Error('Contraseña incorrecta')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          rol: user.rol,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.rol = (user as any).rol
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.rol = token.rol as string
      }
      return session
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}
