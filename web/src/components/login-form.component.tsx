'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'
import { DecodedToken } from '@/lib/auth'
import decode from 'jwt-decode'
import { useAuth } from '@/hooks/use-auth'
import { Spinner } from './spinner.component'
import { useApiPost } from '@/hooks/use-api-post'
import useToast from '@/hooks/use-toast'
import { FormButton } from './form-button.component'
import { SignIn } from './sign-in.component'
import { FormInput } from './form.input.component'

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

  const onError = (message: string) => {
    setIsSubmitting(false)
    errorToast(message)
  }

  const [postRequest] = useApiPost<AuthDataRequest, AuthResponse>({
    onError,
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
    setIsSubmitting(false)
    if (!token) return
    setUser(decode<DecodedToken>(token).data)
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
          <FormInput label="Login" type="text" id="login" />
        </div>
        <div className=" w-full flex-col ">
          <FormInput label="Password" type="password" id="password" />
        </div>
        <FormButton text="Sign In" isLoading={isSubmitting} />
      </form>
    </>
  )
}
