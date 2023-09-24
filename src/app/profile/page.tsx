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
import { CardGoalRoot } from '@/components/CardGoal/CardGoalRoot'
import { CardGoalBody } from '@/components/CardGoal/CardGoalBody'
import { Check, CheckCircle, User } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DateTimeGoalProps } from '@/config/getData'
import { db } from '@/services/firebaseConfig'
import useSWR, { mutate } from 'swr'
import { useEffect } from 'react'

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
      query(
        collection(db, 'cardGoal'),
        where('userId', '==', userId),
        where('failedGoal', '==', false),
        where('completedGoal', '==', false),
      ),
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

  function setValueTrueForCompletedGoal(cardId: string) {
    const cardRef = doc(db, 'cardGoal', cardId)

    updateDoc(cardRef, {
      completedGoal: true,
    })
  }

  function setValueTrueForFailedGoal(goalListId: string) {
    const cardRef = doc(db, 'cardGoal', goalListId)

    updateDoc(cardRef, {
      failedGoal: true,
    })
  }

  useEffect(() => {
    const currentDate = new Date()

    if (cardGoal) {
      cardGoal.forEach((goalList) => {
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

  function handleUpdateCardGoal(cardId: string) {
    setValueTrueForCompletedGoal(cardId)

    mutate(`profile-${userId}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {photoURL === null ? (
        <div
          className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full border border-zinc-400 bg-white`}
        >
          <User className="h-20 w-20" />
        </div>
      ) : (
        <div
          className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}
      <h1>{displayName === 'null' ? 'Nick name' : displayName}</h1>
      <h2>
        Aqui fica o perfil do user mostrando vários dados dele sobre seu
        desempenho, e como será público para outros ver, tem que ter sua foto.
      </h2>
      {cardGoal ? (
        cardGoal.map((card) => {
          return (
            <div className="relative p-4" key={card.cardId}>
              <CardGoalRoot>
                <CardGoalBody dateTime={card.dateTime} goal={card.goal} />
              </CardGoalRoot>

              {card.completedGoal ? (
                <CheckCircle className="absolute right-2 top-2 h-6 w-6 rounded-full bg-green-500" />
              ) : (
                <Checkbox.Root
                  onClick={() => handleUpdateCardGoal(card.cardId)}
                  className="shadow-blackA7 hover:bg-violet3 absolute right-2 top-2 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )}
            </div>
          )
        })
      ) : (
        <p>erg</p>
      )}
    </div>
  )
}
