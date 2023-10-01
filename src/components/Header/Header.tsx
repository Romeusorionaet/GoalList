'use client'

import { NavPageAuthenticated } from './NavPageAuthenticated'
import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import { NavPageAuth } from './NavPageAuth'
import { FramerLogo } from 'phosphor-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { isAuthenticated } = useCookies()
  const { push } = useRouter()

  function handleBack() {
    push(APP_ROUTES.public.EmptyHomePage)
  }

  return (
    <header className="fixed top-0 z-10 w-full bg-white p-4">
      <div className="flex w-full items-center  ">
        {!isAuthenticated && (
          <button onClick={handleBack}>
            <FramerLogo width={32} height={32} />
          </button>
        )}
        {isAuthenticated && <NavPageAuthenticated />}
        <NavPageAuth isAuthenticated={isAuthenticated} />
      </div>
    </header>
  )
}
