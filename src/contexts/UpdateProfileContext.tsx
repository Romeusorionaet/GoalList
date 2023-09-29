import {
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  AuthError,
  updateEmail,
} from 'firebase/auth'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { useNotification } from '@/hooks/useNotification'
import { auth } from '@/services/firebaseConfig'
import { ReactNode, createContext } from 'react'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from 'next/navigation'

interface EmailAndPasswordProps {
  oldEmail?: string | null
  newPassword: string
  oldPassword: string
}

interface UpdateProfileFormProps {
  newEmail: string
  oldEmail?: string | null
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
  const { notifyError, notifySuccess } = useNotification()
  const [updateProfile] = useUpdateProfile(auth)
  const { userDate } = useOnAuthenticated()
  const { removeCookie } = useCookies()

  const router = useRouter()

  async function PasswordReset(oldEmail: string) {
    sendPasswordResetEmail(auth, oldEmail!, {
      url: 'http://localhost:3000/signIn',
    })
  }

  async function UpdateUserEmail(newEmail: string, oldPassword: string) {
    // refactor
    try {
      if (userDate) {
        const credentials = EmailAuthProvider.credential(
          String(userDate.email),
          oldPassword,
        )
        await reauthenticateWithCredential(userDate, credentials)

        await updateEmail(userDate, newEmail)
      }
    } catch (error) {
      notifyError(
        'Não foi possível atualizar o perfil. Tente novamente mais tarde.',
      )
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
          notifyError('Para alterar o email é preciso fornecer a senha atual.')
          return
        }
      }

      if (displayName) {
        updateProfile({
          displayName,
        })
      }

      if (dataImage.image) {
        updateProfile({
          photoURL: dataImage.image,
        })
      }

      notifySuccess('Perfil atualizado.')
    } catch (error) {
      notifyError(String(error))
    }
  }

  async function ChangePassword({
    oldEmail,
    newPassword,
    oldPassword,
  }: EmailAndPasswordProps) {
    try {
      if (userDate && oldEmail) {
        const credential = EmailAuthProvider.credential(oldEmail, oldPassword)
        await reauthenticateWithCredential(userDate, credential)
        await updatePassword(userDate, newPassword)

        notifySuccess('Senha alterado')
        router.push('/signIn')
        removeCookie()
      }
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/wrong-password') {
        notifyError('Senha antiga está incorreta')
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
