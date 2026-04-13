import { Calendar, CheckCircle } from 'lucide-react';
import React from 'react'

const BookEaseIcon = ({ size }) => (
  <div className={`relative w-${size} h-${size}`}>
    {/* Main Icon (Tailwind bg-teal-700) */}
    <Calendar className={`stroke-sky-700 w-${size} h-${size}`}
    />
      <div className='absolute -bottom-1 -right-1 bg-white'>
        <CheckCircle
        className="rounded-full p-0.3 stroke-3 stroke-teal-600 " 
      />
      </div>
  </div>
);

export default BookEaseIcon
