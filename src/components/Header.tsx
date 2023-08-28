'use client'

import { useWidthScreen } from '@/hooks/useWidthScreen'
import { List, X } from 'phosphor-react'
import Link from 'next/link'
import FormSignIn from './FormAuth/FormSigIn'
import FormSignUp from './FormAuth/FormSignUp'
import { Button } from './Button'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useCookies } from '@/hooks/useCookies'

export function Header() {
  const { checkMenuOpen, widthScreen, handleChangeValue } = useWidthScreen()
  const { LogOutUser } = useContext(AuthContext)
  const { isAuthenticated } = useCookies()

  function handleLogOut() {
    LogOutUser()
  }

  return (
    <header className="flex justify-between items-center pb-8 relative text-red-400">
      {isAuthenticated && (
        <>
          <div className={widthScreen && widthScreen >= 800 ? 'hidden' : ''}>
            {checkMenuOpen ? (
              <X
                size={34}
                weight="bold"
                onClick={handleChangeValue}
                className="text-red-400"
              />
            ) : (
              <List
                size={34}
                weight="bold"
                onClick={handleChangeValue}
                className="text-red-400"
              />
            )}
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
                  ? 'absolute right-4 top-[7rem] flex flex-col gap-8 items-end font-bold bg-rose-100 w-[15rem] p-8 rounded-md z-20'
                  : 'flex gap-16 text-3xl font-semibold w-[40rem]'
              } `}
            >
              <li>
                <Link href="/">Início</Link>
              </li>
              {/* <li>
            <Link href="#">Sobre</Link>
          </li>
          <li>
            <Link href="#">Contato</Link>
          </li> */}
              <li>
                <Link href="/perfil">Perfil</Link>
              </li>
              <li>
                <Link href="/card">Criar Match</Link>
              </li>
            </ul>
          </nav>{' '}
        </>
      )}

      <div className="flex w-full justify-end gap-2 md:gap-4">
        {isAuthenticated ? (
          <Button onClick={handleLogOut} title="Sair" type="button" />
        ) : (
          <>
            <FormSignIn />
            <FormSignUp />
          </>
        )}
      </div>
    </header>
  )
}
