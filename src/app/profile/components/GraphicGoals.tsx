import { GoalContext } from '@/contexts/ProviderGoalList'
import {
  ClipboardText,
  HourglassLow,
  HourglassMedium,
  ListChecks,
} from 'phosphor-react'
import { useContext } from 'react'

export function GraphicGoals() {
  const { selectedViewMode, getSelectedViewMode, stateCountGoals } =
    useContext(GoalContext)

  function handleCollectViewMode(viewModeList: string) {
    getSelectedViewMode(viewModeList)
  }

  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded-lg bg-zinc-200 p-2 text-zinc-600 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <label className="flex items-center justify-between gap-4">
        <p>Todas as Missões</p>
        <button
          data-mode="allGoals"
          className={`flex h-10 w-20 items-center justify-center rounded-md text-white ${
            selectedViewMode === 'allGoals' ? 'bg-red-500' : 'bg-green-500'
          }`}
          onClick={() => handleCollectViewMode('allGoals')}
        >
          <ClipboardText size={28} weight="light" />
          {stateCountGoals.allGoals}
        </button>
      </label>

      <label className="flex items-center justify-between gap-4">
        <p>A concluir</p>
        <button
          data-mode="notCompletedGoals"
          className={`flex h-10 w-20 items-center justify-center rounded-md text-white ${
            selectedViewMode === 'notCompletedGoals'
              ? 'bg-red-500'
              : 'bg-green-500'
          }`}
          onClick={() => handleCollectViewMode('notCompletedGoals')}
        >
          <HourglassMedium size={28} weight="fill" />
          {stateCountGoals.notCompletedGoals}
        </button>
      </label>

      <label className="flex items-center justify-between gap-4">
        <p>Fracassada</p>
        <button
          data-mode="failedGoals"
          className={`flex h-10 w-20 items-center justify-center rounded-md text-white ${
            selectedViewMode === 'failedGoals' ? 'bg-red-500' : 'bg-green-500'
          }`}
          onClick={() => handleCollectViewMode('failedGoals')}
        >
          <HourglassLow size={28} weight="fill" />
          {stateCountGoals.failedGoals}
        </button>
      </label>

      <label className="flex items-center justify-between gap-4">
        <p>Concluídas</p>
        <button
          data-mode="completedGoals"
          className={`flex h-10 w-20 items-center justify-center rounded-md text-white ${
            selectedViewMode === 'completedGoals'
              ? 'bg-red-500'
              : 'bg-green-500'
          }`}
          onClick={() => handleCollectViewMode('completedGoals')}
        >
          <ListChecks size={28} weight="light" />
          {stateCountGoals.completedGoals}
        </button>
      </label>
    </div>
  )
}
