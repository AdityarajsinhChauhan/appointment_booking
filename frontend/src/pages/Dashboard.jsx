import { Calendar, Clock, User, MapPin } from 'lucide-react'
import React, {use, useEffect, useMemo, useState} from 'react'
import CardWithIcon from '../components/common/CardWithIcon'
import BlackButton from '../components/common/BlackButton'
import WhiteButton from '../components/common/WhiteButton'
import { useAppointments } from '../context/AppointmentContext'
import { useNavigate } from 'react-router'
import AppointmentCard from '../components/AppointmentCard'

const Dashboard = () => {

  const { appointments, fetchAppointments, loading } = useAppointments();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log(appointments)
  }, [appointments])

const cardInfo = useMemo(() => {
  const now = new Date();

  const upcoming =
    appointments?.filter(
      (a) => new Date(a.date) >= now && a.status !== "COMPLETED"
    ).length || 0;

  const completed =
    appointments?.filter((a) => a.status === "COMPLETED").length || 0;

  const providers =
    new Set(appointments?.map((a) => a.provider_id)).size || 0;

  return [
    { title: "Upcoming", number: upcoming, Icon: Calendar },
    { title: "Completed", number: completed, Icon: Clock },
    { title: "Providers", number: providers, Icon: User },
  ];
}, [appointments]);
  return (
    <div>

      {/* Main Heading */}

        <h1 className='text-3xl mx-5 mt-5 font-bold'>My Appointments</h1>
        <span className='pl-5 text-gray-500'>manage and track your bookings</span>


        {/* Cards */}

        <div className='flex w-full gap-5 px-5 mt-10'>

          {cardInfo.map((item)=>(<CardWithIcon title={item.title} number={item.number} Icon={item.Icon}/>))}
          
        </div>


        {/* Upcoming Appointments */}

        <div className='flex justify-between mx-5 mt-10'>
          <h2 className='text-2xl'>Upcoming Appointments</h2>
          <button onClick={()=>navigate("/booking")} className='bg-black text-white rounded-lg py-1 px-3 hover:bg-gray-700 cursor-pointer'>Book New</button>
        </div>

        {appointments.map((appointment)=>(<AppointmentCard key={appointment.id} appointment={appointment}/>))}


        {/* Recent Appointments */}

          <h2 className='text-2xl m-5'>Recent Appointments</h2>

        <div className='w-[96%] mx-5 border border-gray-300 rounded-xl flex flex-col p-5 mt-5'>
          <h3 className='text-lg font-bold'>Follow-Up</h3>
          <span className='text-gray-500 border-b border-gray-300 pb-5'>Dr. Sarah Joshi</span>
          <div className=""></div>
          <span className='mt-4 flex gap-2'><Calendar/>Nov 15, 2014</span>
          <span className='mt-4 flex gap-2'><Clock/>10:00 to 10:30</span>
        </div>



      
    </div>
  )
}

export default Dashboard
