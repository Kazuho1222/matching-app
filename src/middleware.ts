// import NextAuth from 'next-auth';
// import { auth } from './lib/auth';

// export default NextAuth(auth).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register')
  const isProfileSetup = req.nextUrl.pathname.startsWith('/profile/setup')

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return null
  }

  if (!isLoggedIn && (req.nextUrl.pathname.startsWith('/dashboard') || isProfileSetup)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}