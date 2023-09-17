'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
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
          return (
            <div key={userId}>
              <CardGoal
                displayName={cards[0].displayName}
                photoURL={cards[0].photoURL}
                goal={cards[0].goal}
                startDate={cards[0].startDate}
                finalDate={cards[0].finalDate}
              />
              <p>Todas as missões: {cards.length}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
