import { destroyCookie, parseCookies, setCookie } from 'nookies'

export function useCookies() {
  const cookies = parseCookies()
  const isAuthenticated = cookies['@authTokenTwoHeart-1.0']

  function setSecureCookie(idToken: string) {
    setCookie(null, '@authTokenTwoHeart-1.0', idToken, {
      maxAge: 60 * 6 * 24,
      path: '/',
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  }

  function removeCookie() {
    return destroyCookie(null, '@authTokenTwoHeart-1.0')
  }

  return { setSecureCookie, removeCookie, isAuthenticated }
}
