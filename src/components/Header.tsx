import { useWidthScreen } from '@/hooks/useWidthScreen'
import { List, X } from 'phosphor-react'
import Link from 'next/link'
import { Button } from './Button'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useCookies } from '@/hooks/useCookies'

export function Header() {
  const { checkMenuOpen, widthScreen, handleChangeValue } = useWidthScreen()
  const { LogOutUser } = useContext(AuthContext)
  const { isAuthenticated } = useCookies()

  function handleLogOut() {
    LogOutUser()
  }

  return (
    <header className="relative flex items-center justify-between pb-8 text-red-400">
      {isAuthenticated && (
        <>
          <div className={widthScreen && widthScreen >= 800 ? 'hidden' : ''}>
            <button onClick={handleChangeValue} className="text-red-400">
              {checkMenuOpen ? (
                <X size={34} weight="bold" />
              ) : (
                <List size={34} weight="bold" />
              )}
            </button>
          </div>
          <nav
            className={`
          ${
            (widthScreen && widthScreen >= 800) || checkMenuOpen ? '' : 'hidden'
          } `}
          >
            <ul
              className={` ${
                widthScreen && widthScreen <= 800 && checkMenuOpen === true
                  ? 'absolute right-4 top-[7rem] z-20 flex w-[15rem] flex-col items-end gap-8 rounded-md bg-rose-100 p-8 font-bold'
                  : 'flex w-[40rem] gap-16 text-3xl font-semibold'
              } `}
            >
              <li>
                <Link href="/">Início</Link>
              </li>

              <li>
                <Link href="/perfil">Perfil</Link>
              </li>
              <li>
                <Link href="/card">Criar Match</Link>
              </li>
            </ul>
          </nav>
        </>
      )}

      <div className="flex w-full justify-end gap-2 md:gap-4">
        {isAuthenticated ? (
          <Button onClick={handleLogOut} title="Sair" />
        ) : (
          <>
            <Link href="/signIn">
              <Button title="Entrar" />
            </Link>

            <Link href="/signUp">
              <Button title="Casdastrar" />
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
