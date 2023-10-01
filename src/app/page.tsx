import { MainPosts } from '@/components/MainPosts'
import { getData } from '@/config/getData'

export default async function Home() {
  const goals = await getData()

  if (!goals) {
    console.log('Nem um viajante a vista.')
    return
  }

  return (
    <div className="flex flex-col space-y-20 pt-24">
      <h1 className="text-center text-xl">
        Linha do tempo da jornada de todo viajante
      </h1>
      <MainPosts goals={goals} />
    </div>
  )
}
