'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import FormSignUp from './FormSignUp'
import { Button } from '../Button'
import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function FormSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { SignIn, signInState } = useContext(AuthContext)
  if (signInState.errorInLogin) {
    return (
      <div>
        <p>Error: {signInState.errorInLogin.message}</p>
      </div>
    )
  }
  if (signInState.loadingLogin) {
    return <p>Loading...</p>
  }
  if (signInState.dataUser) {
    return (
      <div>
        <p>Registered User: {signInState.dataUser.user.email}</p>
      </div>
    )
  }

  async function handleSignInForm(event: SyntheticEvent) {
    event.preventDefault()
    SignIn({ email, password })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-red-400 p-4 rounded-xl text-white hover:bg-red-500 duration-700 focus:outline-none focus:outline-red-400 outline-1 focus:bg-red-500">
          Entrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="mb-16">Fazer login</Dialog.Title>

          <form className="space-y-10" onSubmit={handleSignInForm}>
            <fieldset className="flex gap-4 items-center">
              <label className="w-[90px]" htmlFor="name">
                Email
              </label>
              <input
                type="text"
                className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                placeholder="PedroDuarte@gmail.com"
                // defaultValue="PedroDuarte@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <fieldset className="flex items-center gap-4">
              <label className="w-[90px]" htmlFor="username">
                Senha
              </label>
              <input
                type="password"
                className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                placeholder="******"
                // defaultValue="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            <Dialog.Description className="flex items-center justify-between">
              <span>
                Não está cadastrado? <FormSignUp />
              </span>
              <Button type="submit" title="Entrar" />
            </Dialog.Description>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-[10px] right-[10px] items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
              <X size={28} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
