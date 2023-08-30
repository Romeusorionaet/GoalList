'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { Button } from '../Button'
import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function FormSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { SignUp } = useContext(AuthContext)

  // if (signUpState.errorInCreatedUser) {
  //   console.log(signUpState.errorInCreatedUser)
  // }
  // if (signUpState.loadingToCreateUser) {
  //   return <p>Loading...</p>
  // }
  // if (signUpState.userCreatedResult) {
  //   console.log(signUpState.userCreatedResult)
  // }

  function handleSignUpForm(event: SyntheticEvent) {
    event.preventDefault()
    SignUp({ email, password })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-red-400 p-4 rounded-xl text-white hover:bg-red-500 duration-700 focus:outline-none focus:outline-red-400 outline-1 focus:bg-red-500">
          Cadastrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="mb-16">Cadastrar conta</Dialog.Title>

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
                // defaultValue="Pedro Duarte"
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
                // defaultValue="*****"
              />
            </fieldset>

            {/* <fieldset className="flex items-center">
              <label className="w-[90px]" htmlFor="username">
                Repetir senha
              </label>
              <input
                className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@peduarte"
              />
            </fieldset> */}
            <div>
              <Dialog.Description className="flex items-center justify-between">
                <Button type="submit" title="Cadastrar" />
              </Dialog.Description>
            </div>
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
