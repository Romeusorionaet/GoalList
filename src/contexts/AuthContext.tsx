'use client'

import { auth } from '@/services/firebaseConfig'
import { ReactNode, createContext, useEffect, useState } from 'react'
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { getAuth, signOut, UserCredential, AuthError } from 'firebase/auth'
import { useCookies } from '@/hooks/useCookies'

interface AuthFormProps {
  email: string
  password: string
}

interface SignInStateProps {
  dataUser: UserCredential | undefined
  loadingLogin: boolean
  errorInLogin: AuthError | undefined
}

interface SignUpStateProps {
  userCreatedResult: UserCredential | undefined
  loadingToCreateUser: boolean
  errorInCreatedUser: AuthError | undefined
}

interface AuthContextType {
  SignIn: ({ email, password }: AuthFormProps) => void
  SignUp: ({ email, password }: AuthFormProps) => void
  LogOutUser: () => void
  signInState: SignInStateProps
  signUpState: SignUpStateProps
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProps) {
  const [signInState, setSignInState] = useState<SignInStateProps>({
    dataUser: undefined,
    loadingLogin: false,
    errorInLogin: undefined,
  })
  const [signUpState, setSignUpState] = useState<SignUpStateProps>({
    userCreatedResult: undefined,
    loadingToCreateUser: false,
    errorInCreatedUser: undefined,
  })
  const { setSecureCookie, removeCookie } = useCookies()

  const [signInWithEmailAndPassword, dataUser, loadingLogin, errorInLogin] =
    useSignInWithEmailAndPassword(auth)

  const [
    createUserWithEmailAndPassword,
    userCreatedResult,
    loadingToCreateUser,
    errorInCreatedUser,
  ] = useCreateUserWithEmailAndPassword(auth)

  useEffect(() => {
    setSignInState({ dataUser, loadingLogin, errorInLogin })
    setSignUpState({
      userCreatedResult,
      loadingToCreateUser,
      errorInCreatedUser,
    })
  }, [
    dataUser,
    loadingLogin,
    errorInLogin,
    userCreatedResult,
    loadingToCreateUser,
    errorInCreatedUser,
  ])

  async function SignIn({ email, password }: AuthFormProps) {
    try {
      const user = await signInWithEmailAndPassword(email, password)
      if (user) {
        const idToken = await user.user.getIdToken()
        setSecureCookie(idToken)
      }
    } catch (error) {
      if (error) {
        console.log(error)
        alert(error)
      } else {
        alert('Algo deu errado, tente novamente.')
      }
    }
  }

  async function SignUp({ email, password }: AuthFormProps) {
    try {
      await createUserWithEmailAndPassword(email, password)
    } catch (error) {
      if (error) {
        console.log(error)
        alert(error)
      } else {
        alert('Algo deu errado, tente novamente.')
      }
    }
  }

  async function LogOutUser() {
    const auth = getAuth()
    await signOut(auth)
      .then(() => {
        alert('Sign-out successful')
      })
      .catch((error) => {
        alert(error)
      })

    setSignInState({
      dataUser: undefined,
      loadingLogin: false,
      errorInLogin: undefined,
    })
    removeCookie()
  }

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignUp,
        LogOutUser,
        signInState,
        signUpState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
