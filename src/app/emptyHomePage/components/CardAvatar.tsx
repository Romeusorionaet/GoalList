'use client'

import Image from 'next/image'
import capa from '../../../assets/swordcapa.png'
import perfil from '../../../assets/swordperfil.png'
import { Heart } from 'phosphor-react'

export function CardAvatar() {
  return (
    <div className="relative flex min-h-[32rem] max-w-[60rem] flex-col">
      <div className="h-[20rem] w-full">
        <Image
          className="h-full w-full object-cover"
          width={200}
          height={200}
          src={capa}
          alt=""
        />
      </div>

      <span className="p-4 text-right">Bodas de Algodão</span>

      <div className="absolute left-2 top-[14.5rem] h-40 w-40 overflow-hidden rounded-full border border-slate-400">
        <Image
          className="h-full w-full object-cover"
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

        <p className="text-center">
          Nosso relacionamento é uma mistura de coragem, companheirismo e amor
          verdadeiro, forjado através de desafios virtuais e aventuras
          emocionantes.
        </p>
      </div>
    </div>
  )
}
