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

      <div className="grid md:grid-cols-4 grid-cols-2 gap-5 flex-wrap mx-5">
        {cardInfo.map((item)=>(<CardWithIcon  title={item.title} text={item.text}  Icon={item.Icon}  darkColor={item.darkColor} lightColor={item.lightColor} />))}
      </div>

      {/* Admin cards */}

      <div className="grid md:grid-cols-2 gird-cols-1  my-5 mx-5 gap-5">
        <div className="flex gap-3 flex-col items-start border transition-all duration-150 border-gray-300 rounded-lg p-5 group hover:border-teal-600">
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
        <div className=" border border-gray-300 rounded-lg p-5">
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

      
    </div>
  );
};

export default AdminDashboard;
