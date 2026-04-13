import React from 'react'
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate ,formatTimeRange } from '../utils/formatDate';
import { useAppointments } from '../context/AppointmentContext';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useLoading } from '../context/LoadingContext';

const AppointmentCard = ({ appointment }) => {


  const { handleCancelAppointment  } = useAppointments();

  const { loading } = useLoading();

  const { user } = useAuth();

  console.log(appointment);

  const navigate = useNavigate();

  const getStatusStyles = (status) => {
  switch (status) {
    case "BOOKED":
      return "bg-blue-100 text-blue-800";

    case "COMPLETED":
      return "bg-green-100 text-green-800";

    case "CANCELLED":
      return "bg-red-100 text-red-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

const handleReschedule = (id) => {
  localStorage.setItem("appointmentId",id);
  navigate('/booking');


}

  return (
    <div className="w-[96%] group mx-5 border border-gray-300 rounded-xl flex flex-col p-5 mt-5 hover:bg-linear-to-br hover:border-sky-700 transition-all duration-150 from-sky-50 via-white to-white shadow hover:shadow-sky-200">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold group-hover:text-sky-700">{appointment.users.name}</h3>
          </div>
          <span
  className={`rounded-full px-2 h-fit text-sm font-medium ${getStatusStyles(
    appointment.status
  )}`}
>
  {appointment.status}
</span>
        </div>
        <span className="mt-4 flex gap-2">
          <Calendar />
          {formatDate(appointment.slot.start_time)}
        </span>
        <span className="mt-4 flex gap-2">
          <Clock />
          
    {formatTimeRange(appointment.slot.start_time,
    appointment.slot.end_time)}
        </span>
        { appointment.status !== "CANCELLED" && user.role == "USER" && <div className="w=96% pt-5 border-t mt-5 border-gray-300">
          <button onClick={()=>handleReschedule(appointment.id)} className="w-1/2 border cursor-pointer border-sky-700 bg-sky-700 text-white rounded-l-lg py-1 hover:bg-white hover:text-sky-700 transition-all duration-150">
            Reschedule
          </button>
          {loading ? <button disabled className=" cursor-no-drop w-1/2 border border-red-600 rounded-r-lg py-1 text-red-600">
            sending...
          </button>: <button onClick={() => handleCancelAppointment(appointment.id)} className="w-1/2 border border-red-600 hover:bg-red-50  cursor-pointer rounded-r-lg py-1 text-red-600">
            Cancel
          </button>}
        </div>}
      </div>
  )
}

export default AppointmentCard
