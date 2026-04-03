import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";

const Appointment = () => {
  return (
    <div>
      <header className="flex justify-between p-5">
        <div>
          <h1 className="font-bold text-3xl">My Appointments</h1>
          <span>View your all appointments</span>
        </div>
        <button className="bg-black text-white px-3 py-1 rounded-lg h-fit">
          Book New
        </button>
      </header>

      {/* Main cards */}

      <div className="flex w-full gap-5 px-5 mt-10">
        <div className="flex justify-between w-[32%] border border-gray-300 rounded-xl py-10 px-5">
          <div className="flex flex-col">
            <span>Upcoming</span>
            <span className="text-3xl font-bold">2</span>
          </div>
        </div>

        <div className="flex justify-between w-[32%] border border-gray-300 rounded-xl py-10 px-5">
          <div className="flex flex-col">
            <span>Completed</span>
            <span className="text-3xl font-bold">8</span>
          </div>
        </div>

        <div className="flex justify-between w-[32%] border border-gray-300 rounded-xl py-10 px-5">
          <div className="flex flex-col">
            <span>Cancelled</span>
            <span className="text-3xl font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Appointments */}

      <div className="flex justify-between mx-5 mt-10">
        <h2 className="text-2xl">Upcoming Appointments</h2>
        <button className="bg-black text-white px-2 py-1 rounded-lg">
          Book New
        </button>
      </div>

      <div className="w-[96%] mx-5 border border-gray-300 rounded-xl flex flex-col p-5 mt-5">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Consultation</h3>
            <span className="text-gray-500 border-b border-gray-300 pb-5">
              Dr. Sarah Joshi
            </span>
          </div>
          <span className="bg-blue-100 text-blue-800 rounded-full px-2 h-fit">Scheduled</span>
        </div>
        <span className="mt-4 flex gap-2">
          <Calendar />
          Nov 15, 2014
        </span>
        <span className="mt-4 flex gap-2">
          <Clock />
          10:00 to 10:30
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
    </div>
  );
};

export default Appointment;
