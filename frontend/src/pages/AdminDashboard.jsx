import React from "react";
import { Calendar, User , Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="p-5">
        <h1 className="font-bold text-3xl">Administration Dashboard</h1>
        <span>Manage providers, appointments, and system settings</span>
      </header>

      {/* Main cards */}

      <div className="flex gap-3 mx-5">
        <div className="flex px-5 py-7 border border-gray-300 rounded-lg w-[28%] justify-between">
          <div className="flex flex-col">
            <span>Total Providers</span>
            <span className="text-4xl font-bold">12</span>
          </div>

          <div className="bg-gray-200 rounded-lg p-3 h-fit">
            <User />
          </div>
        </div>

        <div className="flex px-5 py-7 border border-gray-300 rounded-lg w-[28%] justify-between">
          <div className="flex flex-col">
            <span>Total Providers</span>
            <span className="text-4xl font-bold">12</span>
          </div>

          <div className="bg-gray-200 rounded-lg p-3 h-fit">
            <User />
          </div>
        </div>

        <div className="flex px-5 py-7 border border-gray-300 rounded-lg w-[28%] justify-between">
          <div className="flex flex-col">
            <span>Total Providers</span>
            <span className="text-4xl font-bold">12</span>
          </div>

          <div className="bg-gray-200 rounded-lg p-3 h-fit">
            <User />
          </div>
        </div>
      </div>

      {/* Admin cards */}

      <div className="flex my-5 mx-5 gap-5">
        <div className="flex gap-3 flex-col items-start w-[45%] border border-gray-300 rounded-lg p-5">
            <h2 className="text-lg font-bold">Admin Actions</h2>
            <button onClick={()=>navigate('/manageProviders')} className="border border-gray-300 rounded-lg w-full py-1 px-2">Manage Providers</button>
            <button onClick={()=>navigate('/appointment')} className="border border-gray-300 rounded-lg w-full py-1 px-2">View All Appointments</button>
        </div>
        <div className="w-[45%] border border-gray-300 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-5">System Status</h2>
            <div className="flex justify-between my-2">
                <span>API Status</span>
                <span className="bg-green-100 text-green-700 px-1 rounded-lg">Online</span>
            </div>
            <div className="flex justify-between">
                <span>Database</span>
                <span className="bg-green-100 text-green-700 px-1 rounded-lg">Connected</span>
            </div>
        </div>
      </div>


      {/* Recent Appointments */}

      <h2 className="text-2xl font-bold m-5">Recent Appointments</h2>

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

export default AdminDashboard;
