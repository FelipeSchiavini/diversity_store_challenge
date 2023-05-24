'use client'

import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'

export const LoginFormComponent = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const handleWithLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const login = formData.get('login')
    const password = formData.get('password')

    const response = await api.post<{ token: string }>('/user/login', {
      data: {
        login,
        password,
      },
    })

    formRef?.current?.reset()

    router.push(`api/auth?token=${response.data.token}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 ">
      <form
        onSubmit={handleWithLogin}
        className="flex flex-1 flex-col gap-2"
        ref={formRef}
      >
        <div className="items-center gap-4 space-y-3">
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

          <button
            type="submit"
            className="inline-block w-full self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
