import { DecodedToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import decode from 'jwt-decode'
import { Role } from '@/utils/types'

export const rootMiddleware = (request: NextRequest, token?: string) => {
  if (!token) {
    return NextResponse.next()
  }

  const decodedToken: DecodedToken = decode(token as string)

  if (decodedToken.data.role === Role.Admin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  if (decodedToken.data.role === Role.Client) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  return NextResponse.next()
}
