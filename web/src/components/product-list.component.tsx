'use client'

import useGet from '@/hooks/use-api-get'
import { useEffect } from 'react'
import useToast from '@/hooks/use-toast'
import { ProductCard } from './product-card.component'

export interface Product {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
}

export const ProductList = () => {
  const { errorToast, Toast } = useToast()

  const { data, getRequest, isLoading } = useGet<Product[]>({
    onError: errorToast,
  })
  console.log(
    '🚀 ~ file: product-list.component.tsx:22 ~ ProductList ~ data:',
    data,
  )

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    await getRequest('/product/list')
  }

  if (!data) return <></>

  return (
    <>
      <Toast />
      {data?.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            productUrl={product.productUrl}
            quantity={product.quantity}
            refresh={refresh}
          />
        )
      })}
    </>
  )
}
