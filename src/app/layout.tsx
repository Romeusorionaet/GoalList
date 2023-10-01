import { UpdateProfileContextProvider } from '@/contexts/UpdateProfileContext'
import PrivateRoute from '@/components/RoutesPage/PrivateRoute'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { Header } from '@/components/Header/Header'
import { ToastContainer } from 'react-toastify'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'GoalList',
  description: 'projeto pessoal',
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
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="bg-slate-50">
        <div className="mx-auto my-auto max-w-[150rem] rounded-xl">
          <ToastContainer />

          <AuthContextProvider>
            <UpdateProfileContextProvider>
              <Header />
              <PrivateRoute>{children}</PrivateRoute>
            </UpdateProfileContextProvider>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  )
}
