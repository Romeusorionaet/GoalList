'use client'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { useOnAuthenticated } from './useOnAuthStateChanged'

export function useCookies() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { userDate } = useOnAuthenticated()

  useEffect(() => {
    const cookies = parseCookies()
    const token = !!cookies['@authTokenGoalList-1.0']
    setIsAuthenticated(token)
  }, [isAuthenticated, userDate])

  function setSecureCookie(idToken: string) {
    setCookie(null, '@authTokenGoalList-1.0', idToken, {
      maxAge: 60 * 6 * 24,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  function removeCookie() {
    return destroyCookie(null, '@authTokenGoalList-1.0')
  }

  return { setSecureCookie, removeCookie, isAuthenticated }
}
