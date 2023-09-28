import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: ['p-2 text-white rounded-lg', 'duration-700'],

  variants: {
    variant: {
      primary:
        'border-none flex items-center justify-center bg-slate-500 outline-none hover:bg-slate-800 focus:outline-zinc-500',
      outline:
        'border text-zinc-900 border-slate-400 rounded-lg p-2 duration-700',
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
