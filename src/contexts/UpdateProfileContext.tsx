import { useCookies } from '@/hooks/useCookies'
import { auth } from '@/services/firebaseConfig'
import {
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  AuthError,
  updateEmail,
} from 'firebase/auth'
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext } from 'react'

interface EmailAndPasswordProps {
  oldEmail: string
  newPassword: string
  oldPassword: string
}

interface UpdateProfileFormProps {
  newEmail: string
  oldEmail: string
  oldPassword: string
  displayName: string
  dataImage: { image: string }
}

interface UpdateProfileType {
  PasswordReset: (oldEmail: string) => Promise<void>

  ChangePassword: ({
    oldEmail,
    newPassword,
    oldPassword,
  }: EmailAndPasswordProps) => Promise<void>

  UpdateProfileForm: ({
    newEmail,
    oldEmail,
    oldPassword,
    displayName,
    dataImage,
  }: UpdateProfileFormProps) => Promise<void>
}

interface UpdateProfileProps {
  children: ReactNode
}

export const UpdateProfileContext = createContext({} as UpdateProfileType)

export function UpdateProfileContextProvider({ children }: UpdateProfileProps) {
  const { removeCookie } = useCookies()
  const [updateProfile] = useUpdateProfile(auth)

  const user = auth.currentUser
  const router = useRouter()

  async function PasswordReset(oldEmail: string) {
    sendPasswordResetEmail(auth, oldEmail!, {
      url: 'http://localhost:3000/signIn',
    })
  }

  async function UpdateUserEmail(newEmail: string, oldPassword: string) {
    // refactor
    try {
      if (user) {
        const credentials = EmailAuthProvider.credential(
          String(user.email),
          oldPassword,
        )
        await reauthenticateWithCredential(user, credentials)

        await updateEmail(user, newEmail)
        alert('Perfil atualizado.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function UpdateProfileForm({
    newEmail,
    oldEmail,
    oldPassword,
    displayName,
    dataImage,
  }: UpdateProfileFormProps) {
    // refactor

    try {
      if (newEmail && newEmail !== oldEmail) {
        if (oldPassword) {
          await UpdateUserEmail(newEmail, oldPassword)
        } else {
          alert('Para alterar o email é preciso fornecer a senha atual.')
        }
      }

      if (displayName) {
        console.log(displayName)
        updateProfile({
          displayName,
        })
        alert('Perfil atualizado.')
      }
      if (dataImage.image) {
        updateProfile({
          photoURL: dataImage.image,
        })
        alert('Perfil atualizado.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function ChangePassword({
    oldEmail,
    newPassword,
    oldPassword,
  }: EmailAndPasswordProps) {
    try {
      if (user) {
        const credential = EmailAuthProvider.credential(oldEmail, oldPassword)

        await reauthenticateWithCredential(user, credential)
        await updatePassword(user, newPassword)

        alert('Senha alterado')
        router.push('/signIn')
        removeCookie()
      } else {
        console.error('O usuário não está autenticado')
      }
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/wrong-password') {
        alert('Senha antiga não confere.')
      } else {
        console.error(error)
      }
    }
  }

  return (
    <UpdateProfileContext.Provider
      value={{ PasswordReset, ChangePassword, UpdateProfileForm }}
    >
      {children}
    </UpdateProfileContext.Provider>
  )
}
