import { MainPosts } from '@/components/MainPosts'
import { getData } from '@/config/getData'
import Head from 'next/head'

export default async function Home() {
  const goals = await getData()

  if (!goals) {
    console.log('Nem um viajante a vista.')
    return
  }

  return (
    <>
      <Head>
        <title>Home | GoalList</title>
        <meta
          name="description"
          content="This is a personal project. You can create Goals and manage them."
        />
      </Head>

      <div className="flex flex-col space-y-20 pt-24">
        <h1 className="text-center text-xl">
          Linha do tempo da jornada de todo viajante
        </h1>
        <MainPosts goals={goals} />
      </div>
    </>
  )
}
