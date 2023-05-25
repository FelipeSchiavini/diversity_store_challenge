'use client'

import { ProductList } from '@/components/product-list.component'
import { Role } from '@/utils/types'

export default function Products() {
  return <ProductList role={Role.Client} />
}
