import { useState, FormEvent, useContext } from 'react'

import { Button } from '@/components/Button'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'

export function FormPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const { oldEmail } = useOnAuthenticated()

  const { ChangePassword } = useContext(UpdateProfileContext)

  function handleChangePassword(event: FormEvent) {
    event.preventDefault()
    ChangePassword({ oldEmail, newPassword, oldPassword })
  }

  return (
    <form className="space-y-8 pt-8" onSubmit={handleChangePassword}>
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

      <div className="text-end">
        <Button type="submit">Atualizar senha</Button>
      </div>
    </form>
  )
}
