import { NextRequest, NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const { pathname } = req.nextUrl

  const protectedRoutes = ['/home', '/settings']
  const publicRoutes = ['/']

  if (protectedRoutes.includes(pathname) && !token) return NextResponse.redirect(new URL('/', req.url))

  if (publicRoutes.includes(pathname) && token) return NextResponse.redirect(new URL('/home', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
