import { GoalContext } from '@/contexts/ProviderGoalList'
import { useContext } from 'react'

export function GraphicGoals() {
  const { getSelectedViewMode, stateCountGoals } = useContext(GoalContext)

  function handleCollectViewMode(viewModeList: string) {
    getSelectedViewMode(viewModeList)
  }

  return (
    <div className="flex w-full flex-col rounded-lg bg-zinc-200 p-2 text-zinc-600 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <button onClick={() => handleCollectViewMode('all')}>
        <p>Total de Missões: {stateCountGoals.all}</p>
      </button>

      <button onClick={() => handleCollectViewMode('notCompleted')}>
        <p>A concluir: {stateCountGoals.notCompleted}</p>
      </button>

      <button onClick={() => handleCollectViewMode('failed')}>
        <p>Fracassadas: {stateCountGoals.failed}</p>
      </button>

      <button onClick={() => handleCollectViewMode('completed')}>
        <p>Concluídas: {stateCountGoals.completed}</p>
      </button>
    </div>
  )
}
