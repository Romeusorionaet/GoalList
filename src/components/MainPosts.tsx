'use client'

import { CardGoalRoot } from './CardGoal/CardGoalRoot'
import { CardGoalBody } from './CardGoal/CardGoalBody'
import { CardGoalDataProps } from '@/config/getData'
import { HeaderGoal } from './CardGoal/HeaderGoal'
import { useEffect, useState } from 'react'

export interface MainPostsProps {
  goals: CardGoalDataProps[]
}

export function MainPosts({ goals }: MainPostsProps) {
  const [userLastCard, setUserLastCard] = useState<{
    [userId: string]: CardGoalDataProps
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
    }
    getSortedUserLastCards()
  }, [goals])

  const incompleteGoalsCount: { [userId: string]: number } = {}
  const countGoalsFailed = goals.filter((card) => card.failedGoal).length
  const countGoalsCompleted = goals.filter((card) => card.completedGoal).length

  goals.forEach((card) => {
    if (card.userId) {
      if (!incompleteGoalsCount[card.userId]) {
        incompleteGoalsCount[card.userId] = 0
      }
      if (!card.completedGoal && !card.failedGoal) {
        incompleteGoalsCount[card.userId]++
      }
    }
  })

  const sortedUserLastCards = Object.values(userLastCard).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 ">
      {sortedUserLastCards.map((lastCard) => {
        const userId = lastCard.userId

        const incompleteCount = incompleteGoalsCount[userId] || 0
        const conditionalStyle = incompleteCount === 0 ? 'hidden' : ''

        return (
          <div className={`${conditionalStyle} space-y-1`} key={userId}>
            <div className="flex justify-between">
              <p>
                Todas as missões: <strong>{goals.length}</strong>
              </p>
              <p>
                A concluir: <strong>{incompleteCount}</strong>
              </p>
            </div>
            <CardGoalRoot>
              <HeaderGoal
                displayName={lastCard.displayName}
                photoURL={lastCard.photoURL}
              />
              <CardGoalBody dateTime={lastCard.dateTime} goal={lastCard.goal} />
            </CardGoalRoot>

            <div className="flex justify-between">
              <p>
                fracassadas: <strong>{countGoalsFailed}</strong>
              </p>
              <p>
                Concluídas: <strong>{countGoalsCompleted}</strong>
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-zinc-200 sm:hidden" />
          </div>
        )
      })}
    </div>
  )
}
