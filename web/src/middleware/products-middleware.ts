import { NextRequest, NextResponse } from 'next/server'

export const productsMiddleware = (request: NextRequest, token?: string) => {
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url), {
      headers: {
        'Set-Cookie': `Path=/`,
      },
    })
  }

  return NextResponse.next()
}
