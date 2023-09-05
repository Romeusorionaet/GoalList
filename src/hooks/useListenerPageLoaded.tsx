import { useEffect, useState } from 'react'

export function usePageReloadDetector() {
  const [hasPageReloaded, setHasPageReloaded] = useState(false)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (e && !hasPageReloaded) {
        localStorage.setItem('pageReloaded', 'true')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasPageReloaded])

  useEffect(() => {
    const pageReloaded = localStorage.getItem('pageReloaded')
    if (pageReloaded === 'true') {
      setHasPageReloaded(true)
    }
  }, [])

  return hasPageReloaded
}
