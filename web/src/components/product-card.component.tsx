'use client'

import { useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import * as React from 'react'
import { useApiPost } from '@/hooks/use-api-post'
import useToast from '@/hooks/use-toast'
import { Spinner } from './spinner.component'
import { useAuth } from '@/hooks/use-auth'
import { Role } from '@/utils/types'
import Admin from '@/app/admin/page'

interface ProductCardProps {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
  role: Role
  refresh: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  quantity,
  description,
  name,
  role,
  id,
  productUrl,
  refresh,
}) => {
  const [quantityInCart, setQuantityInCart] = useState(0)
  const { successToast, errorToast, Toast } = useToast()

  const [post, loading] = useApiPost({
    onError: errorToast,
    onSuccess: () => successToast(texts.sucessMessage),
  })

  const texts = config[role]

  const handlePlusCircleClick = () => {
    if (quantity <= quantityInCart && role === Role.Client) {
      return
    }
    setQuantityInCart(quantityInCart + 1)
  }

  const handleMinusCircleClick = () => {
    if (quantityInCart === 0 && role === Role.Client) {
      return
    }
    if (
      quantityInCart < 0 &&
      -quantity === quantityInCart &&
      role === Role.Admin
    ) {
      return
    }

    setQuantityInCart(quantityInCart - 1)
  }

  const purchaseProduct = async () => {
    if (quantityInCart === 0) {
      errorToast(texts.errorMessage)
      return
    }

    await post(texts.path, {
      productId: id,
      quantity: quantityInCart,
    })
    await refresh()

    setQuantityInCart(0)
  }

  return (
    <div className="h-[370px] w-52 items-center justify-center rounded border border-solid border-gray-600 bg-gray-800 bg-[url(../assets/bg-stars.svg)] bg-cover p-3">
      <Toast />
      <div className="flex h-full  flex-col justify-between">
        <div className="space-y-3">
          <img src={productUrl} alt={name} className="h-32 w-full rounded " />
          <p className="center font-bold text-gray-50">{name}</p>
          <p className="inline rounded bg-gray-100 p-1 text-sm leading-none text-gray-800">
            {`Quant: ${quantity}`}
          </p>
        </div>

        <p className=" h-full pt-2 text-sm leading-4 text-gray-100">
          {description.substring(0, 80).concat('...')}
        </p>
        <div className="w-full">
          <div className="mb-3 flex w-full cursor-pointer justify-around">
            <PlusCircle onClick={handlePlusCircleClick} />
            {quantityInCart}
            <MinusCircle onClick={handleMinusCircleClick} />
          </div>

          <button
            onClick={purchaseProduct}
            className="inline-block w-full rounded bg-green-500 py-2 font-alt text-sm uppercase leading-none text-gray-900 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? <Spinner /> : <span>{texts.buttonText}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

const config = {
  admin: {
    buttonText: 'Add To Stock',
    path: '/product/add',
    errorMessage: 'Add the product before!',
    sucessMessage: 'Stock updated successfully! 👏',
  },
  client: {
    buttonText: 'Purchase',
    path: '/product/purchase',
    errorMessage: 'Add the product before!',
    sucessMessage: 'Product purchased successfully! 🥳',
  },
}
