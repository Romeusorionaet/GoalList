'use client'

import { SyntheticEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { SignIn, HandleGoogleSignIn } = useContext(AuthContext)

  // if (signInState.errorInLogin) {
  //   return (
  //     <div>
  //       <p>Error: {signInState.errorInLogin.message}</p>
  //     </div>
  //   )
  // }
  // if (signInState.loadingLogin) {
  //   return <p>Loading...</p>
  // }
  // if (signInState.dataUser) {
  //   return (
  //     <div>
  //       <p>Registered User: {signInState.dataUser.user.email}</p>
  //     </div>
  //   )
  // }

  function handleSignInForm(event: SyntheticEvent) {
    event.preventDefault()
    SignIn({ email, password })
  }

  return (
    <div className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <h1 className="mb-16">Fazer login</h1>

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
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button type="submit">Entrar</button>
      </form>
      <button onClick={HandleGoogleSignIn}>Google</button>
    </div>
  )
}
