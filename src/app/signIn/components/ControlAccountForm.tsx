import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { useContext } from 'react'

interface Props {
  handResetPassword: () => void
  handleButtonState: () => void
  isForgotPassword: boolean
}

export function ControlAccountForm({
  handResetPassword,
  handleButtonState,
  isForgotPassword,
}: Props) {
  const { HandleGoogleSignIn } = useContext(AuthContext)

  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        className={`hover:border-cyan-500 hover:text-cyan-500 ${
          isForgotPassword ? 'hidden' : ''
        }`}
        onClick={HandleGoogleSignIn}
      >
        Google
      </Button>

      <div className="mt-8">
        {isForgotPassword ? (
          <Button className="w-full" onClick={handResetPassword}>
            Redefinir senha
          </Button>
        ) : (
          <button
            className="p-2 outline-none focus:rounded-lg focus:p-2 focus:outline-zinc-500"
            onClick={handleButtonState}
          >
            Esqueceu a sua senha?
          </button>
        )}
      </div>
    </div>
  )
}
