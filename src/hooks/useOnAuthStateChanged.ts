import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { useEffect, useState } from 'react'
import { useNotification } from './useNotification'

export function useOnAuthenticated() {
  const { notifyError } = useNotification()
  const [userDate, setUserDate] = useState<User>()

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDate(user)
      } else {
        notifyError('Faça login novamente')
      }
    })

    return () => {
      onAuth()
    }
  }, [])

  return { userDate }
}
