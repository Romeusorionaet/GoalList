'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'phosphor-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-8">
      <button
        className="text-zinc-950 dark:text-zinc-500"
        onClick={() => setTheme('light')}
      >
        <Sun className="hover:animate-bounce" size={32} />
      </button>
      <button
        className="text-zinc-400 dark:text-zinc-100"
        onClick={() => setTheme('dark')}
      >
        <Moon className="hover:animate-bounce" size={32} />
      </button>
    </div>
  )
}
