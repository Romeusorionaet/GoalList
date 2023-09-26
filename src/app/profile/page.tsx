'use client'

import { GoalContext, GoalProviderContext } from '@/contexts/ProviderGoalList'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { HeaderProfile } from './components/HeaderProfile'
import { GraphicGoals } from './components/GraphicGoals'
import { BodyProfile } from './components/BodyProfile'
import { useContext } from 'react'

export default function Profile() {
  const { displayName, photoURL } = useOnAuthenticated()
  const { error } = useContext(GoalContext)

  if (error) {
    console.log('Problema no cache', error)
  }

  return (
    <GoalProviderContext>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="mt-20 w-full space-y-4 bg-white">
          <HeaderProfile photoURL={photoURL} displayName={displayName} />

          {<GraphicGoals />}
        </div>

        <div>{<BodyProfile />}</div>
      </div>
    </GoalProviderContext>
  )
}
