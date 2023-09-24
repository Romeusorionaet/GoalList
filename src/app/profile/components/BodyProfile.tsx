import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { CardGoalRoot } from '@/components/CardGoal/CardGoalRoot'
import { CardGoalBody } from '@/components/CardGoal/CardGoalBody'
import * as Checkbox from '@radix-ui/react-checkbox'
import { DateTimeGoalProps } from '@/config/getData'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'
import { Check } from 'phosphor-react'
import { mutate } from 'swr'

export interface BodyProfileProps {
  cardGoal: {
    dateTime: DateTimeGoalProps
    completedGoal: boolean
    failedGoal: boolean
    userId: string
    cardId: string
    goal: string
  }[]
}

export function BodyProfile({ cardGoal }: BodyProfileProps) {
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

  const filteredCards = cardGoal.filter(
    (card) => !card.completedGoal && !card.failedGoal,
  )

  return (
    <div className="flex flex-wrap">
      {filteredCards.map((card) => {
        return (
          <div className="relative p-4" key={card.cardId}>
            <CardGoalRoot>
              <CardGoalBody dateTime={card.dateTime} goal={card.goal} />
            </CardGoalRoot>

            {card.completedGoal ? (
              <></>
            ) : (
              <Checkbox.Root
                onClick={() => handleUpdateCardGoal(card.cardId)}
                className="shadow-blackA7 hover:bg-violet3 absolute right-5 top-14 flex h-5 w-5 appearance-none items-center justify-center rounded-md bg-white"
              >
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox.Root>
            )}
          </div>
        )
      })}
    </div>
  )
}
