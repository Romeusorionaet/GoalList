'use client'

import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { useNotification } from '@/hooks/useNotification'
import { FormEvent, useContext, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@/components/Form/Button'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'

import DatePicker from 'react-datepicker'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import uuid from 'react-uuid'
// import { GoalContext } from '@/contexts/ProviderGoalList'

export default function CreateCardGoal() {
  // const { updateDocObjectCountItems } = useContext(GoalContext)
  const { notifyError, notifySuccess } = useNotification()
  const { userData } = useOnAuthenticated()
  const [goal, setGoal] = useState('')

  const [startDate] = useState<Date>(new Date())
  const [finalDate, setFinalDate] = useState<Date>(new Date())
  const [formattedHour, setFormattedHour] = useState('')

  const formattedStartDate = format(startDate, 'dd/MM/yyyy')
  const formattedFinalDate = format(finalDate, 'dd/MM/yyyy')
  const currentTime = format(startDate, 'HH:mm')

  const docObjectItems = {
    createdAt: new Date().toJSON(),
    completedGoal: false,
    failedGoal: false,
    dateTime: { formattedStartDate, formattedFinalDate, formattedHour },
    displayName: userData?.displayName,
    photoURL: userData?.photoURL,
    userId: userData?.uid,
    cardId: uuid(),
    goal,
  }

  const verifyIFUserCompletedProfile = () => {
    if (userData?.displayName === null || userData?.photoURL === null) {
      notifyError(
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

    notifyError('O objetivo deve ter pelo menos 1 hora de duração')
    return true
  }

  const docObjectCountItems = {
    cardId: uuid(),
    user: String(userData?.email),
    countIncompleteGoals: 0,
    countCompletedGoals: 0,
    countFailedGoals: 0,
    countAllGoals: 0,
  }

  // const handleCreateCollection = async () => {
  //   // pensar no modo com que essa função seja chamada pelo user apenas uma vez
  //   await setDoc(
  //     doc(db, 'userCountItems', docObjectCountItems.user),
  //     docObjectCountItems,
  //   )
  //   notifySuccess('Coleção criado com sucesso')
  // }

  async function HandleCreateCardForm(event: FormEvent) {
    event.preventDefault()

    if (verifyIFUserCompletedProfile()) {
      return
    }

    if (!formattedHour) {
      notifyError('Selecione o horário')
      return
    }

    if (!goal) {
      notifyError('Campo vazio')
      return
    }

    if (verifyDateAndHour()) {
      return
    }

    try {
      await setDoc(doc(db, 'cardGoal', docObjectItems.cardId), docObjectItems)
      // updateDocObjectCountItems('addCountAllGoalsAndIncompleteGoals')

      notifySuccess('Objetivo adicionado com sucesso.')

      setGoal('')
      setFormattedHour('')

      setFinalDate(new Date())
    } catch (error) {
      notifyError(
        'Algo deu errado, estamos trabalhando para corrigir este erro',
      )
    }
  }

  return (
    <motion.div
      className="mx-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <form
        className="mx-auto max-w-[720px] space-y-8 rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] dark:bg-slate-800 dark:text-white"
        onSubmit={HandleCreateCardForm}
      >
        <fieldset className="flex flex-col items-center gap-4">
          <label htmlFor="goal">Objetivo</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="h-40 w-full resize-none bg-zinc-100 p-2 dark:bg-slate-400 dark:text-zinc-800 dark:placeholder-zinc-800"
            placeholder="Seu objetivo"
          />
        </fieldset>

        <fieldset className="flex max-w-[14rem] items-center justify-between gap-4">
          <label htmlFor="startDate">Data de inicio</label>

          <DatePicker
            className="w-24 rounded-md bg-zinc-200 p-1 text-end hover:cursor-not-allowed dark:bg-slate-700 dark:text-white"
            onChange={() => false}
            id="startDate"
            disabled
            selected={startDate}
          />
        </fieldset>

        <fieldset className="flex max-w-[14rem] items-center justify-between gap-4">
          <label htmlFor="finalDate">Data final</label>

          <DatePicker
            className="w-24 rounded-md p-1 text-end dark:bg-slate-400 dark:text-white"
            id="finalDate"
            selected={finalDate}
            onChange={(date) => setFinalDate(date!)}
          />
        </fieldset>

        <fieldset className="flex max-w-[14rem] items-center justify-between gap-4">
          <label htmlFor="finalDate">Hora</label>

          <input
            className="rounded-md p-2 dark:bg-slate-400 dark:text-white"
            type="time"
            value={formattedHour}
            onChange={(e) => setFormattedHour(e.target.value)}
          />
        </fieldset>

        <div className="flex justify-end">
          <Button className="max-sm:w-full" type="submit">
            Adicionar objetivo
          </Button>
        </div>

        {/* <div>
          <Button type="button" onClick={handleCreateCollection}>
            Criar coleção no db
          </Button>
        </div> */}
      </form>
    </motion.div>
  )
}
