import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { useEffect, useState } from 'react'

export function useOnAuthenticated() {
  const [displayName, setDisplayName] = useState<string | null>('')
  const [photoURL, setPhotoURL] = useState<string | null>('')
  const [userId, setUserId] = useState<string | null>('')
  const [oldEmail, setOldEmail] = useState('')

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName)
        setPhotoURL(user.photoURL)
        setOldEmail(String(user.email))
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })

    return () => {
      onAuth()
    }
  }, [])

  return { userId, displayName, photoURL, oldEmail }
}
