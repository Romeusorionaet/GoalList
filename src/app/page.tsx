'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [userCards, setUserCards] = useState<{
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

      setUserCards(groupedCards)
    }
    getGoals()
  }, [])

  return (
    <div>
      <h1>Hello World</h1>

      <div>
        {Object.keys(userCards).map((userId) => {
          const cards = userCards[userId]
          const lastIndex = cards.length - 1
          const lastCard = cards[lastIndex]

          return (
            <div key={userId}>
              <Link href={`/friendProfile/${userId}`}>
                <CardGoal
                  displayName={lastCard.displayName}
                  photoURL={lastCard.photoURL}
                  goal={lastCard.goal}
                  startDate={lastCard.startDate}
                  finalDate={lastCard.finalDate}
                />
                <p>Todas as missões: {cards.length}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
