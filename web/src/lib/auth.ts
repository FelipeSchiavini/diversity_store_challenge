import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  role: string
  sub: string
  login: string
}

export interface DecodedToken {
  data: User
  iat: number
  exp: number
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthorized')
  }

  const user: DecodedToken = decode(token)

  return user.data
}
