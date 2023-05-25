'use client'

import { useEffect, useState } from 'react'
import useToast from '@/hooks/use-toast'
import { ProductCard } from './product-card.component'
import { useGet } from '@/hooks/use-api-get'
import { Role } from '@/utils/types'
import { Pagination } from './pagination.component'

export interface Product {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
}

interface ProductResponse {
  productsList: Product[]
  totalOfPages: number
}

interface ProductListProps {
  role: Role
}

export const ProductList: React.FC<ProductListProps> = (props) => {
  const { errorToast, Toast } = useToast()
  const [pagination, setPagination] = useState(1)
  const { data, getRequest, isLoading } = useGet<ProductResponse>({
    onError: errorToast,
  })

  useEffect(() => {
    refresh()
  }, [pagination])

  const refresh = async () => {
    await getRequest(`/product/list/${pagination}`)
  }

  if (!data) return <div></div>
  return (
    <>
      <Pagination
        isLoading={isLoading}
        updatePagination={setPagination}
        pagination={pagination}
        totalOfPages={data?.totalOfPages}
      />
      <div className="mb-8 mt-8 flex flex-wrap justify-center gap-5">
        {data?.productsList?.map((product) => {
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
