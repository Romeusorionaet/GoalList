import { ComponentProps, forwardRef } from 'react'

type InputPrefixProps = ComponentProps<'div'>

export const InputPrefix = (props: InputPrefixProps) => {
  return <div {...props} />
}

type InputControlProps = ComponentProps<'input'>

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        className="flex w-full rounded-lg border border-zinc-200 px-4 py-2 outline-none focus:border-transparent focus:outline-zinc-500 dark:bg-white dark:text-zinc-900"
        {...props}
      />
    )
  },
)

InputControl.displayName = 'InputControl'

export type InputRootProps = ComponentProps<'div'>

export const InputRoot = (props: InputRootProps) => {
  return (
    <div
      className="w-12/12 mx-1 flex flex-1 items-center gap-2 rounded-lg shadow-sm"
      {...props}
    />
  )
}
