import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Form/Input'
import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { useContext, useState } from 'react'

interface Props {
  handleButtonState: () => void
  isForgotPassword: boolean
}

export function ControlAccountForm({
  handleButtonState,
  isForgotPassword,
}: Props) {
  const { PasswordReset } = useContext(UpdateProfileContext)
  const { HandleGoogleSignIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')

  const handResetPassword = () => {
    PasswordReset(email)
  }

  return (
    <div className="flex flex-col">
      <fieldset
        className={`flex flex-col gap-2 ${isForgotPassword ? '' : 'hidden'}`}
      >
        <label htmlFor="emailResetPassword">Email</label>
        <InputRoot>
          <InputControl
            id="emailResetPassword"
            placeholder="pedro@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputRoot>
      </fieldset>

      <Button
        variant="outline"
        className={`group hover:border-yellow-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 hover:text-cyan-500 ${
          isForgotPassword ? 'hidden' : ''
        }`}
        onClick={HandleGoogleSignIn}
      >
        <span className="group-hover:animate-pulse group-hover:text-white dark:text-white">
          Google
        </span>
      </Button>

      <div className="mt-8">
        {isForgotPassword ? (
          <Button className="w-full" onClick={handResetPassword}>
            Redefinir senha
          </Button>
        ) : (
          <button
            className="p-2 outline-none focus:rounded-lg focus:p-2 focus:outline-zinc-500 dark:text-white"
            onClick={handleButtonState}
          >
            Esqueceu a sua senha?
          </button>
        )}
      </div>
    </div>
  )
}
