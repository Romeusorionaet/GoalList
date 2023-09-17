import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '@/services/firebaseConfig'

export function useOnAuthenticated() {
  const [userId, setUserId] = useState<string | null>('')
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [oldEmail, setOldEmail] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(String(user.displayName))
        setPhotoURL(String(user.photoURL))
        setOldEmail(String(user.email))
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })
  })

  return { userId, displayName, photoURL, oldEmail }
}
