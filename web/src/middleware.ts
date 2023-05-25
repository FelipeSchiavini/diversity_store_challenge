import { NextRequest, NextResponse } from 'next/server'
import { rootMiddleware } from './middleware/root-middleware'
import { adminMiddleware } from './middleware/admin-middleware'
import { productsMiddleware } from './middleware/products-middleware'
import decode from 'jwt-decode'
import { DecodedToken } from './lib/auth'

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value
  const decodedToken = token ? decode<DecodedToken>(token) : undefined

  if (request.nextUrl.pathname === '/') {
    return rootMiddleware(request, decodedToken)
  }

  if (request.nextUrl.pathname.startsWith('/products')) {
    return productsMiddleware(request, decodedToken)
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    return adminMiddleware(request, decodedToken)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products', '/admin', '/'],
}
