import { useState } from 'react'
import Cookies from 'js-cookie'
import { AxiosError } from 'axios'
import { api } from '@/lib/api'
import { handleWithErrorName } from '@/utils/error.message'

export const useGet = <T>(input: { onError?: (message: string) => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T>()

  const getRequest = async (path: string): Promise<T | undefined> => {
    try {
      setIsLoading(true)
      const token = Cookies.get('token')

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const response = await api.get<T>(path, {
        headers,
      })

      setIsLoading(false)
      const data = response?.data
      setData(data)
      return data
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        console.error('ERROR: use-api-post.ts:37 ~ postRequest ~ error:', error)
        const message = handleWithErrorName(error?.response?.data?.name)
        input?.onError?.(message)
      }
    }
  }

  return { data, getRequest, isLoading }
}
