'use client'

import { db } from '@/services/firebaseConfig'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { CardGoal } from '@/components/CardGoal'

import { useEffect, useState } from 'react'

interface CardGoalProfileProps {
  finalDate: Timestamp
  startDate: Timestamp
  completedGoal: boolean
  displayName: string
  photoURL: string
  userId: string
  cardId: string
  goal: string
}

export default function FriendProfile({ params }: { params: { id: string } }) {
  const [cardGoal, setCardGoal] = useState<CardGoalProfileProps[]>([])
  const [displayName, setDisplayname] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const userIdFriend = params.id

  useEffect(() => {
    const getGoal = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'cardGoal'), where('userId', '==', userIdFriend)),
      )

      const goals: CardGoalProfileProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProfileProps
        goals.push(data)
      })

      setCardGoal(goals)
    }
    getGoal()
  }, [userIdFriend, cardGoal])

  useEffect(() => {
    if (cardGoal.length > 0) {
      setDisplayname(cardGoal[0].displayName)
      setPhotoURL(cardGoal[0].photoURL)
    }
  }, [cardGoal])

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white`}
      >
        <img
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          src={photoURL}
          alt="User Profile"
        />
      </div>
      <h1>Perfil de {displayName}</h1>
      <h2>
        Aqui fica o perfil do user mostrando vários dados dele sobre seu
        desempenho, e como será público para outros ver, tem que ter sua foto.
      </h2>
      {cardGoal &&
        cardGoal.map((card) => {
          return (
            <div className="relative p-4" key={card.cardId}>
              <CardGoal
                startDate={card.startDate}
                finalDate={card.finalDate}
                goal={card.goal}
              />
            </div>
          )
        })}
    </div>
  )
}
