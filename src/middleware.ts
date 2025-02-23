import { authMiddleware } from "@auth/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register')

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return null
  }

  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return null
})

// 認証チェックから除外するパス
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}