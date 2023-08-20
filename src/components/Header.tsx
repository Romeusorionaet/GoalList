'use client'

import { useWidthScreen } from '@/hooks/useWidthScreen'
import { List, X } from 'phosphor-react'
import { Button } from './Button'
import Link from 'next/link'

export function Header() {
  const { checkMenuOpen, widthScreen, handleChangeValue } = useWidthScreen()

  return (
    <header className="flex justify-between items-center pb-8 relative text-red-400">
      {checkMenuOpen ? (
        <X
          size={34}
          weight="bold"
          onClick={handleChangeValue}
          className={`${
            widthScreen && widthScreen >= 800 ? 'hidden' : 'text-red-400'
          }`}
        />
      ) : (
        <List
          onClick={handleChangeValue}
          className={`${
            widthScreen && widthScreen >= 800 ? 'hidden' : 'text-red-400'
          }`}
          size={34}
          weight="bold"
        />
      )}

      <nav
        className={`
          ${
            (widthScreen && widthScreen >= 800) || checkMenuOpen ? '' : 'hidden'
          } `}
      >
        <ul
          className={`${
            checkMenuOpen
              ? 'absolute right-4 top-[8rem] flex flex-col gap-8 items-end text-2xl font-bold bg-rose-100 w-[16rem] p-8 rounded-md z-20'
              : 'flex gap-8 text-3xl font-semibold'
          } `}
        >
          <li>
            <Link href="#">Início</Link>
          </li>
          <li>
            <Link href="#">Sobre</Link>
          </li>
          <li>
            <Link href="#">Contato</Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-2 md:gap-4">
        <Button title="Entrar" />
        <Button title="Cadastrar" />
      </div>
    </header>
  )
}
