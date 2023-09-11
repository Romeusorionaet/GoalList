/* eslint-disable @next/next/no-img-element */
'use client'

import { FormEvent, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'
import { FormProfile } from './components/FormProfile'

export default function Perfil() {
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [oldEmail, setOldEmail] = useState('')

  const [isPasswordFormHidden, setIsPasswordFormHidden] = useState(false)

  const { ChangePassword } = useContext(UpdateProfileContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setOldEmail(String(user.email))
      } else {
        console.log('User is signed out')
      }
    })
  }, [])

  function handleChangePassword(event: FormEvent) {
    event.preventDefault()
    ChangePassword({ oldEmail, newPassword, oldPassword })
  }

  function toggleFormVisibility() {
    isPasswordFormHidden
      ? setIsPasswordFormHidden(false)
      : setIsPasswordFormHidden(true)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] space-y-8 rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      {isPasswordFormHidden ? <></> : <FormProfile />}

      <Button variant="outline" type="button" onClick={toggleFormVisibility}>
        Mudar senha?
      </Button>

      <form
        className={`${isPasswordFormHidden ? '' : 'hidden'}`}
        onSubmit={handleChangePassword}
      >
        <fieldset className="mb-4 flex flex-col gap-1">
          <label className="mb-2" htmlFor="oldPassword">
            Senha Antiga
          </label>
          <InputRoot>
            <InputControl
              type="password"
              id="oldPassword"
              placeholder="******"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </InputRoot>
        </fieldset>

        <fieldset className="mb-8 flex flex-col gap-1">
          <label className="mb-2" htmlFor="NewPassword">
            Senha nova
          </label>
          <InputRoot>
            <InputControl
              type="password"
              id="newPassword"
              placeholder="******"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputRoot>
        </fieldset>

        <Button type="submit">Atualizar senha</Button>
      </form>
    </div>
  )
}
