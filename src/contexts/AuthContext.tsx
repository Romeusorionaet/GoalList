import { auth } from '@/services/firebaseConfig'
import { ReactNode, createContext } from 'react'
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth'
import {
  getAuth,
  signOut,
  UserCredential,
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
/* TODO O CÓDIGO COMENTADO É PARA EXIBIR STATUS DO LOGIN E SIGNUP COMO ESTADO DE LOADIN, ERROR... */

// interface SignInStateProps {
//   dataUser: UserCredential | undefined
//   loadingLogin: boolean
//   errorInLogin: AuthError | undefined
// }

// interface SignUpStateProps {
//   userCreatedResult: UserCredential | undefined
//   loadingToCreateUser: boolean
//   errorInCreatedUser: AuthError | undefined
// }

interface AuthContextType {
  SignIn: ({ email, password }: AuthFormProps) => void
  SignUp: ({ email, password }: AuthFormProps) => void
  LogOutUser: () => void
  // signInState: SignInStateProps
  // signUpState: SignUpStateProps
  HandleGoogleSignIn: () => void
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProps) {
  const router = useRouter()

  // const [signInState, setSignInState] = useState<SignInStateProps>({
  //   dataUser: undefined,
  //   loadingLogin: false,
  //   errorInLogin: undefined,
  // })

  // const [signUpState, setSignUpState] = useState<SignUpStateProps>({
  //   userCreatedResult: undefined,
  //   loadingToCreateUser: false,
  //   errorInCreatedUser: undefined,
  // })
  const { setSecureCookie, removeCookie } = useCookies()

  const [signInWithEmailAndPassword, dataUser, loadingLogin, errorInLogin] =
    useSignInWithEmailAndPassword(auth)

  const [
    createUserWithEmailAndPassword,
    userCreatedResult,
    loadingToCreateUser,
    errorInCreatedUser,
  ] = useCreateUserWithEmailAndPassword(auth)

  // useEffect(() => {
  //   setSignInState({ dataUser, loadingLogin, errorInLogin })
  //   setSignUpState({
  //     userCreatedResult,
  //     loadingToCreateUser,
  //     errorInCreatedUser,
  //   })
  // }, [
  //   dataUser,
  //   loadingLogin,
  //   errorInLogin,
  //   userCreatedResult,
  //   loadingToCreateUser,
  //   errorInCreatedUser,
  // ])
  async function SignIn({ email, password }: AuthFormProps) {
    try {
      const userData = await signInWithEmailAndPassword(email, password)

      if (userData) {
        const idToken = await userData.user.getIdToken()

        setSecureCookie(idToken)
        router.push('/')
      }
    } catch (error) {
      console.error(error)

      alert(error || 'Algo deu errado ao tentar entrar, tente novamente.')
    }
  }

  async function HandleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    try {
      const userData = await signInWithPopup(auth, provider)
      const idToken = await userData.user.getIdToken()

      setSecureCookie(idToken)
    } catch (error) {
      console.error(error)

      if ((error as AuthError)?.code === 'auth/popup-closed-by-user') {
        alert('Janela de login fechada pelo usuário.')
      } else {
        alert('Ocorreu um erro ao fazer login. Tente novamente.')
      }
    }
  }

  async function SignUp({ email, password }: AuthFormProps) {
    try {
      await createUserWithEmailAndPassword(email, password)
      alert('Cadastro realizado com sucesso!')
      router.push('/signIn')
    } catch (error) {
      console.error(error)

      alert(error || 'Algo deu errado ao tentar se cadastrar, tente novamente.')
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

    // setSignInState({
    //   dataUser: undefined,
    //   loadingLogin: false,
    //   errorInLogin: undefined,
    // })
    removeCookie()
  }

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignUp,
        LogOutUser,
        // signInState,
        // signUpState,
        HandleGoogleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
