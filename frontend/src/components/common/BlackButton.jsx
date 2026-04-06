import React from 'react'

const BlackButton = ({ title }) => {
  return (
    <button className='bg-black text-white rounded-lg px-5 py-1 h-fit hover:bg-gray-700 cursor-pointer transition-all duration-150'>{title}</button>
  )
}

export default BlackButton
