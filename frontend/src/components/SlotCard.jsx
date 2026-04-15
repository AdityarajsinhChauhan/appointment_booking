import React from 'react'
import { formatDate , formatTimeRange  } from '../utils/formatDate'

const SlotCard = ({ date, slots}) => {
  return (
    <div className='border transition-all duration-150 hover:border-sky-600 border-gray-300 rounded-xl flex flex-col gap-5 m-5 h-fit p-5'>
        <div className='flex justify-between'>
            <span>{formatDate(date)}</span>
        </div>

        <div className='flex flex-wrap gap-3'>
            {slots.map((slot)=>(
                <button className={`py-3 transition-all duration-150 border border-transparent hover:border-sky-700 px-5 flex flex-col  rounded-lg justify-center items-center ${slot.is_booked ? "bg-teal-100": "bg-sky-100"}`}>
                <span>
                    {formatTimeRange(slot.start_time,slot.end_time)}
                </span>
                <span className={`font-bold ${slot.is_booked ? "text-red-700 ": "text-green-700"}`}>{slot.is_booked ? "booked" : "available"}</span>
            </button>

            ))}

            
        </div>
      
    </div>
  )
}

export default SlotCard
