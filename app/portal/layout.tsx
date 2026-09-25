import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { PortalNav } from '@/components/portal/portal-nav'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()
  
  if (!session) {
    redirect('/auth/login?callbackUrl=/portal')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-borboleta-purple-50 via-white to-borboleta-gold-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PortalNav user={session.user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
