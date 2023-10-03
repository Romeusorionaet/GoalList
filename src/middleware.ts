import { checkIsPublicRoute } from './config/check-is-public-route'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('@authTokenGoalList-1.0')?.value
  const pathname = new URL(req.url).pathname
  const isPublicPage = checkIsPublicRoute(pathname)

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/emptyHomePage', req.url))
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!app|_next/static|_next).*)',
}
