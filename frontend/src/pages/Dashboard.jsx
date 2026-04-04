import { Calendar, Clock, User, MapPin } from 'lucide-react'
import React from 'react'
import CardWithIcon from '../components/common/CardWithIcon'
import BlackButton from '../components/common/BlackButton'
import WhiteButton from '../components/common/WhiteButton'

const Dashboard = () => {
  const  cardInfo = [
    {
      title: "Upcoming",
      number: 2,
      Icon: Calendar
    },
    {
      title: "Completed",
      number: 8,
      Icon: Clock
    },
    {
      title: "Providers",
      number: 2,
      Icon: User
    },
  ]
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
          <BlackButton title="Book New"/>
        </div>

        <div className='w-[96%] mx-5 border border-gray-300 rounded-xl flex flex-col p-5 mt-5'>
          <h3 className='text-lg font-bold'>Consultation</h3>
          <span className='text-gray-500 border-b border-gray-300 pb-5'>Dr. Sarah Joshi</span>
          <div className=""></div>
          <span className='mt-4 flex gap-2'><Calendar/>Nov 15, 2014</span>
          <span className='mt-4 flex gap-2'><Clock/>10:00 to 10:30</span>
          <span className='mt-4 flex gap-2'><MapPin/>Office building A, romm 201</span>
          <div className='w=96% pt-5 border-t mt-5 border-gray-300'>
            <WhiteButton title="Reschedule" textColor="black" width="w-1/2"/>
            <WhiteButton title="Cancel" textColor="red-600" width="w-1/2"/>
          </div>
        </div>


        {/* Recent Appointments */}


        <div className='flex justify-between mx-5 my-10'>
          <h2 className='text-2xl'>Recent Appointments</h2>
          <button className='bg-black text-white px-2 py-1 rounded-lg'>Book New</button>
        </div>

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
