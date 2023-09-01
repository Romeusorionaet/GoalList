'use client'

import { Button } from '@/components/Button'
import { SyntheticEvent, useEffect, useState } from 'react'
import { auth, db } from '@/services/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'

export default function Card() {
  const [history, setHistory] = useState('')
  const [boda, setBoda] = useState('')
  const [userId, setUserId] = useState<string | null>('')

  const docObjectItems = {
    userId,
    history,
    boda,
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })
  })

  async function HandleCreateCardForm(event: SyntheticEvent) {
    event.preventDefault()

    try {
      await setDoc(doc(db, 'card', userId!), docObjectItems)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={HandleCreateCardForm}>
      <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="history">
          História
        </label>
        <input
          type="text"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="history"
          placeholder="sua história"
          onChange={(e) => setHistory(e.target.value)}
        />
      </fieldset>

      <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="boda">
          Boda
        </label>
        <input
          type="text"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="boda"
          placeholder="Boda (tempo)"
          onChange={(e) => setBoda(e.target.value)}
        />
      </fieldset>

      <Button title="Criar card" type="submit" />
    </form>
  )
}
