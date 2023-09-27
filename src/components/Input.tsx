import { ComponentProps } from 'react'

type InputPrefixProps = ComponentProps<'div'>

export function InputPrefix(props: InputPrefixProps) {
  return <div {...props} />
}

type InputControlProps = ComponentProps<'input'>

export function InputControl(props: InputControlProps) {
  return (
    <input
      className="flex w-full rounded-lg border border-zinc-200 px-4 py-2 outline-none focus:border-transparent focus:outline-zinc-500"
      {...props}
    />
  )
}

export type InputRootProps = ComponentProps<'div'>

export function InputRoot(props: InputRootProps) {
  return (
    <div
      className="w-12/12 mx-1 flex flex-1 items-center gap-2 rounded-lg shadow-sm"
      {...props}
    />
  )
}
