import Image from 'next/image'
import f2 from '../assets/figura2.png'
import f1 from '../assets/figura1.png'
import { CardAvatar } from '@/components/CardAvatar'

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center relative bg-slate-50 rounded-md">
        {/* <Image
          className="absolute left-0 top-0"
          width={200}
          height={200}
          src={f2}
          alt=""
        /> */}

        <div className="border-y border-red-400 flex justify-center items-center min-h-[32rem] w-full mt-[26rem] bg-[url('../assets/background.svg')] bg-center bg-cover md:bg-contain">
          <div className="relative w-[90%] h-20 flex items-center justify-center">
            <div className="absolute inset-0 blur-sm backdrop-blur-md bg-rose-100" />
            <h1 className="relative text-rose-400">Lorem ipsum Lore</h1>
          </div>
        </div>

        <div className="mt-20 p-4 space-y-8">
          <h1 className="text-center">
            Celebramos Bodas de casamento e de namoro
          </h1>

          <p className="">
            As bodas são celebrações que marcam diferentes anos de casamento, e
            cada uma delas é associada a um material ou pedra preciosa que
            simboliza o estágio do relacionamento e a durabilidade do amor
            compartilhado pelo casal.
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

      <div className="flex flex-col justify-center items-center bg-slate-50 rounded-md py-[10rem]">
        <CardAvatar />
      </div>
    </div>
  )
}
