'use client'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { DecodedToken, User } from '@/lib/auth'
import decode from 'jwt-decode'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>({} as User)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      setUser(null)
      return
    }
    const decoded: DecodedToken = decode(token as string)
    setUser(decoded.data)
  }, [])

  return { user, setUser }
}
