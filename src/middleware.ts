// import NextAuth from 'next-auth';
// import { auth } from './lib/auth';

// export default NextAuth(auth).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { auth } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  const isProfileSetup = request.nextUrl.pathname.startsWith('/profile/setup')

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && (request.nextUrl.pathname.startsWith('/dashboard') || isProfileSetup)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}