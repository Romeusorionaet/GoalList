import { UsersProductivity } from '@/components/MainPost/UsersProductivity'
import { UsersPosts } from '@/components/MainPost/UsersPosts'
import { getData } from '@/config/getData'

export default async function Home() {
  const goals = await getData()

  if (!goals) {
    console.log('Nem um viajante a vista.')
    return
  }

  return (
    <div className="flex flex-col space-y-20">
      <h1 className="mt-10 text-center text-2xl dark:text-white">
        Seja bem vindo Viajante!
      </h1>
      <main className="space-y-8 p-4">
        <section className="space-y-4">
          <UsersPosts goals={goals} />
        </section>

        <section className="space-y-4">
          <UsersProductivity goals={goals} />
        </section>
      </main>
    </div>
  )
}
