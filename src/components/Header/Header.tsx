'use client'

import { NavPageAuthenticated } from './NavPageAuthenticated'
import { APP_ROUTES } from '@/constants/app-routes'
import { useCookies } from '@/hooks/useCookies'
import { HouseSimple } from 'phosphor-react'
import { NavPageAuth } from './NavPageAuth'
import { useRouter } from 'next/navigation'

export function Header() {
  const { isAuthenticated } = useCookies()
  const { push } = useRouter()

  function handleBack() {
    push(APP_ROUTES.public.EmptyHomePage)
  }

  return (
    <header className="fixed top-0 z-20 w-full bg-white p-4 dark:bg-slate-800">
      <div className="mx-auto flex w-full max-w-[1280px] items-center">
        {!isAuthenticated && (
          <button onClick={handleBack}>
            <HouseSimple
              size={36}
              className="dark:text-white"
              weight="duotone"
            />
          </button>
        )}

        {isAuthenticated && <NavPageAuthenticated />}

        <NavPageAuth isAuthenticated={isAuthenticated} />
      </div>
    </header>
  )
}
