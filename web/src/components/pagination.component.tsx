'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useToast from '@/hooks/use-toast'
import { ProductCard } from './product-card.component'
import { useGet } from '@/hooks/use-api-get'
import { Role } from '@/utils/types'
import { Spinner } from './spinner.component'
import { Toast } from 'react-toastify/dist/components'
import { data } from 'autoprefixer'

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
  console.log(
    '🚀 ~ file: pagination.component.tsx:29 ~ totalOfPages:',
    totalOfPages,
  )

  return (
    <>
      <div className="mb-8 mt-8 flex w-[300px] gap-3">
        <button
          onClick={() => updatePagination(pagination - 1)}
          className="inline-block w-full rounded bg-green-500 py-2 font-alt text-sm uppercase leading-none text-gray-900 hover:bg-green-600 disabled:bg-gray-400"
          disabled={isLoading || pagination === 1}
        >
          {isLoading ? <Spinner /> : <span>before</span>}
        </button>

        <button
          onClick={() => updatePagination(pagination + 1)}
          className="inline-block w-full rounded bg-green-500 py-2 font-alt text-sm uppercase leading-none text-gray-900 hover:bg-green-600  disabled:bg-gray-400"
          disabled={isLoading || pagination >= totalOfPages}
        >
          {isLoading ? <Spinner /> : <span>next</span>}
        </button>
      </div>
    </>
  )
}
