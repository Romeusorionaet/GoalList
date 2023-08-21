'use client'

import Image from 'next/image'
import capa from '../assets/swordcapa.png'
import perfil from '../assets/swordperfil.png'
import { Heart } from 'phosphor-react'

export function CardAvatar() {
  return (
    <div className="relative flex flex-col min-h-[32rem] max-w-[60rem]">
      <div className="w-full h-[20rem]">
        <Image
          className="h-full w-full object-cover"
          width={200}
          height={200}
          src={capa}
          alt=""
        />
      </div>

      <span className="text-right text-2xl p-4">Bodas de Algodão</span>

      <div className="absolute top-[14.5rem] left-2 h-40 w-40 rounded-full border border-slate-400 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          width={200}
          height={200}
          src={perfil}
          alt=""
        />
      </div>

      <div className="mt-4 space-y-6">
        <div className="flex items-center justify-center gap-4">
          <h2>Kirito</h2>
          <Heart />
          <h2>Asuna</h2>
        </div>

        <p className="text-2xl text-center">
          Nosso relacionamento é uma mistura de coragem, companheirismo e amor
          verdadeiro, forjado através de desafios virtuais e aventuras
          emocionantes.
        </p>
      </div>
    </div>
  )
}
