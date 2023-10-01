'use client'

import { checkIsPublicRoute } from '@/config/check-is-public-route'
import { usePathname, useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import PublicRoute from './PublicRoute'
import { useEffect } from 'react'

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const { isAuthenticated } = useCookies()
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  useEffect(() => {
    if (isAuthenticated === false) {
      push(APP_ROUTES.public.EmptyHomePage)
    }
  }, [isAuthenticated, push])

  return (
    <>
      {!isAuthenticated && null}
      {isPublicPage && <PublicRoute>{children}</PublicRoute>}
      {isAuthenticated && !isPublicPage && children}
    </>
  )
}
