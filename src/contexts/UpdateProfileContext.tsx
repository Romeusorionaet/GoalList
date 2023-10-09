'use client'

import {
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  AuthError,
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
  const { userData } = useOnAuthenticated()
  const { removeCookie } = useCookies()

  const router = useRouter()

  async function PasswordReset(oldEmail: string) {
    try {
      if (oldEmail) {
        await sendPasswordResetEmail(auth, oldEmail, {
          url: 'https://goal-list-tau.vercel.app/signIn',
        })
        notifySuccess('Email enviado, vefique para poder redefinir a senha.')
      } else {
        notifyError('Ensira seu email cadastrado')
      }
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/user-not-found') {
        notifyError('Email incorreto')
      }
    }
  }

  async function UpdateUserEmail(newEmail: string, oldPassword: string) {
    try {
      if (userData) {
        const credentials = EmailAuthProvider.credential(
          String(userData.email),
          oldPassword,
        )
        await reauthenticateWithCredential(userData, credentials)

        await updateEmail(userData, newEmail)
        notifySuccess('Perfil atualizado.')
      }
    } catch (error) {
      if ((error as AuthError)?.code === 'auth/email-already-in-use') {
        notifyError('Este email não está disponível.')
      } else {
        notifyError(
          'Primeiro registro com conta Google não é possível fazer alterações no Email/Senha.',
        )
      }
    }
  }

  async function UpdateProfileForm({
    newEmail,
    oldEmail,
    oldPassword,
    displayName,
    dataImage,
  }: UpdateProfileFormProps) {
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
        notifySuccess('Perfil atualizado.')
      }

      if (dataImage.image) {
        updateProfile({
          photoURL: dataImage.image,
        })
        notifySuccess('Perfil atualizado.')
      }
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
      if (userData && oldEmail) {
        const credential = EmailAuthProvider.credential(oldEmail, oldPassword)
        await reauthenticateWithCredential(userData, credential)
        await updatePassword(userData, newPassword)

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
