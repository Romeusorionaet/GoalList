'use client'

import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'
import { Button } from '@/components/Button'

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

  function handleButtonResetPassword() {
    isForgotPassword ? setIsForgotPassword(false) : setIsForgotPassword(true)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-16">Fazer login</h1>

      <form className="space-y-10" onSubmit={handleSignInForm}>
        <fieldset className="flex items-center gap-4">
          <label className="w-[90px]" htmlFor="email">
            Email
          </label>
          <InputRoot>
            <InputControl
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pedro@gmail.com"
            />
          </InputRoot>
        </fieldset>

        <fieldset
          className={`flex items-center gap-4 ${
            isForgotPassword ? 'hidden' : ''
          }`}
        >
          <label className="w-[90px]" htmlFor="password">
            Senha
          </label>
          <InputRoot>
            <InputControl
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </InputRoot>
        </fieldset>

        {isForgotPassword ? (
          <Button
            className="min-w-full outline-none hover:text-red-500 focus:rounded-lg focus:outline-rose-500"
            title=" Voltar a tela de login"
            onClick={handleButtonResetPassword}
            type="submit"
          />
        ) : (
          <Button type="submit" title="Entrar" />
        )}
      </form>

      <div className="relative my-8 text-center">
        <div className="absolute inset-y-1/2 left-0 w-2/5 border-t border-red-200" />
        <strong className="">OR</strong>
        <div className="absolute inset-y-1/2 right-0 w-2/5 border-t border-red-200" />
      </div>

      <div className="flex flex-col">
        <Button
          className={` ${
            isForgotPassword
              ? 'hidden'
              : 'rounded-xl border border-red-200 px-6 py-4 outline-none duration-700 hover:bg-red-500 hover:text-white focus:border-none focus:bg-red-500 focus:text-white focus:outline-rose-500'
          }`}
          title="Google"
          onClick={HandleGoogleSignIn}
        />

        <div className="mt-8">
          {isForgotPassword ? (
            <Button
              onClick={HandResetPassword}
              title="Enviar email para redefinição de senha."
            />
          ) : (
            <Button
              className="p-2 outline-none hover:text-red-500 focus:rounded-lg focus:p-2 focus:outline-rose-500"
              onClick={handleButtonResetPassword}
              title="Esqueceu a sua senha?"
            />
          )}
        </div>
      </div>
    </div>
  )
}
