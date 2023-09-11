import { ComponentProps } from 'react'

type InputPrefixProps = ComponentProps<'div'>

export function InputPrefix(props: InputPrefixProps) {
  return <div {...props} />
}

type InputControlProps = ComponentProps<'input'>

export function InputControl(props: InputControlProps) {
  return (
    <input
      className="flex w-full rounded-lg border border-rose-200 p-0 px-4 py-2 text-rose-400 outline-none focus:border-transparent focus:outline-rose-500"
      {...props}
    />
  )
}

export type InputRootProps = ComponentProps<'div'>

export function InputRoot(props: InputRootProps) {
  return (
    <div
      className="flex w-full flex-1 items-center gap-2 rounded-lg shadow-sm"
      {...props}
    />
  )
}
