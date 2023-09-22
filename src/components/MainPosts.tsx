'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { CardGoalDataProps } from '@/config/getData'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface MainPostsProps {
  goals: CardGoalDataProps[]
}

export function MainPosts({ goals }: MainPostsProps) {
  const [userLastCard, setUserLastCard] = useState<{
    [userId: string]: CardGoalProps
  }>({})

  const [incompleteGoalsCount, setIncompleteGoalsCount] = useState<{
    [userId: string]: number
  }>({})

  useEffect(() => {
    const getSortedUserLastCards = () => {
      const lastCards: { [userId: string]: CardGoalProps } = {}

      goals.forEach((card) => {
        if (card.userId) {
          if (
            !lastCards[card.userId] ||
            card.dateTime.formattedStartDate >
              lastCards[card.userId].dateTime.formattedStartDate
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
    getSortedUserLastCards()
  }, [goals])

  const sortedUserLastCards = Object.values(userLastCard).sort(
    (a, b) =>
      Number(b.dateTime.formattedStartDate) -
      Number(a.dateTime.formattedStartDate),
  )

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {sortedUserLastCards.map((lastCard) => {
        const userId = lastCard.userId

        const incompleteCount = incompleteGoalsCount[userId!] || 0
        const conditionalStyle = incompleteCount === 0 ? 'hidden' : ''

        return (
          <div className={`${conditionalStyle} space-y-1`} key={userId}>
            <div className="flex justify-between">
              <p>
                Missões: <strong>{incompleteCount}</strong>
              </p>
              <Link
                className="rounded-md bg-zinc-500 px-2 py-1 text-sm text-white hover:bg-zinc-600"
                href={`/friendProfile/${userId}`}
              >
                <span>Espiar Viajante</span>
              </Link>
            </div>
            <CardGoal
              displayName={lastCard.displayName}
              photoURL={lastCard.photoURL}
              goal={lastCard.goal}
              dateTime={lastCard.dateTime}
            />

            <div className="mt-8 rounded-lg border border-zinc-200 sm:hidden" />
          </div>
        )
      })}
    </div>
  )
}
