import FormComponent from '@/components/JoinFormHelp'
import React from 'react'
import { FaEraser } from 'react-icons/fa'

function page() {
  return (
    <div className='max-w-7xl mx-auto flex flex-col justify-center items-center'>
         <div className="flex items-center flex-col">
    <h1 className="text-4xl font-bold pt-10 pb-8"><FaEraser></FaEraser> संगठन की सदस्यता </h1>
    <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
    </div>
      <FormComponent/>
    </div>
  )
}

export default page
