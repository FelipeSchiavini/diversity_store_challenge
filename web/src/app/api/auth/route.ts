import { NextRequest, NextResponse } from 'next/server'
import jwt_decode from 'jwt-decode'

interface DecodedToken {
  data: {
    role: string
    sub: string
    login: string
  }
  iat: number
  exp: number
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) return NextResponse.redirect(new URL('/', request.url))
  const decodedToken: DecodedToken = jwt_decode(token)

  const path = decodedToken.data.role === 'admin' ? '/admin' : '/products'

  const redirectURL = new URL(path, request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${decodedToken.exp};`,
    },
  })
}
