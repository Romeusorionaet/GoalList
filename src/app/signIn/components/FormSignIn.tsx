import { InputControl, InputRoot } from '@/components/Form/Input'
import { LoginFormData, loginFormSchema } from '../page'
import { FormError } from '@/components/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/Form/Button'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'

interface FormSignInProps {
  handleButtonState: () => void
  isForgotPassword: boolean
}

export function FormSignIn({
  handleButtonState,
  isForgotPassword,
}: FormSignInProps) {
  const { SignIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleSignInForm(data: LoginFormData) {
    const { email, password } = data
    SignIn({ email, password })
  }

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
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

        <fieldset
          className={`flex flex-col gap-2 ${isForgotPassword ? 'hidden' : ''}`}
        >
          <label htmlFor="password">Senha</label>
          <InputRoot>
            <InputControl
              type="password"
              id="password"
              placeholder="******"
              {...register('password')}
            />
          </InputRoot>

          <FormError errors={errors.password?.message} />
        </fieldset>

        {isForgotPassword ? (
          <div className="text-center">
            <button
              className="p-2 outline-none focus:rounded-lg focus:p-2 focus:outline-zinc-500"
              onClick={handleButtonState}
            >
              Voltar a tela de login
            </button>
          </div>
        ) : (
          <Button
            type="submit"
            className="w-full data-[disabled=true]:cursor-not-allowed"
            aria-disabled={isSubmitting}
          >
            Entrar
          </Button>
        )}
      </form>
    </div>
  )
}