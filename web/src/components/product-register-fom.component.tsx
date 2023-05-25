'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'

import { Spinner } from './spinner.component'
import { useApiPost } from '@/hooks/use-api-post'
import useToast from '@/hooks/use-toast'
import {
  hasMoreThanThreeCharacters,
  validateFloatNumber,
  validateImageURL,
} from '@/utils/validation'

interface Product {
  id: string
  name: string
  price: number
  productUrl: string
  description: string
}

type ProductCreateRequest = Omit<Product, 'id'>

export const ProductFormComponent = () => {
  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { successToast, errorToast, Toast } = useToast()

  const [postRequest] = useApiPost<ProductCreateRequest, Product>({
    onError: errorToast,
    onSuccess: () => successToast('Product added to your stock'),
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const productUrl = formData.get('productUrl') as string
    const description = formData.get('description') as string
    const input = mapToProductCreation(
      {
        name,
        price,
        productUrl,
        description,
      },
      errorToast,
    )

    if (!input) {
      setIsSubmitting(false)
      return
    }
    await postRequest('/product/create', input)

    setIsSubmitting(false)

    formRef?.current?.reset()
    router.refresh()
  }

  return (
    <>
      <Toast />

      <form
        onSubmit={onSubmit}
        className="w-full flex-1 flex-col space-y-5"
        ref={formRef}
      >
        <div className="w-full flex-col space-y-1">
          <label
            htmlFor="name"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <div className=" w-full flex-col ">
          <label
            htmlFor="price"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <div className=" w-full flex-col ">
          <label
            htmlFor="productUrl"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Product URL
          </label>
          <input
            type="text"
            name="productUrl"
            id="productUrl"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <div className=" w-full flex-col ">
          <label
            htmlFor="description"
            className="flex w-full items-center text-sm text-gray-200 hover:text-gray-100"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full rounded border-gray-400 bg-gray-700 p-1 pl-3 text-purple-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block w-full self-end rounded bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          {isSubmitting ? <Spinner /> : <span>Register new Product</span>}
        </button>
      </form>
    </>
  )
}

interface MapToProductCreationInput extends Omit<Product, 'id' | 'price'> {
  price: string
}

const mapToProductCreation = (
  input: MapToProductCreationInput,
  onError: (message: string) => void,
): ProductCreateRequest | null => {
  if (!validateImageURL(input?.productUrl)) {
    onError('Fix image url before continue')
    return null
  }

  if (!hasMoreThanThreeCharacters(input?.name)) {
    onError('Fix image url before continue')
    return null
  }

  if (!hasMoreThanThreeCharacters(input?.description)) {
    onError('Fix image url before continue')
    return null
  }

  if (!validateFloatNumber(input?.price)) {
    onError('Fix image url before continue')
    return null
  }

  const price = Number(parseFloat(input.price.replace(',', '.')).toFixed(2))

  return {
    name: input.name,
    price,
    productUrl: input.productUrl,
    description: input.description,
  }
}
