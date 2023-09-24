import { BodyProfileProps } from './BodyProfile'

export function GraphicGoals({ cardGoal }: BodyProfileProps) {
  const filteredGoals = cardGoal.filter((card) => card.failedGoal)
  const filteredGoalsCompleted = cardGoal.filter((card) => card.completedGoal)

  const lengthGoalsFaild = filteredGoals.length
  const GoalsCompleted = filteredGoalsCompleted.length
  const allGoals = cardGoal.length

  return (
    <div className="flex w-full flex-col rounded-lg bg-zinc-200 p-2 text-zinc-600 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <span>Todas as Missões: {allGoals}</span>
      <span>Fracassadas: {lengthGoalsFaild}</span>
      <span>Concluídas: {GoalsCompleted}</span>
    </div>
  )
}
