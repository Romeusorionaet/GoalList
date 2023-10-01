import Image from 'next/image'

interface HeaderGoalProps {
  displayName: string
  photoURL: string
}

export function HeaderGoal({ displayName, photoURL }: HeaderGoalProps) {
  return (
    <>
      <h2 className="mb-2 font-bold">{displayName}</h2>
      {photoURL && (
        <div
          className={`relative -mb-9 flex h-10 w-10 items-center justify-center rounded-full`}
        >
          <Image
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
            width={500}
            height={500}
          />
        </div>
      )}
    </>
  )
}
