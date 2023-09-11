'use client'

import { Button } from '@/components/Button'
import { SyntheticEvent, useEffect, useState } from 'react'
import { auth, db } from '@/services/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { InputControl, InputRoot } from '@/components/Input'

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
      <fieldset className="flex items-center gap-4">
        <label className="w-[90px]" htmlFor="history">
          História
        </label>
        <InputRoot>
          <InputControl
            type="text"
            id="history"
            placeholder="sua história"
            onChange={(e) => setHistory(e.target.value)}
          />
        </InputRoot>
      </fieldset>

      <fieldset className="flex items-center gap-4">
        <label className="w-[90px]" htmlFor="boda">
          Boda
        </label>
        <InputRoot>
          <InputControl
            type="text"
            id="boda"
            placeholder="Boda (tempo)"
            onChange={(e) => setBoda(e.target.value)}
          />
        </InputRoot>
      </fieldset>

      <Button type="submit">Criar card</Button>
    </form>
  )
}
