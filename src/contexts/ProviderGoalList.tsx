'use client'

import React, { ReactNode, createContext, useEffect, useState } from 'react'
import {
  runTransaction,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { DateTimeGoalProps } from '@/config/getData'
import { db } from '@/services/firebaseConfig'
import useSWR from 'swr'

interface CardGoalProfileProps {
  createdAt: Date
  dateTime: DateTimeGoalProps
  completedGoal: boolean
  failedGoal: boolean
  userId: string
  cardId: string
  goal: string
}

interface StateGoalsCountProps {
  notCompletedGoals: number
  completedGoals: number
  failedGoals: number
  allGoals: number
}

// interface userCountItemsProps {
//   countIncompleteGoals: number
//   countCompletedGoals: number
//   countFailedGoals: number
//   countAllGoals: number
// }

interface GoalContextType {
  selectedViewMode: string
  getSelectedViewMode: (viewModeList: string) => void
  // updateDocObjectCountItems: (indice: string) => void
  orderListFiltered: CardGoalProfileProps[]
  stateCountGoals: StateGoalsCountProps
  cardGoal?: CardGoalProfileProps[]
  error: string
}

interface GoalContextProps {
  children: ReactNode
}

export const GoalContext = createContext({} as GoalContextType)

export function GoalProviderContext({ children }: GoalContextProps) {
  const [stateCountGoals, setStateCountGoals] = useState<StateGoalsCountProps>({
    notCompletedGoals: 0,
    completedGoals: 0,
    failedGoals: 0,
    allGoals: 0,
  })

  const { userData } = useOnAuthenticated()

  const [selectedViewMode, setSelectedViewMode] = useState('notCompleted')
  const [orderListFiltered, setOrderListFiltered] = useState<
    CardGoalProfileProps[]
  >([])

  const { data: cardGoal, error } = useSWR(
    `profile-${userData?.uid}`,
    async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'cardGoal'), where('userId', '==', userData?.uid)),
      )

      const goals: CardGoalProfileProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProfileProps
        data.createdAt = new Date(data.createdAt)
        goals.push(data)
      })

      goals.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt)
      })

      const goalCounts = {
        notCompletedGoals: goals.filter(
          (card) => !card.completedGoal && !card.failedGoal,
        ).length,
        completedGoals: goals.filter((card) => card.completedGoal).length,
        failedGoals: goals.filter((card) => card.failedGoal).length,
        allGoals: goals.length,
      }

      setStateCountGoals(goalCounts)

      return goals
    },
  )

  const getSelectedViewMode = (viewModeList: string) => {
    setSelectedViewMode(viewModeList)
  }

  // const updateDocObjectCountItems = async (indice: string) => {
  //   const cardRef = doc(db, 'userCountItems', String(userData?.email))

  //   try {
  //     await runTransaction(db, async (transaction) => {
  //       const cardDoc = await transaction.get(cardRef)

  //       if (!cardDoc.exists()) {
  //         throw new Error('Card does not exist')
  //       }

  //       const cardData = cardDoc.data() as userCountItemsProps

  //       if (!cardData) {
  //         return
  //       }

  //       if (indice === 'addCountAllGoalsAndIncompleteGoals') {
  //         transaction.update(cardRef, {
  //           countAllGoals: cardData.countAllGoals + 1,
  //           countIncompleteGoals: cardData.countIncompleteGoals + 1,
  //         })
  //       }

  //       if (indice === 'updateCompletedGoal') {
  //         transaction.update(cardRef, {
  //           countCompletedGoals: cardData.countCompletedGoals + 1,
  //           countIncompleteGoals: cardData.countIncompleteGoals - 1,
  //         })
  //       }

  //       if (indice === 'failedGoal') {
  //         transaction.update(cardRef, {
  //           countIncompleteGoals: cardData.countIncompleteGoals - 1,
  //           countFailedGoals: cardData.countFailedGoals + 1,
  //         })
  //       }
  //     })
  //   } catch (error) {
  //     console.error('Erro ao concluir o objetivo:', error)
  //   }
  // }

  useEffect(() => {
    if (cardGoal) {
      const filterFunctions: {
        [key: string]: (card: CardGoalProfileProps) => boolean
      } = {
        notCompletedGoals: (card) => !card.completedGoal && !card.failedGoal,
        completedGoals: (card) => card.completedGoal,
        failedGoals: (card) => card.failedGoal,
        allGoals: () => true,
      }

      const filterFunction = filterFunctions[selectedViewMode]

      if (filterFunction) {
        const filteredGoals = cardGoal.filter(filterFunction)
        setOrderListFiltered(filteredGoals)
      }
    }
  }, [cardGoal, selectedViewMode])

  const setValueTrueForFailedGoal = (goalListId: string) => {
    const cardRef = doc(db, 'cardGoal', goalListId)

    updateDoc(cardRef, {
      failedGoal: true,
    })
  }

  useEffect(() => {
    const currentDate = new Date()

    if (cardGoal) {
      const filteredCards = cardGoal.filter(
        (card) => !card.completedGoal && !card.failedGoal,
      )

      filteredCards.forEach((goalList) => {
        const formattedFinalDate = goalList.dateTime.formattedFinalDate
        const formattedHour = goalList.dateTime.formattedHour

        const [day, monthStr, yearStr] = formattedFinalDate.split('/')
        const [hour, minute] = formattedHour.split(':')

        const year = parseInt(yearStr, 10)
        const month = parseInt(monthStr, 10) - 1

        const finalDate = new Date(
          year,
          month,
          parseInt(day, 10),
          parseInt(hour, 10),
          parseInt(minute, 10),
        )

        if (finalDate < currentDate) {
          setValueTrueForFailedGoal(goalList.cardId)
          // updateDocObjectCountItems('failedGoal')
        }
      })
    }
  }, [cardGoal])

  return (
    <GoalContext.Provider
      value={{
        // updateDocObjectCountItems,
        getSelectedViewMode,
        orderListFiltered,
        selectedViewMode,
        stateCountGoals,
        cardGoal,
        error,
      }}
    >
      {children}
    </GoalContext.Provider>
  )
}
