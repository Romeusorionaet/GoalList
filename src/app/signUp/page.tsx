'use client'

import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { IsEmailValid } from '@/config/IsEmailValid'

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
    <div className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-16">Cadastrar conta</h1>

      <form className="space-y-10" onSubmit={handleSignUpForm}>
        <fieldset className="flex items-center">
          <label className="w-[90px]" htmlFor="name">
            Email
          </label>
          <input
            type="text"
            className="placeholder:text-red-400 h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            placeholder="Pedro Duarte"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex items-center">
          <label className="w-[90px]" htmlFor="username">
            Senha
          </label>
          <input
            type="password"
            className="placeholder:text-red-400 h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="username"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
