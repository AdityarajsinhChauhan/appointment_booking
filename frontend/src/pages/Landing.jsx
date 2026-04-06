import React from 'react'
import { useNavigate } from 'react-router'
import { CircleCheck } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full'>
        <header className='flex justify-between py-5 px-10 w-full bg-gray-100 border-b border-gray-300'>
            <h1 className='text-2xl font-bold text-gray-700'>Booking App</h1>
            <div className='flex gap-5'>
                <button onClick={()=>navigate('/login')} className='bg-white border border-gray-300 rounded-lg px-3 py-1'>Sign In</button>
                <button onClick={()=>navigate('/register')} className='bg-black text-white rounded-lg px-3 py-1'>Get Started</button>
            </div>
        </header>

        <div className='flex justify-center items-center flex-col w-full h-96 gap-5'>
            <h2 className='text-4xl'>Streamline Your Appointment Booking</h2>
            <div className='flex gap-5'>
                <button onClick={()=>navigate('/register')} className='bg-black text-white rounded-lg px-10 py-3' >Start Booking Now</button>
                <button onClick={()=>navigate('/login')} className='bg-white border border-gray-300 rounded-lg px-10 py-3'>SignIn</button>
            </div>
        </div>

        <div className='bg-gray-100 flex gap-5 flex-col mx-32 items-center p-5 rounded-xl mb-10 '>
            <h2 className='font-bold text-2xl'>Powerful Features for Everyone </h2>
            <div className='flex gap-10'>
                <div className='flex gap-5 bg-white border border-gray-300 rounded-xl'>
                <div className='flex flex-col p-5 gap-5'>
                    <h3 className='text-lg font-bold text-gray-600'>For Users</h3>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Browse and select from available providers</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Choose convenient time slots</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>View appointment history</span>
                </div>
            </div>

              <div className='flex gap-5 bg-white border border-gray-300 rounded-xl'>
                <div className='flex flex-col p-5 gap-5'>
                    <h3 className='text-lg font-bold text-gray-600'>For Users</h3>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Browse and select from available providers</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Choose convenient time slots</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>View appointment history</span>
                </div>
            </div>
             <div className='flex gap-5 bg-white border border-gray-300 rounded-xl'>
                <div className='flex flex-col p-5 gap-5'>
                    <h3 className='text-lg font-bold text-gray-600'>For Users</h3>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Browse and select from available providers</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>Choose convenient time slots</span>
                    <span className='flex gap-3'><CircleCheck className='stroke-green-600'/>View appointment history</span>
                </div>
            </div>
            </div>
        </div>
      
    </div>
  )
}

export default Landing
