'use client'

import { UpdateProfileContextProvider } from '@/contexts/UpdateProfileContext'
import { checkIsPublicRoute } from '@/config/check-is-public-route'
import PrivateRoute from '@/components/RoutesPage/PrivateRoute'
import PublicRoute from '@/components/RoutesPage/PublicRoute'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { Header } from '@/components/Header/Header'
import { ToastContainer } from 'react-toastify'
import { usePathname } from 'next/navigation'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'loleorgeorg',
  description: 'erhg ergwerg erg erg',
}

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: 'normal',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="bg-slate-50">
        <div className="mx-auto my-auto max-w-[150rem] rounded-xl">
          <ToastContainer />
          {isPublicPage && (
            <AuthContextProvider>
              <UpdateProfileContextProvider>
                <Header />
                <PublicRoute>{children}</PublicRoute>
              </UpdateProfileContextProvider>
            </AuthContextProvider>
          )}
          {!isPublicPage && (
            <AuthContextProvider>
              <UpdateProfileContextProvider>
                <Header />
                <PrivateRoute>{children}</PrivateRoute>
              </UpdateProfileContextProvider>
            </AuthContextProvider>
          )}
        </div>
      </body>
    </html>
  )
}
