import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useNotification } from '@/hooks/useNotification'
import { auth } from '@/services/firebaseConfig'
import { ReactNode, createContext } from 'react'
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
  const { notifyError, notifySuccess } = useNotification()

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
        notifyError('Email ou Senha incorreto.')
      } else if ((error as AuthError)?.code === 'auth/user-not-found') {
        notifyError('Email ou Senha incorreto.')
      } else if ((error as AuthError)?.code === 'auth/invalid-email') {
        notifyError('Email ou Senha inválido.')
      }
    }
  }

  async function HandleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    try {
      const userData = await signInWithPopup(auth, provider)
      const idToken = await userData.user.getIdToken()

      setSecureCookie(idToken)
      router.push('/')
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/popup-closed-by-user') {
        notifyError('Janela de login fechada pelo usuário.')
      } else {
        notifyError('Ocorreu um erro ao fazer login. Tente novamente.')
      }
    }
  }

  async function SignUp({ email, password }: AuthFormProps) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)

      notifySuccess('Cadastro realizado com sucesso!')
      router.push('/signIn')
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/email-already-in-use') {
        notifyError('Este email já existe.')
      }
    }
  }

  async function LogOutUser() {
    const auth = getAuth()

    try {
      await signOut(auth)

      notifySuccess('Logout bem-sucedido')
      location.reload()
    } catch (error) {
      console.error(error)

      notifyError('Ocorreu um erro ao tentar sair, tente novamente.')
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
