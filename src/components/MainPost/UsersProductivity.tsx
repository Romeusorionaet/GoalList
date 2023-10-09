'use client'

import { CardGoalRoot } from '../CardGoal/CardGoalRoot'
import { ProductivityData } from '../ProductivityData'
import { CardGoalDataProps } from '@/config/getData'
import { HeaderGoal } from '../CardGoal/HeaderGoal'
import { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { motion } from 'framer-motion'

export interface UsersProductivityProps {
  goals: CardGoalDataProps[]
}

export function UsersProductivity({ goals }: UsersProductivityProps) {
  const [userLastCards, setUserLastCards] = useState<CardGoalDataProps[]>([])

  useEffect(() => {
    const getSortedUserLastCards = () => {
      const completedGoalCards = goals.filter((card) => card.completedGoal)

      const userCardCounts: { [userId: string]: number } = {}
      completedGoalCards.forEach((card) => {
        if (!userCardCounts[card.userId]) {
          userCardCounts[card.userId] = 1
        } else {
          userCardCounts[card.userId]++
        }
      })

      const sortedUsers = Object.keys(userCardCounts).sort(
        (a, b) => userCardCounts[b] - userCardCounts[a],
      )

      const lastCards: { [userId: string]: CardGoalDataProps } = {}
      completedGoalCards.forEach((card) => {
        if (sortedUsers.includes(card.userId) && !lastCards[card.userId]) {
          lastCards[card.userId] = card
        }
      })

      const sortedLastCards = Object.values(lastCards).sort(
        (a, b) => userCardCounts[b.userId] - userCardCounts[a.userId],
      )

      setUserLastCards(sortedLastCards)
    }

    getSortedUserLastCards()
  }, [goals])

  const lastTenUserLastCards = userLastCards.slice(0, 6)

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
          <h2 className="mb-2">Viajantes mais produtivos</h2>
          <p className="dark:text-zinc-300">
            Os 6 viajantes mais produtivo é levado em consideração a quantidade
            de objetivos concluídos
          </p>
        </div>

        {lastTenUserLastCards.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {lastTenUserLastCards.map((lastCard) => {
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
                <div key={userId}>
                  <CardGoalRoot>
                    <HeaderGoal
                      displayName={lastCard.displayName}
                      photoURL={lastCard.photoURL}
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
