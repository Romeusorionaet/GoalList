import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'

export function useCookies() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true) // valor correto a ser passado é false

  useEffect(() => {
    const cookies = parseCookies()
    const token = !!cookies['@authTokenTwoHeart-1.0']
    setIsAuthenticated(token)
  }, [])

  function setSecureCookie(idToken: string) {
    setCookie(null, '@authTokenTwoHeart-1.0', idToken, {
      maxAge: 60 * 6 * 24,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  function removeCookie() {
    return destroyCookie(null, '@authTokenTwoHeart-1.0')
  }

  return { setSecureCookie, removeCookie, isAuthenticated }
}
