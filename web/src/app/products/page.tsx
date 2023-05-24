'use client'

import { ProductList } from '@/components/product-list.component'

export default function Products(props: any) {
  return (
    <div className="mb-5 mt-5 flex flex-wrap gap-8">
      <ProductList />
    </div>
  )
}
