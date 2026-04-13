import React from 'react'
import { User, MapPin } from 'lucide-react';



const ProviderCard = () => {
  return (
    <div className='border border-gray-300 hover:border-black transition-all duration-150 w-fit px-5 py-10 rounded-xl'>
        <div className='flex'>
            <span className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-orange-600 rounded-full p-1'><User className='w-10 h-10 stroke-white'/></div>
                <span className='font-bold text-lg'>Dr. Sarah Johnson</span>
            </span>
        </div>
        <div className='flex gap-3 my-3'><MapPin/>Downtown clinic</div>
        <div>Dentist with 5 years of experience</div>
      
    </div>
  )
}

export default ProviderCard
