import { DecodedToken } from '@/lib/auth'
import { Role } from '@/utils/types'
import { NextRequest, NextResponse } from 'next/server'
import { logoffAndRedirect } from '@/lib/util'

export const adminMiddleware = (request: NextRequest, token?: DecodedToken) => {
  if (token?.data?.role === Role.Admin) {
    return NextResponse.next()
  }
  return logoffAndRedirect(request)
}
