'use client'

import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const { isAuthenticated } = useCookies()

  useEffect(() => {
    if (isAuthenticated) {
      push(APP_ROUTES.public.EmptyHomePage)
    }
  }, [isAuthenticated, push])

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}
