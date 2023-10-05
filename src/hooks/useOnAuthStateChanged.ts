import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { useEffect, useState } from 'react'

export function useOnAuthenticated() {
  const [userData, setUserData] = useState<User>()

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user)
      }
    })

    return () => {
      onAuth()
    }
  }, [])

  return { userData }
}
