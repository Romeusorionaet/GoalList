'use client'

import { Button } from '@/components/Button'
import { SyntheticEvent, useEffect, useState } from 'react'
import { doc, setDoc, Timestamp, getDocs, collection } from 'firebase/firestore'
import { auth, db } from '@/services/firebaseConfig'
import { onAuthStateChanged } from '@firebase/auth'

export default function Card() {
  const [history, setHistory] = useState('')
  const [boda, setBoda] = useState('')
  const [userId, setUserId] = useState<string | null>('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid)
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })
  })

  const handleCreateCardForm = async (event: SyntheticEvent) => {
    event.preventDefault()
    const docData = {
      userId,
      history: 'teste29/08',
      boda: 'testehj',
      dateExample: Timestamp.fromDate(new Date('December 10, 1815')),
    }
    await setDoc(doc(db, 'sharedCard', '4'), docData)
  }

  return (
    <form onSubmit={handleCreateCardForm}>
      <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="history">
          História
        </label>
        <input
          type="text"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="history"
          placeholder="sua história"
          // defaultValue="PedroDuarte@gmail.com"
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
          // defaultValue="PedroDuarte@gmail.com"
          onChange={(e) => setBoda(e.target.value)}
        />
      </fieldset>

      <Button title="Criar card" type="submit" />
    </form>
  )
}
