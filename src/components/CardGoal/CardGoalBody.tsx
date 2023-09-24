import { DateTimeGoalProps } from '@/config/getData'

interface CardGoalBodyProps {
  goal: string
  dateTime: DateTimeGoalProps
}

export function CardGoalBody({ goal, dateTime }: CardGoalBodyProps) {
  return (
    <>
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
    </>
  )
}
