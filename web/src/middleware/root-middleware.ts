import { DecodedToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { Role } from '@/utils/types'

export const rootMiddleware = (request: NextRequest, token?: DecodedToken) => {
  if (token?.data?.role === Role.Admin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  if (token?.data?.role === Role.Client) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  return NextResponse.next()
}
