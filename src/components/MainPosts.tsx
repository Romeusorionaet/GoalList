'use client'

import {
  ClipboardText,
  HourglassLow,
  HourglassMedium,
  ListChecks,
} from 'phosphor-react'
import { CardGoalRoot } from './CardGoal/CardGoalRoot'
import { CardGoalBody } from './CardGoal/CardGoalBody'
import { CardGoalDataProps } from '@/config/getData'
import { HeaderGoal } from './CardGoal/HeaderGoal'
import { useEffect, useState } from 'react'

export interface MainPostsProps {
  goals: CardGoalDataProps[]
}

export function MainPosts({ goals }: MainPostsProps) {
  const [userLastCards, setUserLastCards] = useState<{
    [userId: string]: CardGoalDataProps
  }>({})

  useEffect(() => {
    const getSortedUserLastCards = () => {
      const lastCards: { [userId: string]: CardGoalDataProps } = goals.reduce(
        (acc, card) => {
          if (
            !acc[card.userId] ||
            new Date(card.createdAt) > new Date(acc[card.userId].createdAt)
          ) {
            acc[card.userId] = card
          }
          return acc
        },
        {} as { [userId: string]: CardGoalDataProps },
      )

      setUserLastCards(lastCards)
    }

    getSortedUserLastCards()
  }, [goals])

  const sortedUserLastCards = Object.values(userLastCards).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {sortedUserLastCards.length > 0 &&
        sortedUserLastCards.map((lastCard) => {
          const userId = lastCard.userId

          const incompleteCountGoals = goals.filter(
            (card) =>
              card.userId === userId && !card.completedGoal && !card.failedGoal,
          ).length

          const countFailedGoals = goals.filter(
            (card) => card.userId === userId && card.failedGoal,
          ).length

          const countCompletedGoals = goals.filter(
            (card) => card.userId === userId && card.completedGoal,
          ).length

          const countAllGoals = goals.filter(
            (card) => card.userId === userId,
          ).length

          return (
            <div className="space-y-1" key={userId}>
              <div className="flex justify-between dark:text-white">
                <div className="flex items-center gap-1">
                  <ClipboardText size={28} weight="light" />
                  <p>
                    <strong>{countAllGoals}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <HourglassMedium size={28} weight="fill" />
                  <p>
                    <strong>{incompleteCountGoals}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <HourglassLow size={28} weight="fill" />
                  <p>
                    <strong>{countFailedGoals}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <ListChecks size={28} weight="light" />
                  <p>
                    <strong>{countCompletedGoals}</strong>
                  </p>
                </div>
              </div>
              <CardGoalRoot>
                <HeaderGoal
                  displayName={lastCard.displayName}
                  photoURL={lastCard.photoURL}
                />
                <CardGoalBody
                  dateTime={lastCard.dateTime}
                  goal={lastCard.goal}
                />
              </CardGoalRoot>
            </div>
          )
        })}
    </div>
  )
}
