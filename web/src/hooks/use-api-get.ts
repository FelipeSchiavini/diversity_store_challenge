import { useState } from 'react'
import Cookies from 'js-cookie'
import { AxiosError, AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { handleWithErrorName } from '@/utils/error.message'

export const useGet = <S>(input: { onError?: (message: string) => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<S>()

  const getRequest = async (path: string): Promise<S | undefined> => {
    try {
      setIsLoading(true)
      const token = Cookies.get('token')

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const response = await api.get<never, AxiosResponse<S>>(path, {
        headers,
      })

      setIsLoading(false)
      setData(response?.data)
      return response?.data
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        console.log('ERROR: use-api-post.ts:37 ~ postRequest ~ error:', error)
        const message = handleWithErrorName(error?.response?.data?.name)
        input?.onError?.(message)
      }
    }
  }

  return { data, getRequest, isLoading }
}

export default useGet
