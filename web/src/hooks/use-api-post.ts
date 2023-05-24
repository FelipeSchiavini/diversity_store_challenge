import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { handleWithErrorName } from '@/utils/error.message'

export const useApiPost = (input: {
  onError?: (message: string) => void
  onSuccess?: () => void
}): [<T, S>(path: string, data: T) => Promise<S | undefined>, boolean] => {
  const [isLoading, setIsLoading] = useState(false)

  const postRequest = async <T, S>(path: string, data: T) => {
    try {
      setIsLoading(true)
      const token = Cookies.get('token')

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const response = await api.post<never, AxiosResponse<S, T>, T>(
        path,
        data,
        {
          headers,
        },
      )

      input?.onSuccess?.()
      return response?.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERROR: use-api-post.ts:37 ~ postRequest ~ error:', error)
        const message = handleWithErrorName(error?.response?.data?.name)
        input?.onError?.(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return [postRequest, isLoading]
}
