'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'
import { DecodedToken } from '@/lib/auth'
import decode from 'jwt-decode'
import { useAuth } from '@/hooks/use-auth'
import { Spinner } from './spinner.component'
import { useApiPost } from '@/hooks/use-api-post'
import useToast from '@/hooks/use-toast'

interface AuthResponse {
  token: string
}

interface AuthDataRequest {
  data: {
    login: string
    password: string
  }
}

export const LoginFormComponent = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser } = useAuth()
  const { errorToast, Toast } = useToast()

  const [postRequest, isLoading] = useApiPost<AuthDataRequest, AuthResponse>({
    onError: errorToast,
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const login = formData.get('login') as string

    const password = formData.get('password') as string

    const response = await postRequest('/user/login', {
      data: {
        login,
        password,
      },
    })

    formRef?.current?.reset()
    const token = response?.token as string
    setUser(decode<DecodedToken>(token).data)
    setIsSubmitting(false)
    router.push(`api/auth?token=${response?.token}`)
  }

  return (
    <>
      <Toast />
      <form
        onSubmit={onSubmit}
        className="flex-1 flex-col space-y-5"
        ref={formRef}
      >
        <div className="w-full flex-col space-y-1">
          <label
            htmlFor="login"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Login
          </label>
          <input
            type="text"
            name="login"
            id="login"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <div className=" w-full flex-col ">
          <label
            htmlFor="password"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block w-full self-end rounded bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          {isSubmitting ? <Spinner /> : <span>SignIn</span>}
        </button>
      </form>
    </>
  )
}
