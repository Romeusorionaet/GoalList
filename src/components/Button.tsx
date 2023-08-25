interface ButtonProps {
  title: string
  style?: string
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function Button({ title, style, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-red-400 p-4 rounded-xl text-white hover:bg-red-500 duration-700 focus:outline-none focus:outline-red-400 outline-1 focus:bg-red-500 ${style}`}
    >
      {title}
    </button>
  )
}
