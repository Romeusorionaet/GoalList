import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'

export interface DateTimeGoalProps {
  formattedStartDate: string
  formattedFinalDate: string
  formattedHour: string
}

export interface CardGoalDataProps {
  createdAt: Date
  dateTime: DateTimeGoalProps
  completedGoal: boolean
  failedGoal: boolean
  displayName: string
  photoURL: string
  userId: string
  cardId: string
  goal: string
}

export const getData = async (): Promise<CardGoalDataProps[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cardGoal'))

    const goals: CardGoalDataProps[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CardGoalDataProps

      goals.push(data)
    })

    return goals
  } catch (error) {
    console.error(error)
    return []
  }
}
