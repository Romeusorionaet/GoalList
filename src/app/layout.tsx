'use client'

import { Header } from '@/components/Header'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/config/check-is-public-route'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <html lang="pt-BR">
      <body className="bg-rose-200 p-4">
        <div className="rounded-xl max-w-[150rem] mx-auto my-auto">
          {isPublicPage && (
            <AuthContextProvider>
              <Header />
              {children}
            </AuthContextProvider>
          )}
          {!isPublicPage && (
            <AuthContextProvider>
              <Header />
              <PrivateRoute>{children}</PrivateRoute>
            </AuthContextProvider>
          )}
        </div>
      </body>
    </html>
  )
}
