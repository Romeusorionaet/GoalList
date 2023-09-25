import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
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

interface StateGoalsProps {
  notCompleted: number
  completed: number
  failed: number
  all: number
}

interface GoalContextType {
  selectedViewMode: string
  getSelectedViewMode: (viewModeList: string) => void
  orderListFiltered: CardGoalProfileProps[]
  stateCountGoals: StateGoalsProps
  cardGoal?: CardGoalProfileProps[]
  error: string
}

interface GoalContextProps {
  children: ReactNode
}

export const GoalContext = createContext({} as GoalContextType)

export function GoalProviderContext({ children }: GoalContextProps) {
  const [stateCountGoals, setStateCountGoals] = useState<StateGoalsProps>({
    notCompleted: 0,
    completed: 0,
    failed: 0,
    all: 0,
  })

  const { userId } = useOnAuthenticated()

  const [selectedViewMode, setSelectedViewMode] = useState('notCompleted')
  const [orderListFiltered, setOrderListFiltered] = useState<
    CardGoalProfileProps[]
  >([])

  const { data: cardGoal, error } = useSWR(`profile-${userId}`, async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'cardGoal'), where('userId', '==', userId)),
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
      notCompleted: goals.filter(
        (card) => !card.completedGoal && !card.failedGoal,
      ).length,
      completed: goals.filter((card) => card.completedGoal).length,
      failed: goals.filter((card) => card.failedGoal).length,
      all: goals.length,
    }

    setStateCountGoals(goalCounts)

    return goals
  })

  const getSelectedViewMode = (viewModeList: string) => {
    setSelectedViewMode(viewModeList)
  }

  useEffect(() => {
    if (cardGoal) {
      const modeFilterMap: {
        [key: string]: (card: CardGoalProfileProps) => boolean
      } = {
        notCompleted: (card) => !card.completedGoal && !card.failedGoal,
        completed: (card) => card.completedGoal,
        failed: (card) => card.failedGoal,
        all: () => true,
      }

      const filterFunction = modeFilterMap[selectedViewMode]

      if (filterFunction) {
        const filteredGoals = cardGoal.filter(filterFunction)
        setOrderListFiltered(filteredGoals)
      }
    }
  }, [cardGoal, selectedViewMode])

  return (
    <GoalContext.Provider
      value={{
        selectedViewMode,
        getSelectedViewMode,
        orderListFiltered,
        stateCountGoals,
        cardGoal,
        error,
      }}
    >
      {children}
    </GoalContext.Provider>
  )
}
