import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { InputControl, InputRoot } from '@/components/Form/Input'
import { FormError } from '@/components/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/Form/Button'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { z } from 'zod'

const FormPasswordSchema = z.object({
  oldPassword: z.string().min(6, { message: 'No mínimo 6 digitos' }),
  newPassword: z.string().min(6, { message: 'No mínimo 6 digitos' }),
})

type FormPasswordData = z.infer<typeof FormPasswordSchema>

export function FormPassword() {
  const { ChangePassword } = useContext(UpdateProfileContext)
  const { userData } = useOnAuthenticated()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormPasswordData>({
    resolver: zodResolver(FormPasswordSchema),
  })

  function handleChangePassword(data: FormPasswordData) {
    const { oldPassword, newPassword } = data
    ChangePassword({ oldEmail: userData?.email, newPassword, oldPassword })
  }

  return (
    <form
      className="space-y-8 pt-8"
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <p className="text-sm">
        Alteração de senha é apenas para quem fez login com email e senha
      </p>

      <fieldset className="mb-4 flex flex-col gap-1">
        <label className="mb-2" htmlFor="oldPassword">
          Senha Antiga
        </label>
        <InputRoot>
          <InputControl
            type="password"
            id="oldPassword"
            placeholder="******"
            {...register('oldPassword')}
          />
        </InputRoot>

        <FormError errors={errors.oldPassword?.message} />
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
            {...register('newPassword')}
          />
        </InputRoot>

        <FormError errors={errors.newPassword?.message} />
      </fieldset>

      <div className="text-end">
        <Button
          type="submit"
          className="w-full data-[disabled=true]:cursor-not-allowed"
          aria-disabled={isSubmitting}
        >
          Atualizar senha
        </Button>
      </div>
    </form>
  )
}
