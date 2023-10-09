'use client'

import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'
import { CardGoalRoot } from '../CardGoal/CardGoalRoot'
import { CardGoalBody } from '../CardGoal/CardGoalBody'
import { ProductivityData } from '../ProductivityData'
import { CardGoalDataProps } from '@/config/getData'
import { HeaderGoal } from '../CardGoal/HeaderGoal'
import { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { motion } from 'framer-motion'

export interface MainPostsProps {
  goals: CardGoalDataProps[]
}

export function UsersPosts({ goals }: MainPostsProps) {
  const [userLastCards, setUserLastCards] = useState<{
    [userId: string]: CardGoalDataProps
  }>({})

  const { sliderRef } = useKeenSliderMode()

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

  const userLastCardsArray = Object.values(userLastCards)

  const sortedUserLastCards = userLastCardsArray.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const userPostLastCards = sortedUserLastCards.slice(0, 10)

  return (
    <div className="mx-auto max-w-[1280px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
        }}
      >
        <div className="mb-8">
          <h2 className="mb-2">Viajantes</h2>
          <p className="dark:text-zinc-300">
            Exibimos os 10 mais recentes viajantes nessa linha do tempo
          </p>
        </div>

        {userPostLastCards.length > 0 && (
          <div ref={sliderRef} className="keen-slider">
            {userPostLastCards.map((lastCard) => {
              const userId = lastCard.userId

              const incompleteCountGoals = goals.filter(
                (card) =>
                  card.userId === userId &&
                  !card.completedGoal &&
                  !card.failedGoal,
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

              const objectProductivityData = {
                incompleteCountGoals,
                countAllGoals,
                countFailedGoals,
                countCompletedGoals,
              }

              return (
                <div className="keen-slider__slide" key={userId}>
                  <CardGoalRoot>
                    <HeaderGoal
                      displayName={lastCard.displayName}
                      photoURL={lastCard.photoURL}
                    />
                    <CardGoalBody
                      dateTime={lastCard.dateTime}
                      goal={lastCard.goal}
                    />
                    <ProductivityData
                      objectProductivityData={objectProductivityData}
                    />
                  </CardGoalRoot>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
