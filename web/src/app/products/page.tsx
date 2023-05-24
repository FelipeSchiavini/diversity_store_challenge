'use client'

import { ProductList } from '@/components/product-list.component'

export default function Products(props: any) {
  return (
    <div className="mb-8 mt-8 flex flex-wrap justify-start space-x-8 space-y-8">
      <ProductList />
    </div>
  )
}
