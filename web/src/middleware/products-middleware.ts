import { DecodedToken } from '@/lib/auth'
import { logoffAndRedirect } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export const productsMiddleware = (
  request: NextRequest,
  token?: DecodedToken,
) => {
  if (!token) {
    return logoffAndRedirect(request)
  }

  return NextResponse.next()
}
