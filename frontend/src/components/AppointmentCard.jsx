import React from 'react'
import { Calendar, Clock, MapPin } from "lucide-react";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="w-[96%] mx-5 border border-gray-300 rounded-xl flex flex-col p-5 mt-5">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Consultation</h3>
            <span className="text-gray-500 border-b border-gray-300 pb-5">
              {appointment.users.name}
            </span>
          </div>
          <span className="bg-blue-100 text-blue-800 rounded-full px-2 h-fit">{appointment.status}</span>
        </div>
        <span className="mt-4 flex gap-2">
          <Calendar />
          {appointment.slot.start_time}
        </span>
        <span className="mt-4 flex gap-2">
          <Clock />
          
    {appointment.slot.start_time},
    {appointment.slot.end_time}
        </span>
        <span className="mt-4 flex gap-2">
          <MapPin />
          Office building A, romm 201
        </span>
        <div className="w=96% pt-5 border-t mt-5 border-gray-300">
          <button className="w-1/2 border border-gray-300 rounded-lg py-1">
            Reschedule
          </button>
          <button className="w-1/2 border border-gray-300 rounded-lg py-1 text-red-600">
            Cancel
          </button>
        </div>
      </div>
  )
}

export default AppointmentCard
