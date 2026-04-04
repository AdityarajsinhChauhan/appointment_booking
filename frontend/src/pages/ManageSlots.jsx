import React from 'react'
import CardWithIcon from '../components/common/CardWithIcon'
import { LockOpen , Calendar, Clock } from 'lucide-react'
import BlackButton from '../components/common/BlackButton'
import SlotForm from '../components/SlotForm'

const ManageSlots = () => {
  const cardInfo=[
    {
      title:"Total Slots",
      number:"3",
      Icon:Calendar
    },
    {
      title:"Available",
      number:"5",
      Icon:LockOpen
    },
    {
      title:"Booked",
      number:"8",
      Icon:Clock
    }
  ]
  return (
    <div>
      <header className='flex justify-between p-5'>
        <div>
          <h1>Manage Slots</h1>
        <span>Create and manage your availability</span>
        </div>
        <BlackButton title="New Slot"/>

      </header>

      <div className="flex w-full gap-5 px-5 mt-10">
        {cardInfo.map((item)=>(<CardWithIcon title={item.title} number={item.number} Icon={item.Icon}/>))}

      </div>

      <SlotForm/>
        
      
    </div>
  )
}

export default ManageSlots
