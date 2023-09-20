import { useCookies } from '@/hooks/useCookies'
import { NavPageAuthenticated } from './NavPageAuthenticated'
import { NavPageAuth } from './NavPageAuth'
import { FramerLogo } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/app-routes'

export function Header() {
  const { isAuthenticated } = useCookies()
  const { push } = useRouter()

  function handleBack() {
    push(APP_ROUTES.public.EmptyHomePage)
  }

  return (
    <header className="relative flex items-center justify-between pb-8 text-red-400">
      {!isAuthenticated && (
        <button onClick={handleBack}>
          <FramerLogo width={32} height={32} />
        </button>
      )}
      {isAuthenticated && <NavPageAuthenticated />}
      <NavPageAuth isAuthenticated={isAuthenticated} />
    </header>
  )
}
