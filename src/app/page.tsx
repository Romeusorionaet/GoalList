import { MainPosts } from '@/components/MainPosts'
import { getData } from '@/config/getData'

export default async function Home() {
  const goals = await getData()

  if (!goals) {
    console.log('Nem um viajante a vista.')
    return
  }

  return (
    <div className="flex flex-col space-y-20">
      <h1 className="mt-10 text-center text-xl dark:text-white">
        Linha do tempo da jornada de todo viajante
      </h1>
      <MainPosts goals={goals} />
    </div>
  )
}
