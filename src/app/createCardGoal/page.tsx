'use client'

import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import 'react-datepicker/dist/react-datepicker.css'
import { setDoc, doc } from 'firebase/firestore'
import { SyntheticEvent, useState } from 'react'
import { db } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import uuid from 'react-uuid'

export default function CreateCardGoal() {
  const { photoURL, displayName, userId } = useOnAuthenticated()
  const [goal, setGoal] = useState('')

  const [startDate] = useState<Date>(new Date())
  const [finalDate, setFinalDate] = useState<Date>(new Date())
  const [formattedHour, setFormattedHour] = useState('')

  const formattedStartDate = format(startDate, 'dd/MM/yyyy')
  const formattedFinalDate = format(finalDate, 'dd/MM/yyyy')
  const currentTime = format(startDate, 'HH:mm')

  const docObjectItems = {
    completedGoal: false,
    failedGoal: false,
    displayName,
    dateTime: { formattedStartDate, formattedFinalDate, formattedHour },
    photoURL,
    userId,
    cardId: uuid(),
    goal,
  }

  const verifyIFUserCompletedProfile = () => {
    if (displayName === null || photoURL === null) {
      alert(
        'Complete o seu perfil para podermos personalizar melhor a sua experiência.',
      )
      return true
    }
    return false
  }

  const verifyDateAndHour = () => {
    const currentTimeArray = currentTime.split(':').map(Number)
    const formattedHourArray = formattedHour.split(':').map(Number)

    // Calculates the difference in minutes
    const currentTimeMinutes = currentTimeArray[0] * 60 + currentTimeArray[1]
    const formattedHourMinutes =
      formattedHourArray[0] * 60 + formattedHourArray[1]

    // Calculates the difference in minutes between hours
    const timeDifference = formattedHourMinutes - currentTimeMinutes

    if (timeDifference >= 60) {
      return false
    }

    alert('O objetivo deve ter pelo menos 1 hora de duração.')
    return true
  }

  async function HandleCreateCardForm(event: SyntheticEvent) {
    event.preventDefault()

    if (verifyIFUserCompletedProfile()) {
      return
    }

    if (!formattedHour) {
      alert('Selecione o horário.')
      return
    }

    if (verifyDateAndHour()) {
      return
    }

    try {
      await setDoc(doc(db, 'cardGoal', docObjectItems.cardId), docObjectItems)
      alert('Objetivo adicionado com sucesso.')

      setGoal('')

      setFinalDate(new Date())
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
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
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
          Data final
        </label>

        <DatePicker
          className="w-24 text-end"
          id="finalDate"
          selected={finalDate}
          onChange={(date) => setFinalDate(date!)}
        />
      </fieldset>

      <fieldset className="flex justify-between">
        <label className=" whitespace-nowrap" htmlFor="finalDate">
          Hora
        </label>

        <input
          type="time"
          value={formattedHour}
          onChange={(e) => setFormattedHour(e.target.value)}
        />
      </fieldset>

      <Button className="w-full" type="submit">
        Adicionar objetivo
      </Button>
    </form>
  )
}
