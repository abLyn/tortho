import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    //console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)

    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      request.nextauth.token?.role !== 'Admin'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }

    if (
      request.nextUrl.pathname.startsWith('/client') &&
      request.nextauth.token?.role !== 'Admin' &&
      request.nextauth.token?.role !== 'Doctor'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/extra', '/client', '/dashboard'] }
