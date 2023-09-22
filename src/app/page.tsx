import { MainPosts } from '@/components/MainPosts'
import { getData } from '@/config/getData'

export default async function Home() {
  const goals = await getData()

  if (!goals) {
    console.log('sem goals')
    return
  }

  return (
    <div className="flex flex-col space-y-20 ">
      <h1 className="text-xl">Linha do tempo da jornada de todo viajante</h1>
      <MainPosts goals={goals} />
    </div>
  )
}
