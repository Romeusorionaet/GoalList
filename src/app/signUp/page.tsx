'use client'

import { InputControl, InputRoot } from '@/components/Form/Input'
import { FormError } from '@/components/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { z } from 'zod'

const registerFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .refine(
      (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
        return emailRegex.test(email)
      },
      { message: 'Email Inválido' },
    ),
  password: z.string().min(1, { message: 'Senha é obrigatório' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { SignUp } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  function handleRegisterForm(data: RegisterFormData) {
    const { email, password } = data

    SignUp({ email, password })
  }

  console.log(isSubmitting)

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-8">Cadastrar conta</h1>

      <form className="space-y-10" onSubmit={handleSubmit(handleRegisterForm)}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <InputRoot>
            <InputControl
              id="email"
              placeholder="pedro@gmail.com"
              {...register('email')}
            />
          </InputRoot>

          <FormError errors={errors.email?.message} />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <InputRoot>
            <InputControl
              type="password"
              id="password"
              placeholder="min 6 caracteres"
              {...register('password')}
            />
          </InputRoot>

          <FormError errors={errors.password?.message} />
        </fieldset>
        <Button
          type="submit"
          className="w-full data-[disabled=true]:cursor-not-allowed"
          aria-disabled={isSubmitting}
        >
          Cadastar
        </Button>
      </form>
    </div>
  )
}
