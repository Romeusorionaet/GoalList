'use client'

import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { ControlAccountForm } from './components/ControlAccountForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSignIn } from './components/FormSignIn'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Email é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatório' }),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const { PasswordReset } = useContext(UpdateProfileContext)

  const { getValues } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const data = getValues()

  const handResetPassword = () => {
    const { email } = data
    PasswordReset(email)
  }

  function handleButtonState() {
    isForgotPassword ? setIsForgotPassword(false) : setIsForgotPassword(true)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-8">Fazer login</h1>

      <FormSignIn
        handleButtonState={handleButtonState}
        isForgotPassword={isForgotPassword}
      />

      <div className="relative my-8 text-center">
        <div className="absolute inset-y-1/2 left-0 w-2/5 border-t border-zinc-300" />
        <strong>OR</strong>
        <div className="absolute inset-y-1/2 right-0 w-2/5 border-t border-zinc-300" />
      </div>

      <ControlAccountForm
        handResetPassword={handResetPassword}
        handleButtonState={handleButtonState}
        isForgotPassword={isForgotPassword}
      />
    </div>
  )
}
