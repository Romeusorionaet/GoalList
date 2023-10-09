import { UpdateProfileContextProvider } from '@/contexts/UpdateProfileContext'
import { GoalProviderContext } from '@/contexts/ProviderGoalList'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { ThemeProviders } from '@/components/ThemeProvider'
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
    <html lang="pt-BR" className={`${roboto.className} antialiased`}>
      <body>
        <ThemeProviders>
          <div className="mx-auto mb-8 h-screen max-w-[150rem] rounded-xl bg-slate-50 pt-32 dark:bg-slate-950">
            <ToastContainer />

            <AuthContextProvider>
              <UpdateProfileContextProvider>
                <GoalProviderContext>
                  <Header />
                  {children}
                </GoalProviderContext>
              </UpdateProfileContextProvider>
            </AuthContextProvider>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
