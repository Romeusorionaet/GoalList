'use client'

import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const { SignIn, HandleGoogleSignIn } = useContext(AuthContext)
  const { PasswordReset } = useContext(UpdateProfileContext)

  function handleSignInForm(event: SyntheticEvent) {
    event.preventDefault()
    SignIn({ email, password })
  }

  function HandResetPassword() {
    PasswordReset(email)
  }

  function handleButtonState() {
    isForgotPassword ? setIsForgotPassword(false) : setIsForgotPassword(true)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-8">Fazer login</h1>

      <form className="space-y-8" onSubmit={handleSignInForm}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <InputRoot>
            <InputControl
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pedro@gmail.com"
            />
          </InputRoot>
        </fieldset>

        <fieldset
          className={`flex flex-col gap-2 ${isForgotPassword ? 'hidden' : ''}`}
        >
          <label htmlFor="password">Senha</label>
          <InputRoot>
            <InputControl
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </InputRoot>
        </fieldset>

        {isForgotPassword ? (
          <div className="text-center">
            <Link
              href=""
              className="outline-none focus:rounded-lg focus:p-2 focus:outline-rose-500"
              onClick={handleButtonState}
            >
              Voltar a tela de login
            </Link>
          </div>
        ) : (
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        )}
      </form>

      <div className="relative my-8 text-center">
        <div className="absolute inset-y-1/2 left-0 w-2/5 border-t border-red-200" />
        <strong className="">OR</strong>
        <div className="absolute inset-y-1/2 right-0 w-2/5 border-t border-red-200" />
      </div>

      <div className="flex flex-col">
        <Button
          variant="outline"
          className={` ${isForgotPassword ? 'hidden' : ''}`}
          onClick={HandleGoogleSignIn}
        >
          Google
        </Button>

        <div className="mt-8">
          {isForgotPassword ? (
            <Button className="w-full" onClick={HandResetPassword}>
              Redefinir senha
            </Button>
          ) : (
            <Link
              href=""
              className="p-2 outline-none focus:rounded-lg focus:p-2 focus:outline-rose-500"
              onClick={handleButtonState}
            >
              Esqueceu a sua senha?
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
