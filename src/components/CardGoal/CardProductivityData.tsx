import {
  ClipboardText,
  HourglassLow,
  HourglassMedium,
  ListChecks,
} from 'phosphor-react'

interface Props {
  objectProductivityData: {
    incompleteCountGoals: number
    countAllGoals: number
    countFailedGoals: number
    countCompletedGoals: number
  }
}

export function CardProductivityData({ objectProductivityData }: Props) {
  return (
    <div className="mb-2 mt-12 flex w-full justify-center px-2 dark:text-zinc-300">
      <div className="flex w-full max-sm:flex-col">
        <div
          tabIndex={0}
          className="flex items-center gap-1 rounded-md border border-transparent p-1 outline-none focus:border-white"
        >
          <span
            title={`Contagem de todos os objetivos: ${objectProductivityData.countAllGoals}`}
          >
            <ClipboardText size={28} weight="fill" />
          </span>
          <p>
            <strong>{objectProductivityData.countAllGoals}</strong>
          </p>
        </div>

        <div
          tabIndex={0}
          className="flex items-center gap-1 rounded-md border border-transparent p-1 outline-none focus:border-white"
        >
          <span
            title={`Contagem de objetivos incompleto ${objectProductivityData.incompleteCountGoals}`}
          >
            <HourglassMedium size={28} weight="fill" />
          </span>
          <p>
            <strong>{objectProductivityData.incompleteCountGoals}</strong>
          </p>
        </div>
      </div>

      <div className="flex w-full max-sm:flex-col">
        <div
          tabIndex={0}
          className="flex items-center gap-1 rounded-md border border-transparent p-1 outline-none focus:border-white"
        >
          <span
            title={`Contagem de objetivos fracassado ${objectProductivityData.countFailedGoals}`}
          >
            <HourglassLow size={28} weight="fill" />
          </span>
          <p>
            <strong>{objectProductivityData.countFailedGoals}</strong>
          </p>
        </div>

        <div
          tabIndex={0}
          className="flex items-center gap-1 rounded-md border border-transparent p-1 outline-none focus:border-white"
        >
          <span
            title={`Contagem de objetivos completo ${objectProductivityData.countCompletedGoals}`}
          >
            <ListChecks size={28} weight="fill" />
          </span>
          <p>
            <strong>{objectProductivityData.countCompletedGoals}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
