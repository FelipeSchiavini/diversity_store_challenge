'use client'

import { LoginFormComponent } from '@/components/login-form.component'
import { ProductList, Product } from '@/components/product-list.component'
import { ProductFormComponent } from '@/components/product-register-fom.component'
import { Role } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Buying from '../../assets/buying.svg'
import Image from 'next/image'

export default function Admin() {
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [])

  return (
    <>
      <h2 className="mb-3 mt-10 text-3xl font-bold leading-tight text-gray-50">
        Register new Products
      </h2>
      <div className="flex justify-center max-sm:w-full sm:w-96 ">
        <ProductFormComponent />
      </div>
      <h2 className="mt-10 text-3xl font-bold leading-tight text-gray-50">
        Manage your stock
      </h2>
      <ProductList role={Role.Admin} />
    </>
  )
}
