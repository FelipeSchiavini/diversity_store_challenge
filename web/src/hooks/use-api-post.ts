import { useState } from 'react'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { api } from '@/lib/api'
import { handleWithErrorName } from '@/utils/error.message'

type UseApiPostParams = {
  onError: (message: string) => void
  onSuccess?: () => void
}

type UseApiPostResult<TData, TResponse> = [
  (path: string, data: TData) => Promise<TResponse | undefined>,
  boolean,
]

export const useApiPost = <TData, TResponse>(
  input: UseApiPostParams,
): UseApiPostResult<TData, TResponse> => {
  const [isLoading, setIsLoading] = useState(false)

  const postRequest = async (path: string, data: TData) => {
    try {
      setIsLoading(true)
      const token = Cookies.get('token')

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const response = await api.post<TResponse>(path, data, { headers })

      input?.onSuccess?.()
      return response?.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.trace('ERROR: postRequest ~ error:', error)
        const message = handleWithErrorName(error?.response?.data?.name)
        input?.onError?.(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return [postRequest, isLoading]
}
