'use client'

import { ProductList } from '@/components/product-list.component'
import { Role } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function Products() {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [])

  return <ProductList role={Role.Client} />
}
