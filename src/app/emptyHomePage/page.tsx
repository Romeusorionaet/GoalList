'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ArrowDown } from 'phosphor-react'

export default function EmptyHomePage() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      origin: 'auto',
      perView: 1,
      spacing: 0,
    },
    vertical: true,
  })

  return (
    <div className="fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex-col justify-center space-y-8 rounded-xl bg-zinc-200 p-4 py-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <div className="absolute bottom-4 right-4 animate-bounce">
        <ArrowDown />
      </div>

      <div className="keen-slider w-full" ref={ref} style={{ height: 200 }}>
        <div className="keen-slider__slide flex items-center justify-center">
          <p>Seja bem vindo viajante ao Todo Or Death</p>
        </div>

        <div className="keen-slider__slide flex items-center justify-center">
          <p>
            O Todo Or Death é uma forma de você compartilhar pontos de sua
            jornada. Vou explicar melhor...
          </p>
        </div>

        <div className="keen-slider__slide flex items-center justify-center">
          <p>
            Aqui não é um simples TodoList onde você faz anotação de sua missão
            e esquece que ele existe não se importando se a missão foi cumprida
            ou não. As coisas funcionam diferente por aqui...
          </p>
        </div>

        <div className="keen-slider__slide flex items-center justify-center">
          <p>
            Você não será obrigado a contar detalhes delicados e pessoais de sua
            missão, apenas registre aqui e descreva com poucas e sábias palavras
            que essa missão existe e que uma vez registrado aqui, você terá
            total comprometimento em cumprilas, assim você terá um
            comprometimento maior com seu objetivo...
          </p>
        </div>

        <div className="keen-slider__slide flex items-center justify-center gap-4">
          <p>Aceita o desafio? Crie sua conta.</p>
        </div>
      </div>
    </div>
  )
}
