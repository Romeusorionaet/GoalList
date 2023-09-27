import { useWidthScreen } from '@/hooks/useWidthScreen'
import { List, X } from 'phosphor-react'
import Link from 'next/link'

export function NavPageAuthenticated() {
  const { checkMenuOpen, setCheckMenuOpen, widthScreen, handleChangeValue } =
    useWidthScreen()

  function setValueFalseForStateCheckMenuOpen() {
    setCheckMenuOpen(false)
  }

  return (
    <div>
      <div className={widthScreen && widthScreen >= 800 ? 'hidden' : ''}>
        <button onClick={handleChangeValue}>
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
          className={`${
            widthScreen && widthScreen <= 800 && checkMenuOpen === true
              ? 'absolute left-0 top-16 z-20 flex w-full flex-col items-end gap-8 rounded-md bg-white p-8 font-bold'
              : 'flex w-[40rem] gap-16 text-3xl font-semibold'
          } `}
        >
          <li>
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/"
            >
              Início
            </Link>
          </li>

          <li>
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/personalData"
            >
              Dados pessoais
            </Link>
          </li>
          <li>
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/createCardGoal"
            >
              Adicionar objetivo
            </Link>
          </li>
          <li>
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/profile"
            >
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
