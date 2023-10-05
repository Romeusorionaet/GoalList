import { List, X } from 'phosphor-react'
import { useState } from 'react'
import Link from 'next/link'

export function NavPageAuthenticated() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const handleValueMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }

  function setValueFalseForStateCheckMenuOpen() {
    setIsMenuOpen(true)
  }

  return (
    <div>
      <div className="md:hidden">
        <button onClick={handleValueMenu} className="dark:text-white">
          <X
            size={34}
            weight="bold"
            data-menu={isMenuOpen}
            className="data-[menu=true]:hidden"
          />
          <List
            size={34}
            weight="bold"
            data-menu={isMenuOpen}
            className="data-[menu=false]:hidden"
          />
        </button>
      </div>
      <nav data-menu={isMenuOpen} className="data-[menu=true]:max-md:hidden">
        <ul
          className={`left-0 top-16 z-20 flex w-full items-end gap-8 rounded-md bg-white text-3xl font-bold dark:bg-slate-800 max-md:absolute max-md:flex-col max-md:p-8 md:w-[40rem] md:gap-16 md:font-semibold`}
        >
          <li className="dark:text-white">
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/"
            >
              Início
            </Link>
          </li>

          <li className="dark:text-white">
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/profile"
            >
              Perfil
            </Link>
          </li>

          <li className="dark:text-white">
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/createCardGoal"
            >
              Adicionar objetivo
            </Link>
          </li>

          <li className="dark:text-white">
            <Link
              className="hover:font-bold"
              onClick={setValueFalseForStateCheckMenuOpen}
              href="/personalData"
            >
              Dados pessoais
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
