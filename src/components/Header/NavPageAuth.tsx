import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface Props {
  isAuthenticated: boolean | null
}

export function NavPageAuth({ isAuthenticated }: Props) {
  const { LogOutUser } = useContext(AuthContext)

  const router = useRouter()

  return (
    <nav className="flex w-full justify-end gap-4">
      <div className="md:mr-8">
        <ThemeSwitcher />
      </div>

      {isAuthenticated ? (
        <div className="flex gap-8">
          <Button className="w-16" onClick={() => LogOutUser()}>
            Sair
          </Button>
        </div>
      ) : (
        <>
          <Button
            className="max-md:w-14"
            onClick={() => router.push('/signIn')}
          >
            Entrar
          </Button>

          <Button
            className="max-md:w-18"
            onClick={() => router.push('/signUp')}
          >
            Cadastrar
          </Button>
        </>
      )}
    </nav>
  )
}
