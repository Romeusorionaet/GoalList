import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'
import { MainPosts } from '@/components/MainPosts'

interface CardGoalProps {
  finalDate: Timestamp
  startDate: Timestamp
  completedGoal: boolean
  displayName: string
  photoURL: string
  userId: string
  cardId: string
  goal: string
}

export default async function Home() {
  const goals = await getData()

  return (
    <div className="flex flex-col space-y-20 ">
      <h1 className="text-xl">Linha do tempo da jornada de todo viajante</h1>
      <MainPosts goals={goals} />
    </div>
  )
}

export const getData = async (): Promise<CardGoalProps[]> => {
  const querySnapshot = await getDocs(collection(db, 'cardGoal'))

  const goals: CardGoalProps[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data() as CardGoalProps
    goals.push(data)
  })

  return goals
}
