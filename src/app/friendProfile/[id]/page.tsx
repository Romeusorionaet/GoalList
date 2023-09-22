'use client'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { CardGoal } from '@/components/CardGoal'
import { db } from '@/services/firebaseConfig'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { CardGoalDataProps } from '@/config/getData'

export default function FriendProfile({ params }: { params: { id: string } }) {
  const [displayName, setDisplayname] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const userIdFriend = params.id

  const { data: cardGoal, error } = useSWR(
    `profile-${userIdFriend}`,
    async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'cardGoal'), where('userId', '==', userIdFriend)),
      )

      const goals: CardGoalDataProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalDataProps
        goals.push(data)
      })

      return goals
    },
  )

  if (error) {
    console.log(error)
  }

  useEffect(() => {
    if (cardGoal && cardGoal.length > 0) {
      setDisplayname(cardGoal[0].displayName)
      setPhotoURL(cardGoal[0].photoURL)
    }
  }, [cardGoal])

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {photoURL && (
        <div
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}
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
