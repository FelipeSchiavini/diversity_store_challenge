'use client'

import { useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'
import * as React from 'react'
import { useApiPost } from '@/hooks/use-api-post'
import useToast from '@/hooks/use-toast'
import { Spinner } from './spinner.component'
import { useAuth } from '@/hooks/use-auth'

interface ProductCardProps {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
  refresh: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  quantity,
  description,
  name,
  id,
  productUrl,
  refresh,
}) => {
  const [quantityInCart, setQuantityInCart] = useState(0)
  const { successToast, errorToast, Toast } = useToast()
  const user = useAuth()

  const [post, loading] = useApiPost({
    onError: errorToast,
    onSuccess: () => successToast(`Produto ${name} comprado com sucesso!`),
  })

  const handlePlusCircleClick = () => {
    if (quantity <= quantityInCart) {
      return
    }
    setQuantityInCart(quantityInCart + 1)
  }

  const handleMinusCircleClick = () => {
    if (quantityInCart === 0) {
      return
    }
    setQuantityInCart(quantityInCart - 1)
  }

  const purchaseProduct = async () => {
    if (quantityInCart === 0) {
      errorToast('Você precisa adicionar o item ao carrinho!')
      return
    }

    await post(`/product/purchase/`, {
      userId: user.sub,
      productId: id,
      quantity: quantityInCart,
    })
    await refresh()

    setQuantityInCart(0)
  }

  return (
    <div className="sm-max:w-full h-[370px] rounded border border-solid border-gray-600 bg-gray-800 p-3  sm:w-52">
      <Toast />
      <div className="flex h-full flex-col  justify-between">
        <div className="space-y-3">
          <img
            src={productUrl}
            alt="product image"
            className="h-32 w-52 rounded"
          />
          <p className="center font-bold text-gray-50">{name}</p>
          <p className="inline rounded bg-gray-100 p-1 text-sm leading-none text-gray-800">
            {`Quant: ${quantity}`}
          </p>
        </div>

        <p className=" h-full pt-2 text-sm leading-4 text-gray-100">
          {description.substring(0, 100).concat('...')}
        </p>
        <div className="w-full">
          <div className="mb-3 flex w-full cursor-pointer justify-around">
            <PlusCircle onClick={handlePlusCircleClick} />
            {quantityInCart}
            <MinusCircle onClick={handleMinusCircleClick} />
          </div>

          <button
            onClick={purchaseProduct}
            className="inline-block w-full  rounded bg-green-500 py-2 font-alt text-sm uppercase leading-none text-gray-900 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? <Spinner /> : <span>Comprar</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
