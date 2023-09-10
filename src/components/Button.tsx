import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      className={`w-full rounded-xl border-none bg-rose-400 p-4 text-white outline-none duration-700 hover:bg-rose-500 focus:outline-rose-500`}
      {...props}
    >
      {props.title}
    </button>
  )
}
