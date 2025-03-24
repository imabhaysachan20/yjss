import { PenLine } from 'lucide-react'
import React from 'react'
import SankalpPatra from '@/components/SankalpPatra'

function page() {
  return (
    <div>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8">
          <PenLine className='relative -left-1 inline-block' />
          संकल्प पत्र
        </h1>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
      </div>
      <SankalpPatra />
    </div>
  )
}

export default page
