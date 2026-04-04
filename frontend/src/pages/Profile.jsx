import { User , Mail , Phone } from 'lucide-react'
import React from 'react'
import useAuth from '../hooks/useAuth'
import BlackButton from '../components/common/BlackButton'
import WhiteButton from '../components/common/WhiteButton'


const Profile = () => {

  const { user } = useAuth();
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
            <span>{user.role} Account</span>
          </div>
          <div className='flex flex-col ml-5 gap-5'>
            <span className='flex gap-2'><User/>{user.name}</span>
            <span className='flex gap-2'><Mail/>{user.email}</span>
            <span className='flex gap-2'><Phone/>1234567890</span>

          </div>
        </div>

        {/* Account Information */}

        <div className='flex flex-col border border-gray-300 rounded-xl mt-5 p-5'>
          <div className='flex justify-between'>
          <h2 className='font-bold'>Account Information</h2>
          <BlackButton title="Edit"/>
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
          <WhiteButton title="Change Password" textColor="black"/>
        </div>

        {/* Delete zone */}

        <div className='flex flex-col border border-red-600 rounded-xl mt-5 p-5'>
          <h2 className='text-xl font-bold text-red-600 mb-5'>Danger Zone</h2>
          
          <WhiteButton title="Delete Account" textColor="red-600"/>
        </div>



      
    </div>
  )
}

export default Profile
