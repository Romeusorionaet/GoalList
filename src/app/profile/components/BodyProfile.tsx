import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { CardGoalRoot } from '@/components/CardGoal/CardGoalRoot'
import { CardGoalBody } from '@/components/CardGoal/CardGoalBody'
import { GoalContext } from '@/contexts/ProviderGoalList'
import { doc, runTransaction } from 'firebase/firestore'
import { Check, CheckCircle, X } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DateTimeGoalProps } from '@/config/getData'
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
  const { userDate } = useOnAuthenticated()

  const setValueTrueForCompletedGoal = async (cardId: string) => {
    const cardRef = doc(db, 'cardGoal', cardId)

    try {
      await runTransaction(db, async (transaction) => {
        const cardDoc = await transaction.get(cardRef)

        if (!cardDoc.exists()) {
          throw new Error('Card does not exist')
        }

        const cardData = cardDoc.data()

        if (!cardData || cardData.failedGoal) {
          return
        }

        transaction.update(cardRef, { completedGoal: true })
      })
    } catch (error) {
      console.log('Erro ao concluir o objetivo:', error)
    }
  }

  function handleUpdateCardGoal(cardId: string) {
    setValueTrueForCompletedGoal(cardId)

    mutate(`profile-${userDate?.uid}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
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
                  className="shadow-blackA7 hover:bg-violet3 absolute left-[47.5%] right-[52.5%] top-10 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white"
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
                  className="absolute left-[47.5%] right-[52.5%] top-9"
                />
              )}

              {card.completedGoal && (
                <CheckCircle
                  size={28}
                  color="white"
                  className="absolute left-[47.5%] right-[52.5%] top-9"
                />
              )}
            </div>
          )
        })}
    </div>
  )
}
