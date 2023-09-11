'use client'

import Image from 'next/image'
import f1 from '../../assets/figura1.png'
import Link from 'next/link'
import { CardAvatar } from './components/CardAvatar'

export default function EmptyHomePage() {
  return (
    <div>
      <div className="relative flex flex-col justify-center rounded-md bg-slate-50 py-8">
        {/* logo aq <Image
          className="absolute left-0 top-0"
          width={200}
          height={200}
          src={f2}
          alt=""
        /> */}

        <div className=" mt-[26rem] flex min-h-[32rem] w-full items-center justify-center bg-[url('../assets/previewPerfis.png')] bg-cover bg-center bg-no-repeat md:bg-contain">
          <div className="relative flex h-20 items-center justify-center rounded-full px-6 md:w-[50%]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-r from-transparent via-rose-200 to-transparent blur-sm backdrop-blur-none" />
            <h1 className="relative">lorem nmifjdis spusm d wef</h1>
          </div>
        </div>

        <div className="mt-20 space-y-8 p-4">
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
        className="mx-auto my-10"
        width={200}
        height={200}
        src={f1}
        alt=""
      />

      <div className="flex flex-col items-center gap-8 rounded-md bg-slate-50 py-8">
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
