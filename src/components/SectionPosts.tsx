'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SectionPosts() {
  const [userLastCard, setUserLastCard] = useState<{
    [userId: string]: CardGoalProps
  }>({})

  const [incompleteGoalsCount, setIncompleteGoalsCount] = useState<{
    [userId: string]: number
  }>({})

  useEffect(() => {
    const getGoals = async () => {
      const querySnapshot = await getDocs(collection(db, 'cardGoal'))
      const goals: CardGoalProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProps
        goals.push(data)
      })

      const lastCards: { [userId: string]: CardGoalProps } = {}

      goals.forEach((card) => {
        if (card.userId) {
          if (
            !lastCards[card.userId] ||
            card.startDate > lastCards[card.userId].startDate
          ) {
            lastCards[card.userId] = card
          }
        }
      })

      setUserLastCard(lastCards)

      const incompleteCounts: { [userId: string]: number } = {}
      goals.forEach((card) => {
        if (card.userId) {
          if (!incompleteCounts[card.userId]) {
            incompleteCounts[card.userId] = 0
          }
          if (!card.completedGoal) {
            incompleteCounts[card.userId]++
          }
        }
      })

      setIncompleteGoalsCount(incompleteCounts)
    }
    getGoals()
  }, [])

  const sortedUserLastCards = Object.values(userLastCard).sort(
    (a, b) => Number(b.startDate) - Number(a.startDate),
  )

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {sortedUserLastCards.map((lastCard) => {
        const userId = lastCard.userId

        const incompleteCount = incompleteGoalsCount[userId!] || 0
        const conditionalStyle = incompleteCount === 0 ? 'hidden' : ''

        return (
          <div className={`${conditionalStyle}  `} key={userId}>
            <div className="flex justify-between">
              <p>
                Missões: <strong>{incompleteCount}</strong>
              </p>
              <Link
                className="rounded-md bg-green-500 p-1 text-sm text-white hover:bg-green-600"
                href={`/friendProfile/${userId}`}
              >
                <span>Espiar Viajante</span>
              </Link>
            </div>
            <CardGoal
              displayName={lastCard.displayName}
              photoURL={lastCard.photoURL}
              goal={lastCard.goal}
              startDate={lastCard.startDate}
              finalDate={lastCard.finalDate}
            />
          </div>
        )
      })}
    </div>
  )
}
