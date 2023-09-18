'use client'

import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { CardGoal } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'

import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, CheckCircle } from 'phosphor-react'
import { useEffect, useState } from 'react'

interface CardGoalProfileProps {
  finalDate: Timestamp
  startDate: Timestamp
  completedGoal: boolean
  userId: string
  cardId: string
  goal: string
}

export default function Profile() {
  const [cardGoal, setCardGoal] = useState<CardGoalProfileProps[]>([])
  const { userId, displayName, photoURL } = useOnAuthenticated()

  useEffect(() => {
    const getGoal = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'cardGoal'), where('userId', '==', userId)),
      )

      const goals: CardGoalProfileProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProfileProps
        goals.push(data)
      })

      setCardGoal(goals)
    }
    getGoal()
  }, [userId, cardGoal])

  function handleSetValueTrueForCompletedGoal(cardId: string) {
    const cardRef = doc(db, 'cardGoal', cardId)

    updateDoc(cardRef, {
      completedGoal: true,
    })
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white`}
      >
        <img
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          src={photoURL}
          alt="User Profile"
        />
      </div>
      <h1>{displayName}</h1>
      <h2>
        Aqui fica o perfil do user mostrando vários dados dele sobre seu
        desempenho, e como será público para outros ver, tem que ter sua foto.
      </h2>
      {cardGoal &&
        cardGoal.map((card) => {
          return (
            <div className="relative p-4" key={card.cardId}>
              <CardGoal
                startDate={card.startDate}
                finalDate={card.finalDate}
                goal={card.goal}
              />

              {card.completedGoal ? (
                <CheckCircle className="absolute right-2 top-2 h-6 w-6 rounded-full bg-green-500" />
              ) : (
                <Checkbox.Root
                  onClick={() =>
                    handleSetValueTrueForCompletedGoal(card.cardId)
                  }
                  className="shadow-blackA7 hover:bg-violet3 absolute right-2 top-2 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )}
            </div>
          )
        })}
    </div>
  )
}
