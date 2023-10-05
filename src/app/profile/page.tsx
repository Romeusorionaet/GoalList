'use client'

import { GoalContext, GoalProviderContext } from '@/contexts/ProviderGoalList'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { HeaderProfile } from './components/HeaderProfile'
import { GraphicGoals } from './components/GraphicGoals'
import { BodyProfile } from './components/BodyProfile'
import { useContext } from 'react'

export default function Profile() {
  const { userData } = useOnAuthenticated()
  const { error } = useContext(GoalContext)

  if (error) {
    console.error('Problema de cache')
  }

  return (
    <GoalProviderContext>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full max-w-[1280px] items-center justify-evenly space-y-4 rounded-md bg-white dark:bg-slate-800 dark:text-white max-md:flex-col">
          <HeaderProfile
            photoURL={userData?.photoURL}
            displayName={userData?.displayName}
          />

          <GraphicGoals />
        </div>

        <BodyProfile />
      </div>
    </GoalProviderContext>
  )
}
