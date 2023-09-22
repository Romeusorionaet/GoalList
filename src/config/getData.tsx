import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'

export interface CardGoalDataProps {
  finalDate: Timestamp
  startDate: Timestamp
  completedGoal: boolean
  displayName: string
  photoURL: string
  userId: string
  cardId: string
  goal: string
}

export const getData = async (): Promise<CardGoalDataProps[]> => {
  const querySnapshot = await getDocs(collection(db, 'cardGoal')).catch(
    (error) => {
      console.log(error)
    },
  )

  if (!querySnapshot) {
    return []
  }

  const goals: CardGoalDataProps[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data() as CardGoalDataProps
    goals.push(data)
  })

  return goals
}
