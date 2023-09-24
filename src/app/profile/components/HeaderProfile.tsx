import { User } from 'phosphor-react'

interface HeaderProfileProps {
  photoURL: string | null
  displayName: string | null
}

export function HeaderProfile({ photoURL, displayName }: HeaderProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {photoURL === null ? (
        <div
          className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full border border-zinc-400 bg-white`}
        >
          <User className="h-20 w-20" />
        </div>
      ) : (
        <div
          className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}
      <h1>Viajante: {displayName === 'null' ? 'Nick name' : displayName}</h1>
    </div>
  )
}
