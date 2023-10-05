import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { useContext } from 'react'
import Link from 'next/link'

interface Props {
  isAuthenticated: boolean | null
}

export function NavPageAuth({ isAuthenticated }: Props) {
  const { LogOutUser } = useContext(AuthContext)

  function handleLogOut() {
    LogOutUser()
  }

  return (
    <nav className="flex w-full justify-end gap-4">
      <div className="md:mr-8">
        <ThemeSwitcher />
      </div>

      {isAuthenticated ? (
        <div className="flex gap-8">
          <Button className="w-16" onClick={handleLogOut}>
            Sair
          </Button>
        </div>
      ) : (
        <>
          <Button className="max-md:w-14">
            <Link
              className="outline-none focus-within:outline-none max-md:text-sm"
              href="/signIn"
            >
              Entrar
            </Link>
          </Button>

          <Button className="max-md:w-18">
            <Link
              className="outline-none focus-within:outline-none max-md:text-sm"
              href="/signUp"
            >
              Cadastrar
            </Link>
          </Button>
        </>
      )}
    </nav>
  )
}
