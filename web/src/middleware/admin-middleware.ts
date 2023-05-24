import { DecodedToken } from '@/lib/auth'
import { Role } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'
import decode from 'jwt-decode'

export const adminMiddleware = (request: NextRequest, token?: string) => {
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url), {
      headers: {
        'Set-Cookie': ` Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  const decodedToken: DecodedToken = decode(token as string)

  if (decodedToken.data.role === Role.Admin) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL('/', request.url), {
      headers: {
        'Set-Cookie': ` Path=/; HttpOnly; max-age=20;`,
      },
    })
  }
}
