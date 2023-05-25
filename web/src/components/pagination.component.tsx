'use client'

import { Dispatch, SetStateAction } from 'react'
import { Button } from './button.component'

export interface Product {
  id: string
  quantity: number
  description: string
  name: string
  productUrl: string
}

interface PaginationProps {
  pagination: number
  updatePagination: Dispatch<SetStateAction<number>>
  totalOfPages: number
  isLoading: boolean
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { isLoading, updatePagination, pagination, totalOfPages } = props

  return (
    <>
      <div className="mb-8 mt-8 flex w-[300px] gap-3">
        <Button
          disabled={isLoading || pagination === 1}
          text={'before'}
          isLoading={isLoading}
          onClick={() => updatePagination(pagination - 1)}
        />
        <Button
          disabled={isLoading || pagination >= totalOfPages}
          text={'next'}
          isLoading={isLoading}
          onClick={() => updatePagination(pagination + 1)}
        />
      </div>
    </>
  )
}
