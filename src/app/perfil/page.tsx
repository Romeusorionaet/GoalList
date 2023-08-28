'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { auth, db } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import { query, where, getDocs, collection } from 'firebase/firestore'

export default function Perfil() {
  const [displayName, setDisplayName] = useState<string | null>('')
  const [email, setEmail] = useState<string | null>('')
  const [password, setPassword] = useState('')
  // const [city, setCity] = useState('')
  const [updateProfile, updating, error] = useUpdateProfile(auth)
  const [userId, setUserId] = useState<string | null>('')

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setEmail(user.email)
  //     setDisplayName(user.displayName)
  //     setUserId(user.uid)
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     console.log(user.email)
  //     // ...
  //   } else {
  //     console.log('User is signed out')
  //     // User is signed out
  //     // ...
  //   }
  // })

  async function handleUpdatePefilForm() {
    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )
    }

    if (updating) {
      return <p>Updating...</p>
    }

    const success = await updateProfile({ displayName })
    if (success) {
      alert('Updated profile')
    }

    console.log(displayName, email, password)
  }

  //= ===== buscar por id

  useEffect(() => {
    async function teste() {
      const userCardsQuery = query(
        collection(db, 'sharedCard'),
        where('userId', '==', userId),
      )

      const querySnapshot = await getDocs(userCardsQuery)

      const userCards: any = []
      querySnapshot.forEach((doc) => {
        userCards.push({ id: doc.id, ...doc.data() })
      })
      console.log(userCards)
    }
    teste()
  }, [userId])

  return (
    <div>
      <form onSubmit={handleUpdatePefilForm}>
        <fieldset className="flex gap-4 items-center">
          <label className="w-[90px]" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            placeholder="seu nome"
            // defaultValue="PedroDuarte@gmail.com"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex gap-4 items-center">
          <label className="w-[90px]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="email"
            placeholder="seuemail@gmail.com"
            // defaultValue="PedroDuarte@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex gap-4 items-center">
          <label className="w-[90px]" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="password"
            placeholder="******"
            // defaultValue="PedroDuarte@gmail.com"
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        {/* <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="city">
          Cidade
        </label>
        <input
          type="text"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="city"
          placeholder="cidade"
          // defaultValue="PedroDuarte@gmail.com"
          onChange={(e) => setCity(e.target.value)}
        />
      </fieldset> */}

        <Button title="atulizar perfil" type="submit" />
      </form>

      <input type="text" placeholder="nejrgn" />
      <Button title="atulizar perfil" type="submit" />
    </div>
  )
}
