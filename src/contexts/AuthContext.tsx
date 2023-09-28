import { auth } from '@/services/firebaseConfig'
import { ReactNode, createContext } from 'react'

import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  email: string
  password: string
}

interface AuthContextType {
  SignIn: ({ email, password }: AuthFormProps) => Promise<void>
  SignUp: ({ email, password }: AuthFormProps) => Promise<void>
  LogOutUser: () => Promise<void>
  HandleGoogleSignIn: () => Promise<void>
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProps) {
  const { setSecureCookie, removeCookie } = useCookies()

  const router = useRouter()

  async function SignIn({ email, password }: AuthFormProps) {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password)

      if (userData) {
        const idToken = await userData.user.getIdToken()

        setSecureCookie(idToken)
        router.push('/')
      }
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/wrong-password') {
        alert('Email ou Senha incorreto.')
      } else if ((error as AuthError)?.code === 'auth/user-not-found') {
        alert('Email ou Senha incorreto.')
      } else if ((error as AuthError)?.code === 'auth/invalid-email') {
        alert('Email ou Senha inválido.')
      }
    }
  }

  async function HandleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    try {
      const userData = await signInWithPopup(auth, provider)
      console.log(userData)
      const idToken = await userData.user.getIdToken()

      setSecureCookie(idToken)
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/popup-closed-by-user') {
        alert('Janela de login fechada pelo usuário.')
      } else {
        alert('Ocorreu um erro ao fazer login. Tente novamente.')
      }
    }
  }

  async function SignUp({ email, password }: AuthFormProps) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      console.log(userCredential)

      alert('Cadastro realizado com sucesso!')
      router.push('/signIn')
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/email-already-in-use') {
        alert('Este email já existe.')
      } else if ((error as AuthError)?.code === 'auth/weak-password') {
        alert('Senhas devem ter no mínimo 6 caracteres.')
      } else if ((error as AuthError)?.code === 'auth/invalid-email') {
        alert('Email inválido.')
      }
    }
  }

  async function LogOutUser() {
    const auth = getAuth()

    try {
      await signOut(auth)

      alert('Logout bem-sucedido')
      location.reload()
    } catch (error) {
      console.error(error)

      alert('Ocorreu um erro ao tentar sair, tente novamente.')
    }
    removeCookie()
  }

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignUp,
        LogOutUser,
        HandleGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
