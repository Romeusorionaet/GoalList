'use client'

import { CardGoalRoot } from './CardGoal/CardGoalRoot'
import { CardGoalBody } from './CardGoal/CardGoalBody'
import { CardGoalDataProps } from '@/config/getData'
import { HeaderGoal } from './CardGoal/HeaderGoal'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface MainPostsProps {
  goals: CardGoalDataProps[]
}

export function MainPosts({ goals }: MainPostsProps) {
  const [userLastCard, setUserLastCard] = useState<{
    [userId: string]: CardGoalDataProps
  }>({})

  const [incompleteGoalsCount, setIncompleteGoalsCount] = useState<{
    [userId: string]: number
  }>({})

  useEffect(() => {
    const getSortedUserLastCards = () => {
      const lastCards: { [userId: string]: CardGoalDataProps } = {}

      goals.forEach((card) => {
        if (card.userId) {
          if (
            !lastCards[card.userId] ||
            new Date(card.createdAt) >
              new Date(lastCards[card.userId].createdAt)
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
          if (!card.completedGoal && !card.failedGoal) {
            incompleteCounts[card.userId]++
          }
        }
      })

      setIncompleteGoalsCount(incompleteCounts)
    }
    getSortedUserLastCards()
  }, [goals])

  const sortedUserLastCards = Object.values(userLastCard).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
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
            <CardGoalRoot>
              <HeaderGoal
                displayName={lastCard.displayName}
                photoURL={lastCard.photoURL}
              />
              <CardGoalBody dateTime={lastCard.dateTime} goal={lastCard.goal} />
            </CardGoalRoot>

            <div className="mt-8 rounded-lg border border-zinc-200 sm:hidden" />
          </div>
        )
      })}
    </div>
  )
}
