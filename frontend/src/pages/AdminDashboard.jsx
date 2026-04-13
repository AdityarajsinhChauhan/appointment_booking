import React from "react";
import { Calendar,CalendarCheck, CalendarDays,Users, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import formatted from "../utils/today";
import CardWithIcon from "../components/common/CardWithIcon";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const cardInfo = [
    {
    title: "8",
    text: "Total Appointments",
    Icon: CalendarDays,
    darkColor: "bg-teal-700", 
    lightColor: "bg-teal-50"
  },
  {
    title: "5",
    text: "Today's Appointments",
    Icon: CalendarCheck,
    darkColor: "bg-sky-700", 
    lightColor: "bg-sky-50"
  },
  {
    title: "10",
    text: "Upcoming Appointments",
    Icon: Clock,
    darkColor: "bg-indigo-700", 
    lightColor: "bg-indigo-50"
  },
  {
    title: "3",
    text: "Total Users",
    Icon: Users,
    darkColor: "bg-cyan-700", 
    lightColor: "bg-cyan-50"
  },
  ];
  return (
    <div>
      <header className="flex items-center justify-between p-5 ">
        <div>
          <h1 className="font-bold text-3xl text-teal-700">
            Administration Dashboard
          </h1>
          <span className="text-gray-500">
            Manage providers, appointments, and system settings
          </span>
        </div>
        <div className="flex gap-3 items-center border border-gray-300 rounded-lg p-2 text-sky-700 font-bold cursor-default hover:border-teal-700 hover:bg-linear-to-br from-teal-50 via-white to-white hover:shadow">
          <Calendar className="w-5 h-5" />
          <span>{formatted}</span>
        </div>
      </header>

      {/* Main cards */}

      <div className="flex gap-5 flex-wrap mx-5">
        {cardInfo.map((item)=>(<CardWithIcon  title={item.title} text={item.text}  Icon={item.Icon}  darkColor={item.darkColor} lightColor={item.lightColor} />))}
      </div>

      {/* Admin cards */}

      <div className="flex my-5 mx-5 gap-5">
        <div className="flex gap-3 flex-col items-start w-[45%] border transition-all duration-150 border-gray-300 rounded-lg p-5 group hover:border-teal-600">
          <h2 className="text-lg font-bold text-sky-700">Quick Actions</h2>
          <button
            onClick={() => navigate("/manageProviders")}
            className="border border-gray-300 rounded-lg w-full py-1 px-2 transition-all duration-150 group-hover:border-sky-600 hover:bg-sky-700 hover:text-white cursor-pointer"
          >
            Manage Providers
          </button>
          <button
            onClick={() => navigate("/appointment")}
            className="border border-gray-300 rounded-lg w-full py-1 px-2 transition-all duration-150 group-hover:border-sky-600 hover:bg-sky-700 hover:text-white cursor-pointer"
          >
            View All Appointments
          </button>
        </div>
        <div className="w-[45%] border border-gray-300 rounded-lg p-5">
          <h2 className="text-lg font-bold mb-5 text-sky-700">System Status</h2>
          <div className="flex justify-between my-2">
            <span>API Status</span>
            <span className="bg-green-100 text-green-700 px-1 rounded-lg">
              Online
            </span>
          </div>
          <div className="flex justify-between">
            <span>Database</span>
            <span className="bg-green-100 text-green-700 px-1 rounded-lg">
              Connected
            </span>
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
          <span className="bg-blue-100 text-blue-800 rounded-full px-2 h-fit">
            Scheduled
          </span>
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
