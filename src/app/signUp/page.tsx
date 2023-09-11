'use client'

import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { IsEmailValid } from '@/config/IsEmailValid'
import { InputControl, InputRoot } from '@/components/Input'
import { Button } from '@/components/Button'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { SignUp } = useContext(AuthContext)

  function handleSignUpForm(event: SyntheticEvent) {
    event.preventDefault()
    IsEmailValid(email)
    SignUp({ email, password })
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-8">Cadastrar conta</h1>

      <form className="space-y-10" onSubmit={handleSignUpForm}>
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

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <InputRoot>
            <InputControl
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min 6 caracteres"
            />
          </InputRoot>
        </fieldset>
        <Button className="w-full" type="submit">
          Cadastar
        </Button>
      </form>
    </div>
  )
}
