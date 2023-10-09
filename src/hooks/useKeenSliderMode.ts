'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

export function useKeenSliderMode() {
  const [widthScreen, setWidthScreen] = useState<number>()

  useEffect(() => {
    setWidthScreen(window.innerWidth) // for an initial value

    window.onresize = () => {
      setWidthScreen(window.innerWidth)
    }
  }, [widthScreen])

  const [sliderRefMobile] = useKeenSlider<HTMLDivElement>({
    mode: 'snap',
    slides: {
      perView: 1.4,
      spacing: 10,
    },
  })

  const [sliderRefTablet] = useKeenSlider<HTMLDivElement>({
    mode: 'snap',
    slides: {
      perView: 2.5,
      spacing: 5,
    },
  })

  const [sliderRefDesktop] = useKeenSlider<HTMLDivElement>({
    mode: 'free-snap',
    slides: {
      perView: 3.2,
      spacing: 0,
    },
  })

  let sliderRef

  if (widthScreen && widthScreen <= 1000 && widthScreen >= 800) {
    sliderRef = sliderRefTablet
  } else if (widthScreen && widthScreen < 800) {
    sliderRef = sliderRefMobile
  } else {
    sliderRef = sliderRefDesktop
  }

  return { sliderRef }
}
