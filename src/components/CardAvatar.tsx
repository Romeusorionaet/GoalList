import Image from 'next/image'
import f1 from '../assets/figura1.png'

export function CardAvatar() {
  return (
    <div className="relative flex flex-col min-h-[32rem] w-full p-2">
      <div className="w-full h-[16rem]">capa</div>

      <span className="text-right text-2xl p-4">bolda nome da bolda</span>

      <div className="absolute top-[10rem] left-2 h-40 w-40 rounded-full border border-slate-400 overflow-hidden">
        <Image className="bg-cover" width={200} height={200} src={f1} alt="" />
      </div>

      <div className="mt-4 space-y-6">
        <h2>Nome dos das duas pessoas</h2>

        <p className="text-2xl">
          Descrição de relacionamento, uma breve descrição sobre o
          relacionamento. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Ea ipsa accusamus ut, aliquid aut ratione, deleniti excepturi
          provident cum voluptatibus blanditiis voluptatum tempora aperiam
          officia cupiditate dolorem explicabo. Blanditiis, soluta.
        </p>
      </div>
    </div>
  )
}
