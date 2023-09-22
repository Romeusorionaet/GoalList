import { DateTimeGoalProps } from '@/config/getData'

export interface CardGoalProps {
  dateTime: DateTimeGoalProps
  completedGoal?: boolean
  displayName?: string
  photoURL?: string
  userId?: string
  cardId?: string
  goal: string
}

export function CardGoal({
  goal,
  dateTime,
  displayName,
  photoURL,
}: CardGoalProps) {
  return (
    <div className="p-y-1 flex w-[20rem] flex-col items-center justify-center rounded-lg bg-blue-200">
      <h2 className="font-bold">{displayName}</h2>
      {photoURL && (
        <div
          className={`relative -mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}
      <div className="flex h-16 w-full flex-col gap-6 whitespace-nowrap rounded-md bg-zinc-500 p-1 text-sm text-white">
        <div className="flex justify-between gap-8">
          <span>{dateTime.formattedStartDate}</span>
          <span>{dateTime.formattedFinalDate}</span>
        </div>

        <div className="flex justify-center ">
          <span className="rounded-lg bg-zinc-950 p-1">
            {dateTime.formattedHour}
          </span>
        </div>
      </div>

      <div className="my-8 h-36 overflow-auto p-1">
        <p className="md:text-xl">{goal}</p>
      </div>
    </div>
  )
}
