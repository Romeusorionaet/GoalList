import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: ['p-2 text-white rounded-lg', 'duration-700'],

  variants: {
    variant: {
      primary:
        'border-none bg-zinc-500 outline-none hover:bg-zinc-700 focus:outline-rose-500',
      // ghost:
      //   'rounded-md px-2 hover:bg-zinc-50 shadow-none text-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800',
      outline:
        'border border-rose-300 rounded-lg p-2 text-rose-400 hover:border-rose-500 hover:text-rose-500 duration-700',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ variant, className, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, className })} />
}
