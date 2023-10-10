import { GoalContext } from '@/contexts/ProviderGoalList'
import { Button } from '@/components/Form/Button'
import {
  HourglassMedium,
  ClipboardText,
  HourglassLow,
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
    <div className="flex flex-col justify-between gap-4 rounded-lg bg-zinc-200 p-4 text-zinc-600 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-slate-950 dark:text-white">
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <p>Todas as Missões</p>
        <Button
          className={`w-20 ${
            selectedViewMode === 'allGoals' ? 'bg-slate-800' : 'bg-slate-500'
          }`}
          onClick={() => handleCollectViewMode('allGoals')}
        >
          <ClipboardText size={28} weight="light" />
          {stateCountGoals.allGoals}
        </Button>
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-4">
        <p>A concluir</p>
        <Button
          className={`w-20 ${
            selectedViewMode === 'notCompletedGoals'
              ? 'bg-slate-800'
              : 'bg-slate-500'
          }`}
          onClick={() => handleCollectViewMode('notCompletedGoals')}
        >
          <HourglassMedium size={28} weight="fill" />
          {stateCountGoals.notCompletedGoals}
        </Button>
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-4">
        <p>Fracassada</p>
        <Button
          className={`w-20 ${
            selectedViewMode === 'failedGoals' ? 'bg-slate-800' : 'bg-slate-500'
          }`}
          onClick={() => handleCollectViewMode('failedGoals')}
        >
          <HourglassLow size={28} weight="fill" />
          {stateCountGoals.failedGoals}
        </Button>
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-4">
        <p>Concluídas</p>
        <Button
          className={`w-20 ${
            selectedViewMode === 'completedGoals'
              ? 'bg-slate-800'
              : 'bg-slate-500'
          }`}
          onClick={() => handleCollectViewMode('completedGoals')}
        >
          <ListChecks size={28} weight="light" />
          {stateCountGoals.completedGoals}
        </Button>
      </label>
    </div>
  )
}
