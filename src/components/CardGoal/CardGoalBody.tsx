import { DateTimeGoalProps } from '@/config/getData'
import '../../styles/scrollbar.css'

interface CardGoalBodyProps {
  goal: string
  dateTime: DateTimeGoalProps
}

export function CardGoalBody({ goal, dateTime }: CardGoalBodyProps) {
  return (
    <>
      <div className="flex h-16 w-full flex-col gap-6 whitespace-nowrap rounded-md bg-zinc-900/10 p-1 text-sm text-white">
        <div className="flex justify-between gap-8 p-1 font-bold shadow-lg">
          <span>{dateTime.formattedStartDate}</span>
          <span>{dateTime.formattedFinalDate}</span>
        </div>

        <div className="flex justify-center ">
          <span className="rounded-lg bg-cyan-900 p-1">
            {dateTime.formattedHour}
          </span>
        </div>
      </div>

      <div className="scrollbar my-8 h-36 overflow-auto p-1">
        <p>{goal}</p>
      </div>
    </>
  )
}
