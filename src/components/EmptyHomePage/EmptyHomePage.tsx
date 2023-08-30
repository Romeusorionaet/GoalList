'use client'

import Image from 'next/image'
import f1 from '../../assets/figura1.png'
import Link from 'next/link'
import { CardAvatar } from '@/components/CardAvatar'

export function EmptyHomePage() {
  return (
    <div>
      <div className="flex flex-col justify-center relative bg-slate-50 rounded-md py-8">
        {/* logo aq <Image
          className="absolute left-0 top-0"
          width={200}
          height={200}
          src={f2}
          alt=""
        /> */}

        <div className=" flex justify-center items-center min-h-[32rem] w-full mt-[26rem] bg-[url('../assets/previewPerfis.png')] bg-center bg-cover bg-no-repeat md:bg-contain">
          <div className="relative md:w-[50%] h-20 flex items-center justify-center px-6 rounded-full">
            <div className="absolute inset-0 blur-sm backdrop-blur-none bg-gradient-to-r from-transparent via-rose-200 to-transparent rounded-2xl overflow-hidden" />
            <h1 className="relative">lorem nmifjdis spusm d wef</h1>
          </div>
        </div>

        <div className="mt-20 p-4 space-y-8">
          <h1 className="text-center">
            Celebramos Bodas do seu relacionamento
          </h1>

          <p>
            As bodas são celebrações que marcam diferentes anos de casamento, e
            cada uma delas é associada a um material ou pedra preciosa que
            simboliza o estágio do relacionamento e a durabilidade do amor
            compartilhado pelo casal. <strong>Saber mais sobre bodas.</strong>
          </p>
        </div>
      </div>

      <Image
        className="my-10 mx-auto"
        width={200}
        height={200}
        src={f1}
        alt=""
      />

      <div className="flex flex-col items-center gap-8 bg-slate-50 rounded-md py-8">
        <h1 className="text-center">
          Como ficará seu perfil de relacionamento
        </h1>

        <div className="flex flex-col items-center justify-center gap-28 md:flex-row md:items-start">
          <div className="px-4">
            <p>
              Com poucos passos você consegue deixar registrado o seu perfil
              compartilhado com o seu parceiro(a). A criação é bastante simples
              e intuitivo. <strong>Guia para criar o perfil.</strong>
            </p>
          </div>
          <CardAvatar />
        </div>
      </div>
    </div>
  )
}
