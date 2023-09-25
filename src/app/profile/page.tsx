'use client'

import { GoalContext, GoalProviderContext } from '@/contexts/ProviderGoalList'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { HeaderProfile } from './components/HeaderProfile'
import { GraphicGoals } from './components/GraphicGoals'
import { BodyProfile } from './components/BodyProfile'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'
import { useContext, useEffect } from 'react'

export default function Profile() {
  const { displayName, photoURL } = useOnAuthenticated()
  const { cardGoal, error } = useContext(GoalContext)

  if (error) {
    console.log('Problema no cache', error)
  }

  const setValueTrueForFailedGoal = (goalListId: string) => {
    const cardRef = doc(db, 'cardGoal', goalListId)

    updateDoc(cardRef, {
      failedGoal: true,
    })
  }

  useEffect(() => {
    const currentDate = new Date()

    if (cardGoal) {
      const filteredCards = cardGoal.filter(
        (card) => !card.completedGoal && !card.failedGoal,
      )

      filteredCards.forEach((goalList) => {
        const formattedFinalDate = goalList.dateTime.formattedFinalDate
        const formattedHour = goalList.dateTime.formattedHour

        const [day, monthStr, yearStr] = formattedFinalDate.split('/')
        const [hour, minute] = formattedHour.split(':')

        const year = parseInt(yearStr, 10)
        const month = parseInt(monthStr, 10) - 1

        const finalDate = new Date(
          year,
          month,
          parseInt(day, 10),
          parseInt(hour, 10),
          parseInt(minute, 10),
        )

        if (finalDate < currentDate) {
          setValueTrueForFailedGoal(goalList.cardId)
        }
      })
    }
  }, [cardGoal])

  return (
    <GoalProviderContext>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="mt-20 w-full space-y-4 bg-white">
          <HeaderProfile photoURL={photoURL} displayName={displayName} />

          {<GraphicGoals />}
        </div>

        <div>{<BodyProfile />}</div>
      </div>
    </GoalProviderContext>
  )
}
