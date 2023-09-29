import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { useEffect, useState } from 'react'

export function useOnAuthenticated() {
  const [userDate, setUserDate] = useState<User>()

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDate(user)
      }
    })

    return () => {
      onAuth()
    }
  }, [])

  return { userDate }
}
