import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { CardGoalRoot } from '@/components/CardGoal/CardGoalRoot'
import { CardGoalBody } from '@/components/CardGoal/CardGoalBody'
import { GoalContext } from '@/contexts/ProviderGoalList'
import { Check, CheckCircle, X } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DateTimeGoalProps } from '@/config/getData'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'
import { useContext } from 'react'
import { mutate } from 'swr'

export interface GoalsProfileProps {
  dateTime: DateTimeGoalProps
  completedGoal: boolean
  failedGoal: boolean
  userId: string
  cardId: string
  goal: string
}

export interface BodyProfileProps {
  cardGoal: GoalsProfileProps[]
}

export function BodyProfile() {
  const { orderListFiltered } = useContext(GoalContext)
  const { userId } = useOnAuthenticated()

  const setValueTrueForCompletedGoal = (cardId: string) => {
    const cardRef = doc(db, 'cardGoal', cardId)

    updateDoc(cardRef, {
      completedGoal: true,
    })
  }

  function handleUpdateCardGoal(cardId: string) {
    setValueTrueForCompletedGoal(cardId)

    mutate(`profile-${userId}`)
  }

  return (
    <div className="flex flex-wrap">
      {orderListFiltered &&
        orderListFiltered.map((card) => {
          return (
            <div className="relative p-4" key={card.cardId}>
              <CardGoalRoot>
                <CardGoalBody dateTime={card.dateTime} goal={card.goal} />
              </CardGoalRoot>

              {!card.completedGoal && !card.failedGoal && (
                <Checkbox.Root
                  onClick={() => handleUpdateCardGoal(card.cardId)}
                  className="shadow-blackA7 hover:bg-violet3 absolute right-5 top-14 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white"
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )}

              {card.failedGoal && (
                <X
                  size={28}
                  color={'red'}
                  className="absolute right-5 top-12"
                />
              )}

              {card.completedGoal && (
                <CheckCircle
                  size={32}
                  color="white"
                  className="absolute right-5 top-11"
                />
              )}
            </div>
          )
        })}
    </div>
  )
}
