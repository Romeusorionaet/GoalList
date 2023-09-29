'use client'

import { ControlAccountForm } from './components/ControlAccountForm'
import { FormSignIn, loginFormSchema } from './components/FormSignIn'
import { Separator } from './components/Separator'
import { useState } from 'react'
import { z } from 'zod'

export type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  function handleButtonState() {
    isForgotPassword ? setIsForgotPassword(false) : setIsForgotPassword(true)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      {isForgotPassword ? (
        <h1 className="mb-8">Redefinir senha</h1>
      ) : (
        <h1 className="mb-8">Fazer login</h1>
      )}
      <FormSignIn
        handleButtonState={handleButtonState}
        isForgotPassword={isForgotPassword}
      />

      <Separator />

      <ControlAccountForm
        handleButtonState={handleButtonState}
        isForgotPassword={isForgotPassword}
      />
    </div>
  )
}
