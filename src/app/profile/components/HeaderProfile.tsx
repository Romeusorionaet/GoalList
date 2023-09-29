import { User } from 'phosphor-react'

interface HeaderProfileProps {
  photoURL: string | null
  displayName: string | null
}

export function HeaderProfile({ photoURL, displayName }: HeaderProfileProps) {
  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      {photoURL === null ? (
        <div
          className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full border border-zinc-400`}
        >
          <User className="h-20 w-20" />
        </div>
      ) : (
        <div
          className={`rounded-ful relative flex h-[10rem] w-[10rem] items-center justify-center`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}

      <div className="flex flex-col items-center">
        <h1>Viajante</h1>
        <p>{displayName === 'null' ? 'Nick name' : displayName}</p>
      </div>
    </div>
  )
}
