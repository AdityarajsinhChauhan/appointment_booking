import { Trash } from 'lucide-react'
import React from 'react'

const ManageProviders = () => {
  return (
    <div>
      <header className='p-5 flex justify-between'>
        <h1 className='font-bold text-3xl'>Manage Providers</h1>
        <button className='bg-black text-white rounded-lg px-3 py-1 '>Add Provider</button>
      </header>

      {/* Table */}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Appointments</th>
            <h>Email</h>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Sarah Johnson</td>
            <td>Dentistry</td>
            <td>48</td>
            <td>sarah@example.com</td>
            <td><Trash className='stroke-red-600'/></td>
          </tr>

        </tbody>
      </table>
      
    </div>
  )
}

export default ManageProviders
