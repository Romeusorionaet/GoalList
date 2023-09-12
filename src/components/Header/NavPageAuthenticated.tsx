import { useWidthScreen } from '@/hooks/useWidthScreen'
import Link from 'next/link'
import { List, X } from 'phosphor-react'

export function NavPageAuthenticated() {
  const { checkMenuOpen, setCheckMenuOpen, widthScreen, handleChangeValue } =
    useWidthScreen()

  return (
    <div>
      <div className={widthScreen && widthScreen >= 800 ? 'hidden' : ''}>
        <button onClick={handleChangeValue} className="text-rose-400">
          {checkMenuOpen ? (
            <X size={34} weight="bold" />
          ) : (
            <List size={34} weight="bold" />
          )}
        </button>
      </div>
      <nav
        className={`
          ${
            (widthScreen && widthScreen >= 800) || checkMenuOpen ? '' : 'hidden'
          } `}
      >
        <ul
          className={` ${
            widthScreen && widthScreen <= 800 && checkMenuOpen === true
              ? 'absolute left-0 top-16 z-20 flex w-full flex-col items-end gap-8 rounded-md bg-rose-100 p-8 font-bold'
              : 'flex w-[40rem] gap-16 text-3xl font-semibold'
          } `}
        >
          <li>
            <Link onClick={() => setCheckMenuOpen(false)} href="/">
              Início
            </Link>
          </li>

          <li>
            <Link onClick={() => setCheckMenuOpen(false)} href="/profile">
              Perfil
            </Link>
          </li>
          <li>
            <Link onClick={() => setCheckMenuOpen(false)} href="/card">
              Criar Match
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
