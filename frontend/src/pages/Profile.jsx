import { User , Mail , Phone } from 'lucide-react'
import React from 'react'


const Profile = () => {
  return (
    <div className='px-44'>
        <header className='m-5'>
          <h1 className='font-bold text-3xl'>Profile</h1>
          <span>Manage your account information</span>
        </header>

        {/* Main card */}

        <div className='flex border border-gray-300 rounded-xl px-5 py-10 items-center'>
          <div className='flex flex-col items-center'>
            <span className='bg-gray-100 rounded-full p-5 border-2'><User className='w-20 h-20'/></span>
            <span>User Account</span>
          </div>
          <div className='flex flex-col ml-5 gap-5'>
            <span className='flex gap-2'><User/>User</span>
            <span className='flex gap-2'><Mail/>user@example.com</span>
            <span className='flex gap-2'><Phone/>1234567890</span>

          </div>
        </div>

        {/* Account Information */}

        <div className='flex flex-col border border-gray-300 rounded-xl mt-5 p-5'>
          <div className='flex justify-between'>
          <h2 className='font-bold'>Account Information</h2>
          <button className='bg-black text-white px-3 py-1 rounded-lg'>Edit</button>
        </div>

        <input type="text" placeholder='name' className='border border-gray-200 rounded-lg mt-3 py-1 px-3' />
        <input type="text" placeholder='email' className='border border-gray-200 rounded-lg mt-3 py-1 px-3' />
        <input type="text" placeholder='phone' className='border border-gray-200 rounded-lg mt-3 py-1 px-3' />
        </div>

        {/* Security */}

        <div className='flex flex-col border border-gray-300 rounded-xl mt-5 p-5'>
          <h2>Security</h2>
          <input type="text" placeholder='old password' className='border border-gray-200 rounded-lg mt-3 py-1 px-3'/>
          <input type="text" placeholder='new password' className='border border-gray-200 rounded-lg mt-3 py-1 px-3'/>
          <input type="text" placeholder='re-type new password' className='border border-gray-200 rounded-lg mt-3 py-1 px-3'/>
          <button className='border border-gray-300 rounded-lg mt-3 py-1 px-3'>Change Password</button>
        </div>

        {/* Delete zone */}

        <div className='flex flex-col border border-red-600 rounded-xl mt-5 p-5'>
          <h2 className='text-xl font-bold text-red-600'>Danger Zone</h2>
          
          <button className='py-1 justify-center px-3 border border-gray-300 rounded-lg text-red-600 mt-5'>Delete Account</button>
        </div>



      
    </div>
  )
}

export default Profile
