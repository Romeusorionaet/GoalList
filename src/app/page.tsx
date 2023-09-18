'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [userCardsGoal, setUserCardsGoal] = useState<{
    [userId: string]: CardGoalProps[]
  }>({})

  useEffect(() => {
    const getGoals = async () => {
      const querySnapshot = await getDocs(collection(db, 'cardGoal'))
      const goals: CardGoalProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProps
        goals.push(data)
      })

      const groupedCards: { [userId: string]: CardGoalProps[] } = goals.reduce(
        (accumulator, card) => {
          if (card.userId) {
            if (!accumulator[card.userId]) {
              accumulator[card.userId] = []
            }
            accumulator[card.userId].push(card)
          }
          return accumulator
        },
        {} as { [userId: string]: CardGoalProps[] },
      )

      setUserCardsGoal(groupedCards)
    }
    getGoals()
  }, [])

  return (
    <div>
      <div>
        {Object.keys(userCardsGoal).map((userId) => {
          const cards = userCardsGoal[userId]
          const lastIndex = cards.length - 1
          const lastCard = cards[lastIndex]

          const NumberOfObjectivesToComplete = cards.filter(
            (card) => !card.completedGoal,
          ).length

          const conditionalStyle =
            NumberOfObjectivesToComplete === 0 ? 'hidden' : ''

          return (
            <div className={`${conditionalStyle}`} key={userId}>
              <p>
                Quantidade de missões para este viajante cocluir:{' '}
                <strong>{NumberOfObjectivesToComplete}</strong>
              </p>
              <Link href={`/friendProfile/${userId}`}>
                <CardGoal
                  displayName={lastCard.displayName}
                  photoURL={lastCard.photoURL}
                  goal={lastCard.goal}
                  startDate={lastCard.startDate}
                  finalDate={lastCard.finalDate}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
