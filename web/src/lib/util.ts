import { NextRequest, NextResponse } from 'next/server'

export const logoffAndRedirect = (request: NextRequest) => {
  NextResponse.redirect(new URL('/', request.url), {
    headers: {
      'Set-Cookie': `Path=/`,
    },
  })
}
