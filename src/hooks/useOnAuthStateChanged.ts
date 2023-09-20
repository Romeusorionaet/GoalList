import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { useEffect, useState } from 'react'

export function useOnAuthenticated() {
  const [userId, setUserId] = useState<string | null>('')
  const [displayName, setDisplayName] = useState<string | null>('')
  const [photoURL, setPhotoURL] = useState<string | null>('')
  const [oldEmail, setOldEmail] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName)
        setPhotoURL(user.photoURL)
        setOldEmail(String(user.email))
        setUserId(user.uid)
      } else {
        alert('User is signed out')
      }
    })
  }, [displayName, photoURL])

  return { userId, displayName, photoURL, oldEmail }
}
