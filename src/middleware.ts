import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('@authTokenGoalList-1.0')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/emptyHomePage', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/createCardGoal/:path*',
    '/personalData/:path*',
  ],
}
