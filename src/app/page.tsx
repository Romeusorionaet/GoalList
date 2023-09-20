import { SectionPosts } from '@/components/SectionPosts'

export default function Home() {
  return (
    <div className="flex flex-col space-y-20 ">
      <h1 className="text-xl">Linha do tempo da jornada de todo viajante</h1>
      <SectionPosts />
    </div>
  )
}
