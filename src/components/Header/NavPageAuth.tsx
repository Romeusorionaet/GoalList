import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
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
    <nav className="flex w-full justify-end gap-4 md:gap-4">
      {isAuthenticated ? (
        <Button className="w-16" onClick={handleLogOut}>
          Sair
        </Button>
      ) : (
        <>
          <Button>
            <Link
              className="outline-none focus-within:outline-none"
              href="/signIn"
            >
              Entrar
            </Link>
          </Button>

          <Button>
            <Link
              className="outline-none focus-within:outline-none"
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
