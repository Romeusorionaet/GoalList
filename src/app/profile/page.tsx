'use client'

import {
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { HeaderProfile } from './components/HeaderProfile'
import { GraphicGoals } from './components/GraphicGoals'
import { BodyProfile } from './components/BodyProfile'
import { DateTimeGoalProps } from '@/config/getData'
import { db } from '@/services/firebaseConfig'
import { useEffect } from 'react'
import useSWR from 'swr'

interface CardGoalProfileProps {
  dateTime: DateTimeGoalProps
  completedGoal: boolean
  failedGoal: boolean
  userId: string
  cardId: string
  goal: string
}

export default function Profile() {
  const { userId, displayName, photoURL } = useOnAuthenticated()

  const { data: cardGoal, error } = useSWR(`profile-${userId}`, async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'cardGoal'), where('userId', '==', userId)),
    )

    const goals: CardGoalProfileProps[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CardGoalProfileProps
      goals.push(data)
    })

    return goals
  })

  if (error) {
    console.log('error no cache', error)
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
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="mt-20 w-full space-y-4 bg-white">
        <HeaderProfile photoURL={photoURL} displayName={displayName} />

        {cardGoal && <GraphicGoals cardGoal={cardGoal} />}
      </div>

      <div>{cardGoal && <BodyProfile cardGoal={cardGoal} />}</div>
    </div>
  )
}
