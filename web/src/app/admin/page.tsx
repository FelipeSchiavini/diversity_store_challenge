'use client'

import { ProductList } from '@/components/product-list.component'
import { Role } from '@/utils/types'

export default function Admin() {
  return <ProductList role={Role.Admin} />
}
