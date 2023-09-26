interface HeaderGoalProps {
  displayName: string
  photoURL: string
}

export function HeaderGoal({ displayName, photoURL }: HeaderGoalProps) {
  return (
    <>
      <h2 className="font-bold">{displayName}</h2>
      {photoURL && (
        <div
          className={`relative -mb-8 flex h-10 w-10 items-center justify-center rounded-full`}
        >
          <img
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            src={photoURL}
            alt="User Profile"
          />
        </div>
      )}
    </>
  )
}
