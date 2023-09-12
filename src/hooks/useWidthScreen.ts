import { useEffect, useState } from 'react'

export function useWidthScreen() {
  const [widthScreen, setWidthScreen] = useState<number>()
  const [checkMenuOpen, setCheckMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    setWidthScreen(window.innerWidth) // for an initial value

    window.onresize = () => {
      setWidthScreen(window.innerWidth)

      if (widthScreen) {
        if (widthScreen >= 800) {
          setCheckMenuOpen(true)
        } else {
          setCheckMenuOpen(false)
        }
      }
    }
  }, [widthScreen])

  const handleChangeValue = () => {
    checkMenuOpen ? setCheckMenuOpen(false) : setCheckMenuOpen(true)
  }

  return { handleChangeValue, widthScreen, checkMenuOpen, setCheckMenuOpen }
}
