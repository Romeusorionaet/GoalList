import { checkIsPublicRoute } from '@/config/check-is-public-route'
import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const { isAuthenticated } = useCookies()
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  useEffect(() => {
    if (isPublicPage && isAuthenticated) {
      push(APP_ROUTES.private.dashboard.home)
    }
  })

  // por 1 segundo ainda está podendo ver a tela de login quando o user esta dentro

  return (
    <>
      {isAuthenticated && isPublicPage && null}
      {!isAuthenticated && children}
    </>
  )
}
