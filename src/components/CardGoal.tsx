import { Timestamp } from 'firebase/firestore'
import { format } from 'date-fns'

export interface CardGoalProps {
  finalDate: Timestamp
  startDate: Timestamp
  displayName?: string
  photoURL: string
  userId?: string
  cardId?: string
  goal: string
}

export function CardGoal({
  goal,
  finalDate,
  startDate,
  displayName,
  photoURL,
}: CardGoalProps) {
  const formattedFinalDate = finalDate.toDate()
  const formattedStartDate = startDate.toDate()

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-blue-400 p-2">
      <h2>{displayName}</h2>
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white`}
      >
        <img
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          src={photoURL}
          alt="User Profile"
        />
      </div>
      <p>{goal}</p>
      <p>Start Date: {format(formattedStartDate, 'dd/MM/yyyy HH:mm:ss')}</p>
      <p>Final Date: {format(formattedFinalDate, 'dd/MM/yyyy HH:mm:ss')}</p>
    </div>
  )
}
