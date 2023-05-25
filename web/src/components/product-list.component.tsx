'use client'

import { useEffect } from 'react'
import useToast from '@/hooks/use-toast'
import { ProductCard } from './product-card.component'
import { useGet } from '@/hooks/use-api-get'
import { Role } from '@/utils/types'

export interface Product {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
}

interface ProductListProps {
  role: Role
}

export const ProductList: React.FC<ProductListProps> = (props) => {
  const { errorToast, Toast } = useToast()

  const { data, getRequest, isLoading } = useGet<Product[]>({
    onError: errorToast,
  })

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    await getRequest('/product/list')
  }

  if (!data) return <></>

  return (
    <>
      <div className="mb-8 mt-8 flex flex-wrap justify-center gap-5">
        {data?.map((product) => {
          return (
            <ProductCard
              role={props.role}
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
      </div>
      <Toast />
    </>
  )
}
