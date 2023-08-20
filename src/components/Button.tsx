interface ButtonProps {
  title: string
  style?: string
}

export function Button({ title, style }: ButtonProps) {
  return (
    <button
      className={`bg-red-400 p-4 rounded-xl text-2xl text-white hover:bg-red-500 duration-700 ${style}`}
    >
      {title}
    </button>
  )
}
