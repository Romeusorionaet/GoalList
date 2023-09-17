'use client'

import { CardGoal, CardGoalProps } from '@/components/CardGoal'
import { auth, db } from '@/services/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

export default function MyCardsGoal() {
  const [cardGoal, setCardGoal] = useState<CardGoalProps[]>([])
  const [checkboxState, setCheckboxState] = useState(false)
  const [userId, setUserId] = useState<string | null>('')

  useEffect(() => {
    const getGoal = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'cardGoal'), where('userId', '==', userId)),
      )

      const goals: CardGoalProps[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data() as CardGoalProps
        goals.push(data)
      })

      setCardGoal(goals)
    }
    getGoal()
  }, [userId])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        console.log('User is signed out')
      }
    })
  })

  function handleCheckBoxState() {
    checkboxState ? setCheckboxState(false) : setCheckboxState(true)
  }

  return (
    <div>
      {cardGoal &&
        cardGoal.map((card) => {
          return (
            <div className="relative" key={card.userId}>
              <CardGoal
                displayName={card.displayName}
                photoURL={card.photoURL}
                goal={card.goal}
                startDate={card.startDate}
                finalDate={card.finalDate}
              />

              <Checkbox.Root
                onClick={handleCheckBoxState}
                className="shadow-blackA7 hover:bg-violet3 absolute right-2 top-2 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
              >
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
          )
        })}
    </div>
  )
}
