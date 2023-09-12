import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const { isAuthenticated } = useCookies()

  useEffect(() => {
    if (isAuthenticated === false) {
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
