'use client'

import { Button } from '@/components/Button'
import { SyntheticEvent, useEffect, useState } from 'react'
import { auth, db } from '@/services/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { uuid as v4 } from 'uuidv4'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Card() {
  const [userId, setUserId] = useState<string | null>('')
  const [goal, setgoal] = useState('')

  const [finalDate, setFinalDate] = useState<Date | null>(new Date())
  const [startDate] = useState<Date | null>(new Date())

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const docObjectItems = {
    completedGoal: false,
    displayName,
    finalDate,
    startDate,
    photoURL,
    userId,
    goal,
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(String(user.displayName))
        setPhotoURL(String(user.photoURL))
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })
  })

  async function HandleCreateCardForm(event: SyntheticEvent) {
    event.preventDefault()

    try {
      await setDoc(doc(db, 'cardGoal', v4()), docObjectItems)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] space-y-8 rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      onSubmit={HandleCreateCardForm}
    >
      <fieldset className="flex flex-col items-center gap-4">
        <label className="w-[90px]" htmlFor="goal">
          Objetivo
        </label>
        <textarea
          onChange={(e) => setgoal(e.target.value)}
          className="h-40 w-full resize-none bg-zinc-100 p-2"
          placeholder="Seu objetivo"
        />
      </fieldset>

      <fieldset className="flex justify-between">
        <label className=" whitespace-nowrap" htmlFor="startDate">
          Data de inicio
        </label>

        <DatePicker
          className="w-24 text-end"
          onChange={() => null}
          id="startDate"
          disabled
          selected={startDate}
        />
      </fieldset>

      <fieldset className="flex justify-between">
        <label className=" whitespace-nowrap" htmlFor="finalDate">
          Data de entrega
        </label>

        <DatePicker
          className="w-24 text-end"
          id="finalDate"
          selected={finalDate}
          onChange={(date) => setFinalDate(date)}
        />
      </fieldset>

      <Button className="w-full" type="submit">
        Adicionar objetivo
      </Button>
    </form>
  )
}
