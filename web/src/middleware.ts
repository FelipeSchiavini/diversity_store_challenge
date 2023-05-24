import { NextRequest, NextResponse } from 'next/server'
import { DecodedToken } from './lib/auth'
import decode from 'jwt-decode'

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value
  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', request.url), {
      // httpOnly: turn cookie only accessible via the api
      headers: {
        'Set-Cookie': `Path=/; `,
      },
    })
  }

  const decodedToken: DecodedToken = decode(token)

  if (request.nextUrl.pathname === '/') {
    if (decodedToken.data.role === 'client') {
      return NextResponse.redirect(new URL('/products', request.url))
    } else {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    decodedToken.data.role === 'user'
  ) {
    return NextResponse.redirect(new URL('/', request.url), {
      // httpOnly: turn cookie only accessible via the api
      headers: {
        'Set-Cookie': `Path=/`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products', '/admin', '/'],
}
