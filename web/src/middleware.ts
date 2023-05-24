import { NextRequest, NextResponse } from 'next/server'
import { rootMiddleware } from './middleware/root-middleware'
import { adminMiddleware } from './middleware/admin-middleware'
import { productsMiddleware } from './middleware/products-middleware'

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value

  if (request.nextUrl.pathname === '/') {
    return rootMiddleware(request, token)
  }

  if (request.nextUrl.pathname.startsWith('/products')) {
    return productsMiddleware(request, token)
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    return adminMiddleware(request, token)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products', '/admin', '/'],
}
